(function(){
    let currentCount = document.getElementsByClassName("post has-profile").length;
    let lastPost = document.getElementsByClassName("post has-profile")[currentCount -1]

    function isLastPage() {
        return document.getElementsByClassName("next").length == 0;
    }

    let url = window.location.href;

    if(!chrome.storage)
        return;
    
    chrome.storage.sync.get(['backgroundSync', 'backgroundSyncPosts'], items =>{

        // setting was unchecked by the user
        if(!items.backgroundSync || !items.backgroundSyncPosts)
            return;

        let checkNewResponse = setInterval(function () {
            if (isLastPage() && currentCount > 0) {
                $.ajax({
                    type: "GET",
                    url: url,
                    success: function (data) {
                        let newCount = (data.match(/class="post has-profile/g) || []).length;
                        let isNewPage = (data.match(/<li class="next">/g) || []).length > 0;
                        if (currentCount < newCount) {
                            lastPost.insertAdjacentHTML('afterend', 
                                `<h3 style="margin:4px auto;text-align:center;background:#cadceb;padding:7px 5px 5px 5px;border:none;border-radius:7px;">
                                    נייע תגובות זענען צוגעקומען
                                    <a class="button" style="width:150px;margin:5px auto;display:block;" onclick="window.location.reload();">רילאוד</a>
                                </h3>`)

                            let markUnreadUrls = (data.match(/\/forum\/app\.php\/markpostunread\/\d+\/\d+/g) || []);
                            if(markUnreadUrls.length > currentCount)
                                fetch(markUnreadUrls[currentCount]);
                            
                            clearInterval(checkNewResponse);
                        }else if(isNewPage){
                            lastPost.insertAdjacentHTML('afterend', 
                                `<h3 style="margin:4px auto;text-align:center;background:#efeed9;padding:5px;border:none;border-radius:7px;">
                                    א נייע בלאט איז צוגעקומען
                                    <a class="button" style="width:150px;margin:6px auto 5px auto;display:block;" ${(data.match(/href=".*" rel="next"/g) || [])[0]}>גיי צום קומענדיגן בלאט</a>
                                </h3>`)
                            clearInterval(checkNewResponse);
                        }
                    },
                });
            }
        }, parseInt(items.backgroundSyncPosts));
    });
})();