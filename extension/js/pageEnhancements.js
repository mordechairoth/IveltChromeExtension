function enchancePage() {
  // Only run on Topic page
  if (window.location.pathname !== "/forum/viewtopic.php") return;
  // Duplicate link for "Unread Post" to bottom of page.
  var paginations = document.getElementsByClassName("pagination");
  paginations[1].outerHTML = paginations[0].outerHTML;
}

enchancePage();
