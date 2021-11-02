// Listen to settings changes
function startListeners(){

	// hide user name checkbox
	document.getElementById('hideUserName').addEventListener('change', (e) => {
		commitNewSetting({hideUserName: !!e.currentTarget.checked});
	});

	// get browser notification checkbox
	document.getElementById('getBrowserNotifications').addEventListener('change', (e) => {
		commitNewSetting({getBrowserNotifications: !!e.currentTarget.checked});
	});

	// get browser notification checkbox
	document.getElementById('warnOnLosingPost').addEventListener('change', (e) => {
		commitNewSetting({warnOnLosingPost: !!e.currentTarget.checked});
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

function initSettings() {

	// Get all preferences from storage to set fields as needed
	chrome.storage.sync.get(null, function(items) {
		document.getElementById('hideUserName').checked = items.hideUserName;
		document.getElementById('getBrowserNotifications').checked = items.getBrowserNotifications;
		document.getElementById('warnOnLosingPost').checked = items.warnOnLosingPost;

		startListeners();
	});
}

document.addEventListener('DOMContentLoaded', initSettings);
