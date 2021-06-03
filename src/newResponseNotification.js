let current_count = document.getElementsByClassName("post has-profile").length;

function isLastPage() {
	return document.getElementsByClassName("next").length == 0;
}

let url = window.location.href;
var check_new_response = setInterval(function () {
	if (isLastPage()) {
		$.ajax({
			type: "GET",
			url: url,
			success: function (data) {
				var new_count = (data.match(/class="post has-profile/g) || []).length;
				var is_new_page = (data.match(/<li class="next">/g) || []).length > 0;
				if (parseInt(current_count) < parseInt(new_count) ||is_new_page) {
					console.log("check new posts");
					if (parseInt(current_count) < parseInt(new_count)) {
						document.body.innerHTML +=
							'<div class="navbar" id="reload" style="background-color: #0f75a7;position:fixed;top: 80%;width: 20%;left: 75%;"><h1 style="margin: auto;text-align: center;">נייע תגובה איז יעצט אריינגעקומען.<br><a class="button" onclick="window.location.reload();">איבערלאדן</a></h1></div>';
					} else {
						document.body.innerHTML +=
							'<div class="navbar" id="reload" style="background-color: #0f75a7;position:fixed;top: 80%;width: 20%;left: 75%;"><h1 style="margin: auto;text-align: center;"> פרישע בלאט איז יעצט צוגעקומען.<br><a class="button" ' + (data.match(/href=".*" rel="next"/g) || [])[0] + ">גיי צו פרישע בלאט</a></h1></div>";
					}

					var mark_unread_url = data.match(/\/forum\/app\.php\/markpostunread\/\d+\/\d+/g)[current_count == 25 ? 0 : current_count];
					$.ajax({
						type: "GET",
						url: mark_unread_url,
					});
                    
					clearInterval(check_new_response);
				}
			},
		});
	}
}, 20000);
