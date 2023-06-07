const preferencesOptions = [
	'hideUserName',
	'getBrowserNotifications',
	'warnOnLosingPost',
	'backgroundSync',
	'backgroundSyncPosts',
	'backgroundSyncNotif',
	'debugMode'];

// Listen to settings changes
function startListeners(){

	preferencesOptions.forEach(prefName => {
		document.getElementById(prefName).addEventListener('change', (e) => {
			var newSetting = {};

			if(e.currentTarget.type === 'checkbox')
				newSetting[prefName] = !!e.currentTarget.checked;
			else
				newSetting[prefName] = e.currentTarget.value;

			commitNewSetting(newSetting);
			postSettingChange(newSetting);
		});
	});

	document.querySelector('.js-copy-logs').addEventListener('click', copyLogs);
}

// update fields after a related setting has been changed
function postSettingChange(items){
	if(items.hasOwnProperty('backgroundSync')){
		document.getElementById('backgroundSyncPosts').disabled = !items.backgroundSync;
		document.getElementById('backgroundSyncNotif').disabled = !items.backgroundSync;
	}

	if(items.hasOwnProperty('debugMode')){
		document.querySelector('.js-copy-logs').classList.toggle('hidden', !items.debugMode);
	}
}

function copyLogs(){
	chrome.storage.sync.get(null, items => {
		chrome.storage.sync.getBytesInUse(inUse => {
			let logs = [navigator.userAgent, `Bytes in use: ${inUse}, QUOTA_BYTES: ${chrome.storage.sync.QUOTA_BYTES}, QUOTA_BYTES_PER_ITEM: ${chrome.storage.sync.QUOTA_BYTES_PER_ITEM}`];
			Object.keys(items).forEach(key => {
				if(key.indexOf('debug-') === 0)
					logs.push(key + ' -> ' + items[key]);
			});
			navigator.clipboard.writeText(logs.join('\n'))
				.then(() => notify('לאגס זענען קאפירט געווארן'));
		});
	});
}

// Saves settings to chrome.storage
function commitNewSetting(nameValue){

	chrome.storage.sync.set(nameValue, function() {
		// Let user know options were saved.
		notify();
	});
}

function notify(message){
	const fadeTarget = document.getElementById('notify');
	fadeTarget.innerHTML = message || 'דיינע אנשטעלונגען זענען אפגעהיטן געווארן';
	fadeTarget.classList.add('fade');
	setTimeout(function() {
		fadeTarget.classList.remove('fade');
	}, 3650);
}

function initSettings() {

	// Get all preferences from storage to set fields as needed
	chrome.storage.sync.get(null, function(items) {

		preferencesOptions.forEach(prefName => {
			const element = document.getElementById(prefName);

			if(element.type === 'checkbox')
				element.checked = items[prefName];
			else
				element.value = items[prefName];
		});

		postSettingChange(items);

		startListeners();
	});
}

document.addEventListener('DOMContentLoaded', initSettings);
