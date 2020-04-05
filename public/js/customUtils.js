var params =  new URLSearchParams(window.location.search);
var username = params.get('name');
var room = params.get('room');
var userId;

function setCurrentUserId(clientId){
    userId = clientId;
}

function renderUserList(userList){
   $(".RoomName").text(params.get("room")); 

   var  html= "";
   for(var i = 0; i< userList.length; i++ ){
    html += '<li>'
    html += '    <a data-id='+ userList[i].id +' href="javascript:void(0)"><img src="assets/images/users/'+ userList[i].image +'.jpg" alt="user-img" class="img-circle"> <span> '+ userList[i].name +' <small class="text-success">online</small></span></a>'
    html += '</li>'
   }

   $("#UserListDiv").html(html);
}

function  renderMessage(id, username, userImage, message, date){

    var  html= "";

    if(id == userId){
        html = getCurrentUserMessage(username, userImage, message, date);
    }
    else {
        html = getUserMessage(username, userImage, message, date);
    }

    $("#divChatbox").append(html);
    scrollToBottom();
 
 }


function getCurrentUserMessage(username, userImage, message, date)
{
    var messsagecontent = "";

    messsagecontent += '<li class="reverse">'
    messsagecontent += '    <div class="chat-content">'
    messsagecontent += '        <h5>' + username + '</h5>'
    messsagecontent += '        <div class="box bg-light-inverse">'+message+'</div>'
    messsagecontent += '    </div>'
    messsagecontent += '    <div class="chat-img"><img src="assets/images/users/'+userImage+'.jpg" alt="user" /></div>'
    messsagecontent += '    <div class="chat-time">'+ date +'</div>'
    messsagecontent += '</li>'

    return messsagecontent;
}

function getUserMessage(username, userImage, message, date)
{
    var messsagecontent = "";

    messsagecontent+= '<li>'
    messsagecontent+= '    <div class="chat-img"><img src="assets/images/users/'+userImage+'.jpg" alt="user" /></div>'
    messsagecontent+= '    <div class="chat-content">'
    messsagecontent+= '        <h5>' + username + '</h5>'
    messsagecontent+= '        <div class="box bg-light-info">'+message+'</div>'
    messsagecontent+= '    </div>'
    messsagecontent+= '    <div class="chat-time">'+ date +'</div>'
    messsagecontent+= '</li>'

    return messsagecontent;
}

function scrollToBottom()
{
    var newMessage =  $("#divChatbox").children("li:last-child");

    var clientHeight =  $("#divChatbox").prop("clientHeight");
    var scrollTop =  $("#divChatbox").prop("scrollTop");
    var scrollHeight =  $("#divChatbox").prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var LastMessageHeight = newMessage.prev().innerHeight() || 0;

    if(clientHeight+scrollTop+newMessageHeight+LastMessageHeight >= scrollHeight){
        $("#divChatbox").scrollTop(scrollHeight);
    }
}

$("#UserListDiv").on('click', 'a', function(){
    console.log($(this).data('id'));
});


$("#SendMessagesForm").on('submit', function(e) {

    e.preventDefault();
    
    if($("#SendMessagesInput").val().trim().length != 0){
        socket.emit('EmmitMessage', { userId: userId, message: $("#SendMessagesInput").val().trim() } , function( data ){ renderMessage(data.id, data.username, data.userImage, data.message, data.date); });
        // SendGlobalMessage(username, $("#SendMessagesInput").val().trim());
        $("#SendMessagesInput").val("");
    }
});
