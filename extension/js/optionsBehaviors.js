(function(){

	if(chrome.storage){
		chrome.storage.sync.get(['hideUserName'], function(items){

			console.log(items.hideUserName)

			if(items.hideUserName){
				document.querySelector('.header-avatar .username').innerText = 'Ha?';
			}
		});
	}
}())
