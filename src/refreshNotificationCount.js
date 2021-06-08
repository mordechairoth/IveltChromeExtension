let checkNewNotification = function() {
    let newCount = (notificationNode.innerHTML.match(/\d+/) || ['0'])[0]
    if (newCount !== '0') {
        chrome.runtime.sendMessage({text: newCount});
    }
    else{
        chrome.runtime.sendMessage({text: ''});
    }
}

const notificationNode = document.getElementById('notification_list_button');
if(notificationNode){
    const config = { characterData : true, childList: true, subtree: true };
    const observer = new MutationObserver(checkNewNotification);
    observer.observe(notificationNode, config);

    checkNewNotification();
}