(function(){

	if(chrome.storage){
		chrome.storage.sync.get(['hideUserName'], function(items){
			if(items.hideUserName){
				let userName = document.querySelector('.header-avatar .username');
				if (userName)
				    userName.innerText = 'הא?';
				let avatar = document.querySelector('.header-avatar .avatar');
				if (avatar)
				    avatar.style.display = "none";
			}
		});
	}
}())
