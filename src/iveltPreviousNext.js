function previousPage() {
    document.querySelectorAll(".previous a")[0].click();
}

function nextPage() {
    document.querySelectorAll(".next a")[0].click();
}

function checkKey(e) {

    if (e.target.nodeName == "INPUT" || e.target.nodeName == "TEXTAREA") return;
    if (e.target.isContentEditable) return;

    e = e || window.event;


    if (e.keyCode == '37') {

        try { nextPage(); } catch{ console.log('attempted to go after last page'); }

    }
    else if (e.keyCode == '39') {
        try { previousPage(); } catch{ console.log('attempted to go before first page'); }


    }

}

document.onkeydown = checkKey;