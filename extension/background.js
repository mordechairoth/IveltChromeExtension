const notificationUrl = "http://www.ivelt.com/forum/ucp.php?i=ucp_notifications";

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

      // send html to a hidden ivelt window for parsing
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

importScripts('./background.notifications.js')
