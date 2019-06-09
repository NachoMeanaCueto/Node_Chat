
var socket = io();
var params = new URLSearchParams(window.location.search);

var username = params.get('name');
var room = params.get('room');

if(!username) username = 'Anonimus'; 
if(!room) room = 'default'; 

socket.on('connect', function(){
    console.log("connected");

    socket.emit("userEntry", { username , room}, function(data)
    {
        console.log(data);
     });
});

socket.on('disconnect', function(){
    console.log("connetion lost");
});

socket.on('GlobalMessage', function(data){
   console.log(`${data.user}: ${data.message}`);
});

// socket.emit('PrivateMessage', { targetId , menssage } ); 


socket.on('PrivateMessage', function(data){
    console.log("Catch PrivateMessage: ", data);
});

socket.on('ServerEvent', function(data){
    console.log("Catch ServerEvent: ", data);
});

socket.emit('EmmitMessage', { user:'usuario', menssage: 'message...' } , function( resp ){console.log('Server response ', resp); }); 
