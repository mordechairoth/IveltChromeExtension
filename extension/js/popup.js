function getUserId(domain, name){
  chrome.cookies.get({"url": domain, "name": name}, function(cookie){
    if (cookie !== null) {
      id = cookie.value;
      checkLoginState();
    }
  });
}

function checkLoginState() {
  if (id.length > 1){
    function getLogOutCookie(domain, name){
      chrome.cookies.get({'url':domain,'name':name},function(cookie){
        logout_url=cookie.value;
        setLogOutState();
      });
    }
    function setLogOutState() {
    }
    getLogOutCookie('http://www.ivelt.com', 'phpbb3_sw7kk_sid');
    document.getElementById('emergency_sign_out').style.display = 'block';
  } else {
    document.getElementById('quick_sign_in').style.display = 'block';
  }
}

getUserId('http://www.ivelt.com', 'phpbb3_sw7kk_u');

function open_home_page(){
  chrome.tabs.create({url:'https://www.ivelt.com/forum/'});
  window.close();
}

function open_pm_inbox(){
  chrome.tabs.create({url:'https://www.ivelt.com/forum/ucp.php?i=pm&folder=inbox'});
  window.close();
}

function open_active_topics(){
  chrome.tabs.create({url:'https://www.ivelt.com/forum/search.php?search_id=active_topics'});
  window.close();
}

function quick_sign_in(){
  chrome.tabs.create({url:'https://www.ivelt.com/forum/ucp.php?mode=login', active: true});
  chrome.storage.local.set({'logged_in':'0'});
  window.close();
}

function emergency_sign_out(){
  chrome.tabs.create({url:'https://www.ivelt.com/forum/ucp.php?mode=logout&sid='+logout_url, active: false});
  chrome.storage.local.set({'logged_in':'0'});
  window.close();
}

function open_settings(){
  chrome.tabs.create({url:chrome.runtime.getURL('settings.html')});
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('open_home_page').addEventListener('click', open_home_page);
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('open_pm_inbox').addEventListener('click', open_pm_inbox);
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('open_active_topics').addEventListener('click', open_active_topics);
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('quick_sign_in').addEventListener('click', quick_sign_in);
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('emergency_sign_out').addEventListener('click', emergency_sign_out);
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('open_settings').addEventListener('click', open_settings);
});
