const notificationUrl = "http://www.ivelt.com/forum/ucp.php?i=ucp_notifications";

const defualtPreferences = {
  hideUserName: false,
  getBrowserNotifications: false,
  warnOnLosingPost: true,
  sefariaLinker: true,
  debugMode: false,
  backgroundSync: true,
  backgroundSyncPosts: 20000,
  backgroundSyncNotif: 1
};

let debugQueue = {};
let debugQueueTimeout;
const debugLogPrefix = 'debug-';

let checkNewNotification = function () {
    fetch(notificationUrl)
      .then((response) => response.text())
      .then((data) => {

      let matches =
        data.match(/id="notification_list_button"\D*(\d{1,4})/) || [];
      let newCount = matches.length == 2 ? matches[1] : "0";

      if (newCount !== "0") {
        chrome.action.setBadgeText({ text: newCount });
      } else {
        chrome.action.setBadgeText({ text: "" });
      }

      // triggere browser notifications
      chrome.storage.sync.get(['getBrowserNotifications'], function(items){
        if(items.getBrowserNotifications){
          parseAndSendNotifications(data);
        }
      });

      const debugDate = new Date();
      debugLog('backgroundSync', `checkNewNotification: newCount(${newCount}), ${debugDate.getUTCMinutes()}:${debugDate.getUTCSeconds()})`);
    });
};

chrome.alarms.onAlarm.addListener((a) => {
  checkNewNotification();
});

chrome.runtime.onInstalled.addListener(() => {
  // set default settings to storage
  chrome.storage.sync.get({
    ...defualtPreferences,
    isFreshInstall: true // needed for initial notifications
  }, function(items){
    if(items && Object.keys(items).length)
      chrome.storage.sync.set(items);

    alarmToFetch(items.backgroundSync, parseInt(items.backgroundSyncNotif));
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if(request.type === 'badgeText'){
    chrome.action.setBadgeText({ text: request.text });
  }

  // global method to send a notification
  if(request.type === 'browserNotification'){
    queueNotification(request);
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if(area !== 'sync')
    return;

  // clean debug logs when turned off
  if(changes.debugMode && changes.debugMode.newValue === false){
    chrome.storage.sync.get(null, items => {
      Object.keys(items).forEach(key => {
        if(key.indexOf(debugLogPrefix) === 0)
          chrome.storage.sync.remove(key);
      })
    })
  }

  if(changes.backgroundSync || changes.backgroundSyncNotif){
    chrome.storage.sync.get(['backgroundSync', 'backgroundSyncNotif'], items => {
      alarmToFetch(items.backgroundSync, parseInt(items.backgroundSyncNotif));
    });
  }
});

function alarmToFetch(create, frequency){
  debugLog('backgroundSync', `alarmToFetch(${create}, ${frequency})`);
  if(create){
    chrome.alarms.create("alarm", { periodInMinutes: frequency });
  }
  else {
    chrome.alarms.clear("alarm");
  }
}

// will create a storage entry and keep on adding values
function debugLog(name, valueToPush){
  debugQueue[name] = debugQueue[name] ? debugQueue[name].push(valueToPush) && debugQueue[name] : [valueToPush];

  if(debugQueueTimeout)
    clearTimeout(debugQueueTimeout);

  debugQueueTimeout = setTimeout(() => {
    chrome.storage.sync.get('debugMode', items => {
      if(items.debugMode){
        // log all from the queue
        Object.keys(debugQueue).forEach(key => {
          commitDebugLog(key, debugQueue[key]);
          delete debugQueue[key];
        });
      }
    });
  }, 1000);
}

function commitDebugLog(name, values){
  name = debugLogPrefix + name;
  chrome.storage.sync.get(name, ({[name]: item}) => {
    if(item)
      chrome.storage.sync.set({[name]: item.concat(values)});
    else
      chrome.storage.sync.set({[name]: values});
  })
}

importScripts('./background.notifications.js')
