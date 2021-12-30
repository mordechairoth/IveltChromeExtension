function addGoogleSearch(){
    if (window.location.href.includes("viewtopic.php")) {
        let topicTitle = document.querySelectorAll('.topic-title > a')[0].text;
        let searchUrl = `https://www.google.com/search?q=intitle%3A"${topicTitle}"+site%3Awww.ivelt.com+`
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
    let searchUrl = `https://www.google.com/search?q=site%3Awww.ivelt.com+`
        document.getElementById('search').insertAdjacentHTML('beforebegin', 
            '<input id="g_site_search_keywords" type="search" class="inputbox search" style="border-radius:4px;margin-bottom: 5px;" placeholder="גוגל זוך אין אייוועלט">'
        ) 

        document.getElementById('g_site_search_keywords').addEventListener('keydown' ,function (e) {
            if (e.key === 'Enter') {
                window.open(searchUrl + document.getElementById('g_site_search_keywords').value, '_blank').focus();
                e.preventDefault();
            }
        });
}

addGoogleSiteSearch();
