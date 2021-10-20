// Listen to settings changes
function startListeners(){

	// hide user name checkbox
	document.getElementById('hideUserName').addEventListener('change', (e) => {
		commitNewSetting({hideUserName: !!e.currentTarget.checked});
	});

	// get browser notification checkbox
	document.getElementById('getBrowserNotifications').addEventListener('change', (e) => {
		const getBrowserNotifications = !!e.currentTarget.checked;
		
		commitNewSetting({getBrowserNotifications: getBrowserNotifications});

		if(getBrowserNotifications)
			chrome.runtime.sendMessage({title: 'אייוועלט נאטיפיקאציע', message: 'דאס איז א סעמפל אייוועלט נאטיפיקאציע', type: 'browserNotification'});
	});
}

// Saves settings to chrome.storage
function commitNewSetting(nameValue){

	chrome.storage.sync.set(nameValue, function() {
		// Let user know options were saved.
		const fadeTarget = document.getElementById('notify');
	    fadeTarget.classList.add('fade');
	    setTimeout(function() {
	        fadeTarget.classList.remove('fade');
	    }, 3650);
	});
}

// Restores settings options using the preferences
// stored in chrome.storage.
function initSettings() {
  
  // Get preferences or set defaults
  chrome.storage.sync.get({
	hideUserName: false,
	getBrowserNotifications: false
  }, function(items) {
	document.getElementById('hideUserName').checked = items.hideUserName;
	document.getElementById('getBrowserNotifications').checked = items.getBrowserNotifications;

	startListeners();
  });
}

document.addEventListener('DOMContentLoaded', initSettings);
