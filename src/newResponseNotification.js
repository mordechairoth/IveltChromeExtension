let current_count = document.getElementsByClassName("post").length;

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
				var new_count = (data.match(/class="post |<li class="next">/g) || []).length;
				if (parseInt(current_count) < parseInt(new_count)) {
					console.log("check new posts");
					document.body.innerHTML +=
						'<div class="navbar" id="reload" style="background-color: #0f75a7;position:fixed;top: 80%;width: 20%;left: 75%;"><h1 style="margin: auto;text-align: center;">נייע תגובה איז יעצט אריינגעקומען.<br><a class="button" onclick="window.location.reload();">איבערלאדן</a></h1></div>';
					clearInterval(check_new_response);
				}
			},
		});
	}
}, 20000);
