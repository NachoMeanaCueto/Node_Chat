
var socket = io();
var params = new URLSearchParams(window.location.search);

var username = params.get('name');
var room = params.get('room');

if(!username) username = 'Anonimus'; 
if(!room) room = 'default'; 

socket.on('connect', function(){
    console.log("connected");
    var image = Math.floor(Math.random() * 13)+1;
    socket.emit("userEntry", { username, image, room }, function(data)
    {
        setCurrentUserId(data.clientId);
        renderUserList(data.userList);  
     });
});

socket.on('disconnect', function(){
    console.log("connetion lost");
});

socket.on('GlobalMessage', function(data){
    console.log(`Globalmessage`, data );
   //console.log(`${data.user}: ${data.message}`);
   
});

socket.on('RoomMessage', function(data){

    renderMessage(data.id, data.username, data.userImage, data.message, data.date);
   //console.log(`${data.user}: ${data.message}`);
   
});
// socket.emit('PrivateMessage', { targetId , menssage } ); 


socket.on('PrivateMessage', function(data){
    console.log("Catch PrivateMessage: ", data);
});

socket.on('ServerEvent', function(data){
    console.log("Catch ServerEvent: ", data);
});

function SendGlobalMessage(userId, message){

    socket.emit('EmmitMessage', { userId: userId, message: message } , function( resp ){console.log('Server response ', resp); }); 

}

