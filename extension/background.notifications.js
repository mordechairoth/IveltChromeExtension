const origin = 'https://www.ivelt.com/';
let initialNotificationBatch = true;

var queue = [];
var queueTimer = null;
var linkMap = {};

chrome.notifications.onClicked.addListener(function(notifId) {
    if(linkMap[notifId]){
      // got to link
      chrome.tabs.create({url: linkMap[notifId]}, tab => {
        // focus window
        chrome.windows.update(tab.windowId, {focused: true});
        // remove notification from feed
        chrome.notifications.clear(notifId, wasCleared => {
          if(wasCleared)
            delete linkMap[notifId];
        });
      });
    }
});

function parseAndSendNotifications(data){
  var unreadElements = getTagContent(data, 'li', 'row bg3');
  var storeOnly = false;

  if(initialNotificationBatch){
    initialNotificationBatch = false;
    storeOnly = true;
  }

  if(!unreadElements.length){
    return;
  }

  var unread = unreadElements.map(item => {

    var notificationParts = getTagContent(item, 'p', 'notifications_title', true)[0].split(':');
    var time = getTagContent(item, 'p', 'notifications_time', true)[0];
    var link = htmlToText(getAttrValue(item, 'a', 'href')); // to text for htmlized "&"

    return {
      title: notificationParts.shift(),
      message: notificationParts.join(':'),
      link: link.replace('./', origin + 'forum/'),
      subMessage: time,
      id: getAttrValue(item, 'input', 'value')
    }
  });

  chrome.storage.sync.get(['notificationsSent'], items => {
    
    // filter sent items
    if(items.notificationsSent){
      unread = unread.filter(u => {
        return !items.notificationsSent.includes(u.id)
      });
    }

    if(!unread.length)
      return;

    var saveNewIds = unread.map(u => {
      linkMap[u.id] = u.link;
      return u.id;
    }).join(',');

    // save sent items in storage
    // TODO: prune old ids to avoid storage quota errors
    chrome.storage.sync.set({
      'notificationsSent': items.notificationsSent + ',' + saveNewIds
    }, () => {
      // dont send the initial batch
      if(storeOnly){
        return;
      }

      unread.forEach(u => queueNotification(u));
    });
  });
}

// send one browser notification at a time, every 10 seconds
function queueNotification(notification){

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
  return string.match(new RegExp(`<${tag}.*${attr}="([^"]+)"`))[1];
}

function htmlToText(string){
  return string.replace(/<[^>]*>/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace('&amp;', '&')
    .replace(/&[a-z]+;/g, '')
    .trim();
}