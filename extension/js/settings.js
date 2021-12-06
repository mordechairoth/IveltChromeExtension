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
	// debug mode
	document.getElementById('debugMode').addEventListener('change', (e) => {
		commitNewSetting({debugMode: !!e.currentTarget.checked});
		document.querySelector('.js-copy-logs').classList.toggle('hidden', !e.currentTarget.checked);
	});

	document.querySelector('.js-copy-logs').addEventListener('click', copyLogs);
}

function copyLogs(){
	chrome.storage.sync.get(null, items => {
		chrome.storage.sync.getBytesInUse(inUse => {
			let logs = [navigator.userAgent, `Bytes in use: ${inUse}, QUOTA_BYTES: ${chrome.storage.sync.QUOTA_BYTES}, QUOTA_BYTES_PER_ITEM: ${chrome.storage.sync.QUOTA_BYTES_PER_ITEM}`];
			Object.keys(items).forEach(key => {
				if(key.indexOf('debug-') === 0)
					logs.push(key + ' -> ' + items[key]);
			});
			navigator.clipboard.writeText(logs.join('\n'));
		});
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
		document.getElementById('debugMode').checked = items.debugMode;
		document.querySelector('.js-copy-logs').classList.toggle('hidden', !items.debugMode);

		startListeners();
	});
}

document.addEventListener('DOMContentLoaded', initSettings, {once: true});
