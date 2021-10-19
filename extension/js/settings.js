// Saves options to chrome.storage
function showHideUserName(e) {
  var hideUserName = !!e.currentTarget.checked;
  chrome.storage.sync.set({
    hideUserName: hideUserName
  }, function() {
    // Update status to let user know options were saved.
    // Will not be useful with multiple settings, autosave with no user messages is the corect way.
    const fadeTarget = document.getElementById('notify');
    fadeTarget.classList.add('fade');
    setTimeout(function() {
        fadeTarget.classList.remove('fade');
    }, 3650);
  });
}

function startListeners(){

  // hide user name checkbox
  document.getElementById('hideUserName').addEventListener('change', showHideUserName);
}

// Restores settings options using the preferences
// stored in chrome.storage.
function populateSettings() {
  
  // Get preferences or set defaults
  chrome.storage.sync.get({
    hideUserName: false
  }, function(items) {
    document.getElementById('hideUserName').checked = items.hideUserName;

    startListeners();
  });
}

document.addEventListener('DOMContentLoaded', populateSettings);
