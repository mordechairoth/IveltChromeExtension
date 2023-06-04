(function(){
    let sefariaLinkerSetting = document.getElementById('iveltHelperSettings').getAttribute('data-sefaria-linker') === 'true';

    if(sefariaLinkerSetting){
        var linkerScript = document.createElement("script");
        linkerScript.setAttribute("charset", "utf-8");
        linkerScript.setAttribute("src", "https://www.sefaria.org/linker.js");
        linkerScript.onload = function () {
            sefaria.link({
                contentLang: "hebrew",
                interfaceLang: "english",
            });
            
        };
        document.body.appendChild(linkerScript);
    }
}())
