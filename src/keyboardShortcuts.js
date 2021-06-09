

function previousPage() {
    document.querySelectorAll(".previous a")[0].click();
}

function nextPage() {
    document.querySelectorAll(".next a")[0].click();
}

function sendPost() {
    document.getElementsByName("post")[0].click();
}

function previewPost() {
    document.getElementsByName("preview")[0].click();
}

function checkKey(e) {

    if (e.key == 'Enter' && e.ctrlKey) {
        sendPost(); 
    }

    if (e.code == 'KeyV' && e.altKey) {
        previewPost(); 
    }

    e = e || window.event;

    if (e.target.nodeName == "INPUT" || e.target.nodeName == "TEXTAREA") return;
    if (e.target.isContentEditable) return;

    if (e.key == 'ArrowLeft') {

        try { nextPage(); } catch{ console.log('attempted to go after last page'); }

    }
    else if (e.key == 'ArrowRight') {
        try { previousPage(); } catch{ console.log('attempted to go before first page'); }


    }

}

document.getElementsByName("post")[0]?.setAttribute('title', 'שיק תגובה (שארטקאט קאנטראל+ענטער)')
document.onkeydown = checkKey;