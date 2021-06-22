var s = document.createElement('script');
s.src = chrome.extension.getURL('js/keyboardShortcuts.js');
(document.head || document.documentElement).appendChild(s);
s.onload = function () {
    s.parentNode.removeChild(s);
};

var u = document.createElement('script');
u.src = chrome.extension.getURL('js/addQuoteLastOnlyButton.js');
(document.head || document.documentElement).appendChild(u);
u.onload = function () {
    u.parentNode.removeChild(u);
}

var t = document.createElement('script');
t.src = chrome.extension.getURL('js/removeNestedQuotes.js');
(document.head || document.documentElement).appendChild(t);
t.onload = function () {
    t.parentNode.removeChild(t);
}

var n = document.createElement('script');
n.src = chrome.extension.getURL('js/newResponseNotification.js');
(document.head || document.documentElement).appendChild(n);
n.onload = function () {
    n.parentNode.removeChild(n);
}
