var form = document.querySelector('form[id="qr_postform"]') || document.querySelector('form[id="postform"]');

if(form){
    form.addEventListener('submit', function(){
        window.removeEventListener('beforeunload', avoidLosingPost);
    });

    window.addEventListener('beforeunload', avoidLosingPost);
}

function avoidLosingPost(event){
    
    var textarea = document.querySelector('textarea[name=message]');

    if(textarea && textarea.value){
        event.preventDefault();
        return event.returnValue = 'Changes you made may not be saved. Are you sure you want to exit iVelt?';
    }
}
