let scripts = [
    "js/keyboardShortcuts.js",
    "js/newResponseNotification.js",
    "js/addGoogleSearch.js",
	"js/add_button.js",
    "js/last_quote.js"
];

scripts.forEach(s => {
    let e = document.createElement('script');
    e.src = chrome.extension.getURL(s);
    (document.head || document.documentElement).appendChild(e);
    e.onload = function () {
        e.parentNode.removeChild(e);
    };
});