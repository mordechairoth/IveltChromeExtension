const notificationUrl = "http://www.ivelt.com/forum/ucp.php?i=ucp_notifications";
let newNotificationCount = 0;

let checkNewNotification = function() {
    fetch(notificationUrl)
    .then(response => response.text())
    .then(data => {
        let newCount = (data.match(/class="row bg3"/g) || []).length;
        if (newNotificationCount !== newCount) {
            chrome.browserAction.setBadgeText({text: newCount > 49 ? "49+" : newCount.toString()});
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
