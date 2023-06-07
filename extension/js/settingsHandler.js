(function(){

	if(chrome.storage){
		chrome.storage.sync.get(['warnOnLosingPost','backgroundSync', 'backgroundSyncPosts'], function(items){
			if(items.warnOnLosingPost){
				var form = document.querySelector('form[id="qr_postform"]') || document.querySelector('form[id="postform"]');

				if(form){
					// all action buttons are type=submit
					form.addEventListener('submit', function(){
						window.removeEventListener('beforeunload', avoidLosingPost);
					});

					window.addEventListener('beforeunload', avoidLosingPost);
				}
			}
            
            let e = document.createElement('div');
            e.style.display = "none";
            e.setAttribute('id', 'iveltHelperSettings');
            e.setAttribute('data-backgroundSync',items.backgroundSync);
            e.setAttribute('data-backgroundSyncPosts',items.backgroundSyncPosts);
            document.body.appendChild(e);
		});
	}

	function avoidLosingPost(event){
		var textarea = document.querySelector('textarea[name=message]');

		if(textarea && textarea.value){
			event.preventDefault();
			return event.returnValue = 'Changes you made may not be saved. Are you sure you want to lose you post?';
		}
	}
}())
