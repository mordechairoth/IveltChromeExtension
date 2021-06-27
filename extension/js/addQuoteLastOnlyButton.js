function addBtn(){
    let btns = document.querySelectorAll('.post-buttons');
    let isPosting = (window.location.href.includes("posting.php"))
    btns.forEach(btn => {
        let contentElement = btn.parentElement.getElementsByClassName("content").item(0)
        if (contentElement.innerHTML.includes("blockquote")){
            let li = document.createElement('li');
            let a = document.createElement('a');
            let href = btn.querySelector('a.button.icon-button.quote-icon').getAttribute('href');
            let onclick = btn.querySelector('a.button.icon-button.quote-icon').getAttribute('onclick');
            a.setAttribute('href', href + '&last=true');
            a.setAttribute('style', "height:18px;width:12px;margin:0;padding:0 5px;color:black;text-align:center;user-select:none;");
            a.setAttribute('class', 'button');
            a.setAttribute('title', 'ציטיר בלויז די לעצטע תגובה');
            if (isPosting){
                a.setAttribute("onclick", "last"+onclick)
            }
            li.appendChild(a);
            btn.appendChild(li);
            a.innerText = '-'
        }
    });
    }

addBtn();
