let navMain = document.getElementById('nav-main');
let quickLinks = document.getElementById('quick-links');

navMain.appendChild(quickLinks.getElementsByClassName('icon-search-self')[0]);
navMain.appendChild(quickLinks.getElementsByClassName('icon-search-new')[0]);
navMain.appendChild(quickLinks.getElementsByClassName('icon-search-active')[0]);

navMain.getElementsByClassName('icon-faq')[0].remove();
