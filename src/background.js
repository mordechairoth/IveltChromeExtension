const notificationUrl = "http://www.ivelt.com/forum/ucp.php?i=ucp_notifications";

let checkNewNotification = function() {
    fetch(notificationUrl)
    .then(response => response.text())
    .then(data => {
        let matches = (data.match(/id="notification_list_button"\D*(\d{1,4})/) || []);
        let newCount = matches.length == 2 ? matches[1] : '0'
        if (newCount !== '0') {
            chrome.browserAction.setBadgeText({text: newCount});
        }
        else{
            chrome.browserAction.setBadgeText({text: ''});
        }
    });
}

chrome.alarms.onAlarm.addListener(a => {
    checkNewNotification();
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.get('alarm', a => {
        if (!a) {
            chrome.alarms.create('alarm', {periodInMinutes: 1});
        }
    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
            chrome.browserAction.setBadgeText({text:request.text});
    }
);