function addBtn(){
    let btns = document.querySelectorAll('.post-buttons');
    btns.forEach(btn => {
    let li = document.createElement('li');
    let a = document.createElement('a');
    let href = btn.querySelector('a.button.icon-button.quote-icon').getAttribute('href');
    a.setAttribute('href', href + '&last=true');
    a.setAttribute('style', "height:18px;width:12px;margin:0;padding:0 5px;color:black;text-align:center;user-select:none;");
    a.setAttribute('class', 'button');
    a.setAttribute('title', 'ציטיר בלויז די לעצטע תגובה');
    li.appendChild(a);
    btn.appendChild(li);
    a.innerText = '-'
    });
    }

addBtn();
