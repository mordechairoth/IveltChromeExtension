const notificationUrl = "http://www.ivelt.com/forum/ucp.php?i=ucp_notifications";

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
        chrome.browserAction.setBadgeText({ text: newCount });
      } else {
        chrome.browserAction.setBadgeText({ text: "" });
      }

      // triggere browser notifications
      chrome.storage.sync.get(['getBrowserNotifications'], function(items){
        if(items.getBrowserNotifications){
          parseAndSendNotifications(data);
        }
      });
    });
};

chrome.alarms.onAlarm.addListener((a) => {
  checkNewNotification();
});

chrome.runtime.onInstalled.addListener(() => {
  // set default settings to storage
  chrome.storage.sync.get({
    hideUserName: false,
    getBrowserNotifications: false,
    isFreshInstall: true, // needed for initial notifications
    debugMode: false
  }, function(items){
    if(items && Object.keys(items).length)
      chrome.storage.sync.set(items);
  });

  chrome.alarms.get("alarm", (a) => {
    if (!a) {
      chrome.alarms.create("alarm", { periodInMinutes: 1 });
    }
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if(request.type === 'badgeText'){
    chrome.browserAction.setBadgeText({ text: request.text });
  }

  // global method to send a notification
  if(request.type === 'browserNotification'){
    queueNotification(request);
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) { return { redirectUrl: 'https://ivelt.com/forum/' }; },
  {urls: ['*://www.ןהקךא.com/*']},
  ["blocking"]
);

chrome.storage.onChanged.addListener((changes, area) => {
  // clean debug logs when turned off
  if(area === 'sync' && changes.debugMode && changes.debugMode.newValue === false){
    chrome.storage.sync.get(null, items => {
      Object.keys(items).forEach(key => {
        if(key.indexOf(debugLogPrefix) === 0)
          chrome.storage.sync.remove(key);
      })
    })
  }
});

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
