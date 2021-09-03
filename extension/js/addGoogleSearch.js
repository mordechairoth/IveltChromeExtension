function addGoogleSearch(){
    if (window.location.href.includes("viewtopic.php")) {
        let topicTitle = document.querySelectorAll('.topic-title > a')[0].text;
        let searchUrl = `https://www.google.com/search?q=intitle%3A"${topicTitle}"+site%3Aivelt.com+`
        document.getElementById('search_keywords').insertAdjacentHTML('beforebegin', 
            '<input class="inputbox search tiny" style="border-width:1px;border-radius:4px" type="search" id="g_search_keywords" size="20" placeholder="גוגל זוך אין דעם אשכול…">'
        ) 

        document.getElementById('g_search_keywords').addEventListener('keydown' ,function (e) {
            if (e.key === 'Enter') {
                window.open(searchUrl + document.getElementById('g_search_keywords').value, '_blank').focus();
                e.preventDefault();
            }
        });

    }
}

addGoogleSearch();

function addGoogleSiteSearch(){
    let searchUrl = `https://www.google.com/search?q=site%3Aivelt.com+`
        document.getElementById('search').insertAdjacentHTML('beforebegin', 
            '<form action="./search.php" method="get" id="g_site_search_keywords"><fieldset><input name="keywords2" id="keywords2" type="search" class="inputbox search tiny" style="border-width:1px;border-radius:4px" size="200" value="" placeholder="גוגל זוך אין אייוועלט"></fieldset></form><br>'
        ) 

        document.getElementById('g_site_search_keywords').addEventListener('keydown' ,function (e) {
            if (e.key === 'Enter') {
                window.open(searchUrl + document.getElementById('keywords2').value, '_blank').focus();
                e.preventDefault();
            }
        });
}

addGoogleSiteSearch();
