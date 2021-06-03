const notificationUrl = "http://www.ivelt.com/forum/ucp.php?i=ucp_notifications";

let checkNewNotification = function() {
    fetch(notificationUrl)
    .then(response => response.text())
    .then(data => {
        let newCount = (data.match(/class="row bg3"/g) || []).length;
        if (newCount > 0) {
            chrome.browserAction.setBadgeText({text: newCount > 49 ? "49+" : newCount.toString()});
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
