let scripts = [
    "js/keyboardShortcuts.js",
    "js/removeNestedQuotes.js",
    "js/newResponseNotification.js",
    "js/addGoogleSearch.js",
    "js/settingsHandler.js",
    "js/add_button.js"

];


scripts.forEach(s => {
    let e = document.createElement('script');
    e.src = chrome.runtime.getURL(s);
    (document.head || document.documentElement).appendChild(e);
    e.onload = function () {
        e.parentNode.removeChild(e);
	var url=chrome.runtime.getURL("img/");  
	var evt=document.createEvent("CustomEvent");
	evt.initCustomEvent("yourCustomEvent", true, true, url);
	document.dispatchEvent(evt);		
    };
});
