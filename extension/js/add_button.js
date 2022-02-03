function createButton(icon, reference, customClass, title, text, onclick) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    let span = document.createElement('span');
    let img = document.createElement('img');
    img.setAttribute("src", `chrome-extension://ddhjfppjadeagekljoinjedloiacblpb/img/${icon}`);
    if (reference){
        a.setAttribute('href', reference);
    }
    if (onclick){
        a.setAttribute('onClick', onclick)
    }
    a.setAttribute('class', `button custom-button ${customClass}`);
    a.setAttribute('title',title );
    span.innerText = text;
    a.appendChild(span);
    a.appendChild(img);
    li.appendChild(a);
    return {li, a, span, img}
}

function getPMHref(id) {
    let pm_button = document.querySelector(`#profile${id.replace("post_content", "")} .pm-icon`)
    if (pm_button){
        return pm_button.parentElement.getAttribute("href")
    }
    return null;
}

function addBtn(){
    let btns = document.querySelectorAll('.post-buttons');
    let isPosting = (window.location.href.includes("posting.php"));
    var needUpdating = false;
    btns.forEach(btn => {     
		if(btn.getElementsByClassName('custom-button').length > 0){
            return;
        }
        needUpdating = true
        btn.querySelectorAll('li.hidden:not(.responsive-menu)').forEach(b => {
            if (b.getAttribute('class') == "hidden"){
                b.removeAttribute('class')
            }
        })
        let contentElement = btn.parentElement.getElementsByClassName("content").item(0)
        let id = btn.parentElement.getAttribute("id") || ""
        let strippedId = id.replace("post_content", "")
        strippedId = strippedId.replace("pr", "")
        let pingOnClick = `ping_user(${strippedId})`
        addSimpleButton(btn, 'baseline_alternate_email_black_24dp.png', null, 'ping-icon', 'דערמאן תגובה', 'דערמאן תגובה', pingOnClick)
		if (contentElement.innerHTML.includes("blockquote")) {
            addQuoteLastButton(btn, isPosting);
        }
		let responsiveMenu = btn.getElementsByClassName('responsive-menu').item(0);
        try {
            btn.removeChild(btn.getElementsByClassName('responsive-menu').item(0))
        }catch (e) {
            
        }
	});
	if (needUpdating){
		let navBar = document.querySelector('#nav-footer');
		navBar.querySelectorAll('li.hidden:not(.responsive-menu)').forEach(si => {
			si.setAttribute('class', si.getAttribute('class').replace('hidden', ''))
		})
		navBar.removeChild(navBar.getElementsByClassName('responsive-menu').item(0))
		parseDocument($('body'));
	}
}

function addSimpleButton(btn, icon, href, customClass, title, text, onclick){
    let button = createButton(icon, href, customClass, title, text, onclick);
    btn.appendChild(button.li);
}

function getQuoteURL(btn){
    let quoteButton = btn.querySelector('a.button.icon-button.quote-icon');
    if (!quoteButton){
        return null;
    }
    let href = quoteButton.getAttribute('href');
    return href;
}

function getPostLink(postID){
    return `https://www.ivelt.com/forum/viewtopic.php?p=${postID}#p${postID}`;
}

function getUsername(post_id, prefix = 'p'){
    var usernameE = document.querySelector(`#${prefix}${post_id} .username`)
    if (!usernameE){
       var usernameE = document.querySelector(`#p${prefix}${post_id} .username-coloured`)
    }
    var username = ""
    if(usernameE){
       username = usernameE.innerText
    }
    return username
}

function addQuoteLastButton(btn, isPosting) {

    let href = getQuoteURL(btn)
    if (!href){
        return;
    }
    var onclick = null;
    if (isPosting){
       onclick = "last" + btn.querySelector('a.button.icon-button.quote-icon').getAttribute('onclick');
//       button.a.setAttribute("onclick", "last" + onclick);
    }
    let button = createButton('quote_last.png', href + '&last=true', 'quote-last', 'ציטיר בלויז די לעצטע תגובה', 'ציטיר לעצטע', onclick);

    btn.appendChild(button.li);
}

function ping_user(post_id){
    let link = getPostLink(post_id)
    if (window.location.href.includes("posting.php")){
        let username = getUsername(post_id,"pr")
        let text = `[url=${link}][quote="${username}"]\n[/quote][/url]`
        insert_text(text)
    }else{
        let username = getUsername(post_id)
        let text = `[url=${link}][quote="${username}"]\n[/quote][/url]`
        addText(text)
    }
}

function addText(text){
    var textarea = document.querySelector("#message-box textarea");

    if (!isNaN(textarea.selectionStart)) {
    	var sel_start = textarea.selectionStart;
    	var sel_end = textarea.selectionEnd;
    	mozWrapApp(textarea, text, '');
    	textarea.selectionStart = sel_start + text.length;
    	textarea.selectionEnd = sel_end + text.length;
    } else if (textarea.createTextRange && textarea.caretPos) {
    	if (baseHeight !== textarea.caretPos.boundingHeight) {
    		textarea.focus();
    		storeCaret(textarea);
    	}
    	var caret_pos = textarea.caretPos;
    	caret_pos.text = caret_pos.text.charAt(caret_pos.text.length - 1) === ' ' ? caret_pos.text + text + ' ' : caret_pos.text + text;
    } else {
    	textarea.value = textarea.value + text;
    }
    textarea.focus();
}
function mozWrapApp(txtarea, open, close) {
	var selLength = (typeof(txtarea.textLength) === 'undefined') ? txtarea.value.length : txtarea.textLength;
	var selStart = txtarea.selectionStart;
	var selEnd = txtarea.selectionEnd;
	var scrollTop = txtarea.scrollTop;

	var s1 = (txtarea.value).substring(0,selStart);
	var s2 = (txtarea.value).substring(selStart, selEnd);
	var s3 = (txtarea.value).substring(selEnd, selLength);

	txtarea.value = s1 + open + s2 + close + s3;
	txtarea.selectionStart = selStart + open.length;
	txtarea.selectionEnd = selEnd + open.length;
	txtarea.focus();
	txtarea.scrollTop = scrollTop;

	return;
}

addBtn();







