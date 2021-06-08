let currentCount = document.getElementsByClassName("post has-profile").length;
let lastPost = document.getElementsByClassName("post has-profile")[currentCount -1]

function isLastPage() {
	return document.getElementsByClassName("next").length == 0;
}

let url = window.location.href;
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
                        `<h3 style="margin: auto;text-align: center;">
                            נייע תגובה איז יעצט אריינגעקומען
                            <br>
                            <a class="button" onclick="window.location.reload();">רילאוד</a>
                        </h3>`)

					let markUnreadUrls = (data.match(/\/forum\/app\.php\/markpostunread\/\d+\/\d+/g) || []);
                    if(markUnreadUrls.length > currentCount)
					    fetch(markUnreadUrls[currentCount]);
                    
					clearInterval(checkNewResponse);
				}else if(isNewPage){
					lastPost.insertAdjacentHTML('afterend', 
                        `<h3 style="margin: auto;text-align: center;">
                            פרישע בלאט איז יעצט צוגעקומען
                            <br>
                            <a class="button" ${(data.match(/href=".*" rel="next"/g) || [])[0]}>גיי צום קומענדיגן בלאט</a>
                        </h3>`)
	                clearInterval(checkNewResponse);
                }
			},
		});
	}
}, 20000);
