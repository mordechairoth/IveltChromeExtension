
function addGoogleSearch(){
    if (window.location.href.includes("viewtopic.php")) {
        let searchUrl = 'https://www.google.com/search?q={{value}}+site%3Aivelt.com+intitle%3A"{{title}}"'
        let topicTitle = document.querySelectorAll('.topic-title > a')[0].text;
        document.getElementById('search_keywords').insertAdjacentHTML('beforebegin', 
            `
            <input class="inputbox search tiny" style="border-width:1px;border-radius:4px" type="search" id="g_search_keywords" size="20" placeholder="גאאגל זוך אין דעם אשכול…">
            `
        ) 

        document.getElementById('g_search_keywords').addEventListener('keydown' ,function (e) {
            if (e.key === 'Enter') {
                searchUrl = searchUrl.replace('{{title}}',topicTitle)
                searchUrl = searchUrl.replace('{{value}}',document.getElementById('g_search_keywords').value)
                window.open(searchUrl, '_blank').focus();
                e.preventDefault();
            }
        });

    }
}

addGoogleSearch();