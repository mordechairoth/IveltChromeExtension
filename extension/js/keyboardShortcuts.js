function previousPage() {
	document.querySelectorAll(".previous a")[0].click();
}

function nextPage() {
	document.querySelectorAll(".next a")[0].click();
}

function scrollTop() {
	window.scrollTo(0, 0);
}

function scrollBottom() {
	window.scrollTo(0, document.body.scrollHeight);
}

function sendPost() {
	document.getElementsByName("post")[0].click();
}

function previewPost() {
	document.getElementsByName("preview")[0].click();
}

function checkKey(e) {
	if (e.key == "Enter" && e.ctrlKey && post) {
		sendPost();
	}

	if (e.code == "KeyV" && e.altKey && post) {
		previewPost();
	}

	e = e || window.event;

	if (e.target.nodeName == "INPUT" || e.target.nodeName == "TEXTAREA") return;
	if (e.target.isContentEditable) return;

	if (e.key == "ArrowLeft") {
		try {
			nextPage();
		} catch {
			console.log("attempted to go after last page");
		}
	} else if (e.key == "ArrowRight") {
		try {
			previousPage();
		} catch {
			console.log("attempted to go before first page");
		}
	} else if (e.key == "ArrowUp") {
		//scrollTop();
	} else if (e.key == "ArrowDown") {
		//scrollBottom();
	}
}

document.querySelector(".icon.fa-file-o.fa-fw.icon-blue").parentElement.accessKey = "a";

const notificationNode = document.getElementById("notification_list_button");

if (notificationNode) notificationNode.accessKey = "n";

let post = (document.getElementsByName("post") || [])[0];
if (post) {
	post.setAttribute("title", "שיק תגובה (שארטקאט קאנטראל+ענטער)");
}
document.onkeydown = checkKey;
