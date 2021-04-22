function newResponseNotification(){
let params = new URLSearchParams(window.location.search);
let forum = params.get('t');
let current_count = document.querySelector(".pagination").innerText;
let count = current_count.match(/\d+/);
let url = 'https://api.quickapps.ca/API/GetIveltResponseCount?forum=' + forum;
var check_new_response = setInterval(function(){
$.ajax({
        type: 'GET',
        headers:{    
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' 
        },
        url: url,
        dataType: 'json',
        success: function (data) {
            //console.log(data["response"],count[0],parseInt(count[0]) == parseInt(data["response"]));
            if (parseInt(count[0]) < parseInt(data["response"])) {
            console.log('check new posts');
            document.body.innerHTML += '<div class="navbar" id="reload" style="background-color: #0f75a7;position:fixed;top: 80%;width: 20%;left: 75%;"><h1 style="margin: auto;text-align: center;">נייע תגובה איז יעצט אריינגעקומען.<br><a class="button" onclick="window.location.reload();">איבערלאדן</a></h1></div>';
            clearInterval(check_new_response);
            }
        }
    });
},100000)
}
