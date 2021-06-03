let currentCount = document.getElementsByClassName("post has-profile").length;
let lastPost = document.getElementsByClassName("post has-profile")[currentCount -1]

function isLastPage() {
	return document.getElementsByClassName("next").length == 0;
}

let url = window.location.href;
let checkNewResponse = setInterval(function () {
	if (isLastPage()) {
		$.ajax({
			type: "GET",
			url: url,
			success: function (data) {
				let newCount = (data.match(/class="post has-profile/g) || []).length;
				let isNewPage = (data.match(/<li class="next">/g) || []).length > 0;
				if (currentCount < newCount) {
					document.body.innerHTML +=
						'<div class="navbar" id="reload" style="background-color: #0f75a7;position:fixed;top: 80%;width: 20%;left: 75%;"><h1 style="margin: auto;text-align: center;">נייע תגובה איז יעצט אריינגעקומען.<br><a class="button" onclick="window.location.reload();">איבערלאדן</a></h1></div>';

					let markUnreadUrl = data.match(/\/forum\/app\.php\/markpostunread\/\d+\/\d+/g)[currentCount];
					fetch(markUnreadUrl);
                    
					clearInterval(checkNewResponse);
				}else if(isNewPage){
					document.body.innerHTML +=
							'<div class="navbar" id="reload" style="background-color: #0f75a7;position:fixed;top: 80%;width: 20%;left: 75%;"><h1 style="margin: auto;text-align: center;"> פרישע בלאט איז יעצט צוגעקומען.<br><a class="button" ' + (data.match(/href=".*" rel="next"/g) || [])[0] + ">גיי צו פרישע בלאט</a></h1></div>";
	                clearInterval(checkNewResponse);
                }
			},
		});
	}
}, 20000);
