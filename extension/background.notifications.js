const origin = 'https://www.ivelt.com/';

var queue = [];
var queueTimer = null;

chrome.notifications.onClicked.addListener(function(notifId) {

  if(!notifId.includes('-'))
    return;

  const paramValues = notifId.split('-');
  const link = `${origin}forum/index.php?mark_notification=${paramValues[0]}&hash=${paramValues[1]}`;
  
  // open tab to url
  chrome.tabs.create({url: link}, tab => {
    // focus window
    chrome.windows.update(tab.windowId, {focused: true});
    // remove notification from feed
    chrome.notifications.clear(notifId);
  });
});

function parseAndSendNotifications(data){
  var unreadElements = getTagContent(data, 'li', 'row bg3');
  var storeOnly = false;

  chrome.storage.sync.get(['notificationsSent', 'isFreshInstall'], items => {

    debugLog('isFreshInstall', items.isFreshInstall);

    if(items.isFreshInstall){
      chrome.storage.sync.remove('isFreshInstall');
      storeOnly = true;
    }

    if(!unreadElements.length){
      return;
    }

    var unread = unreadElements.map(item => {

      const href = getAttrValue(item, 'a', 'href');
      let notificationParts = getTagContent(item, 'p', 'notifications_title', true)[0].split(':');
      const time = getTagContent(item, 'p', 'notifications_time', true)[0];
      let id;

      // not all notifications have a link
      if(href){
        const url = new URL(htmlToText(href).replace('./', origin + 'forum/')); // to text for htmlized "&"
        id = url.searchParams.get('mark_notification') + '-' + url.searchParams.get('hash');
      }
      else {
        id = getAttrValue(item, 'input', 'value');
      }

      debugLog(id, notificationParts[0].substr(0, 10));

      return {
        title: notificationParts.shift(),
        message: notificationParts.join(':'),
        subMessage: time,
        id: id
      }
    });
    
    // filter sent items
    if(items.notificationsSent){
      unread = unread.filter(u => {
        debugLog(u.id, 'Was already sent: ' + !!items.notificationsSent.includes(u.id));
        return !items.notificationsSent.includes(u.id)
      });
    }

    if(!unread.length)
      return;

    var saveNewIds = unread.map(u => {
      debugLog(u.id, 'storeOnly: ' + storeOnly);
      return u.id;
    }).join(',');

    var notificationsSent = (items.notificationsSent ? items.notificationsSent + ',' : '') + saveNewIds;

    debugLog(unread[0].id, 'savingBytes: ' + notificationsSent.length);

    // save sent items in storage
    // TODO: prune old ids to avoid storage quota errors
    chrome.storage.sync.set({
      'notificationsSent': notificationsSent
    }, () => {
      // dont send the initial batch
      if(storeOnly){
        storeOnly = false;
        return;
      }

      unread.forEach(u => queueNotification(u));
    });
  });
}

// send one browser notification at a time, every 10 seconds
function queueNotification(notification){

  debugLog(notification.id, 'Queing notification');

  queue.push(notification);

  if(!queueTimer){
    queueTimer = setInterval(function(){
      if(queue.length)
        sendBrowserNotification(queue.shift());
      else{
        clearInterval(queueTimer);
        queueTimer = null;
      }
    }, 10000);
  }
}

function sendBrowserNotification(item){
  debugLog(item.id, 'Sending notification');
  chrome.notifications.create(item.id, {
    type: 'basic',
    iconUrl: origin + 'fav/apple-icon-60x60.png',
    title: item.title,
    message: item.message,
    contextMessage: item.subMessage,
    priority: 2
  });
}

function getTagContent(string, tag, className, textOnly){

  const startEl = `<${tag} class="${className}">`;
  const endEl = `</${tag}>`;

  var splitted = string.split(startEl);

  // remove value before the tag
  splitted.shift();

  splitted = splitted.map(s => {

    var content = s.split(endEl)[0];

    if(textOnly)
      return htmlToText(content);

    return startEl + content + endEl;
  });

  return splitted;
}

function getAttrValue(string, tag, attr){
  const match = string.match(new RegExp(`<${tag}.*${attr}="([^"]+)"`));
  return match && match[1];
}

function htmlToText(string){
  return string.replace(/<[^>]*>/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z]+;/g, '')
    .trim();
}