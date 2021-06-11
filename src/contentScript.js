let scripts = [
    "keyboardShortcuts.js",
    "removeNestedQuotes.js",
    "addQuoteLastOnlyButton.js",
    "newResponseNotification.js",
    "expandQuickLinks.js"
];

scripts.forEach(s => {
    let e = document.createElement('script');
    e.src = chrome.extension.getURL(s);
    (document.head || document.documentElement).appendChild(e);
    e.onload = function () {
        e.parentNode.removeChild(e);
    };
});