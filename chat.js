function ajaxGetRequest(path, callback){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            callback(this.response);
        }
    };
    request.open("GET", path);
    request.send();
}

function ajaxPostRequest(path, data, callback){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            callback(this.response);
        }
    };
    request.open("POST", path);
    request.send(data);
}

function renderChat(response){
    var chat = "";
    for(var data of JSON.parse(response)){
        chat = chat + data.message + "</br>";
    }
    document.getElementById("chat").innerHTML = chat;
}

function loadChat(){
    ajaxGetRequest("/chat", renderChat);
}

function sendMessage(){
    var messageElement = document.getElementById("message");

    var message = messageElement.value;
    messageElement.value = "";
    var toSend = JSON.stringify({"message": message});

    ajaxPostRequest("/send", toSend, renderChat);
}
