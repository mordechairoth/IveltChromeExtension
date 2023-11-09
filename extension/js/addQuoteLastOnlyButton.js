function addBtn(){
    let btns = document.querySelectorAll('.post-buttons');
    let isPosting = (window.location.href.includes("posting.php"))
    btns.forEach(btn => {
        let contentElement = btn.parentElement.getElementsByClassName("content").item(0)
        if (contentElement.innerHTML.includes("blockquote")){
            let li = document.createElement('li');
            let a = document.createElement('a');
            let quoteBtn = btn.querySelector('[title="ציטיר אין תגובה"]');
            if (quoteBtn){
                let href = quoteBtn.getAttribute('href');
                let onclick = quoteBtn.getAttribute('onclick');
                a.setAttribute('href', href + '&last=true');
                a.setAttribute('style', "width:18px;color:black;text-align:center;user-select:none;");
                a.setAttribute('class', 'button button-icon-only');
                a.setAttribute('title', 'ציטיר בלויז די לעצטע תגובה');
                if (isPosting){
                    a.setAttribute("onclick", "last"+onclick)
                }
                li.appendChild(a);
                let quoteLi = quoteBtn.parentNode;
                quoteLi.parentNode.insertBefore(li, quoteLi.nextSibling)
                a.innerText = '-'
            }
          
        }
    });
    }

addBtn();