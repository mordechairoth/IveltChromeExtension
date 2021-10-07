(function(){

	if(chrome.storage){
		chrome.storage.sync.get(['hideUserName'], function(items){
			if(items.hideUserName){
				document.querySelector('.header-avatar .username').innerText = 'הא?';
				document.querySelector('.header-avatar .avatar').style.display = "none";
			}
		});
	}
}())
