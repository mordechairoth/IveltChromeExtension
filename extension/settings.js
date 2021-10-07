// Saves options to chrome.storage
function showHideUserName(e) {
  var hideUserName = !!e.currentTarget.checked;
  chrome.storage.sync.set({
    hideUserName: hideUserName
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'User\'s "nik" will be ' + (hideUserName ? 'hidden' : 'visible');
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
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
