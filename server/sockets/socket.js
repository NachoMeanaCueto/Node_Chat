const { io } = require("../server");
const { Users } = require("../classes/users");
const { CreateMessage, CreateUserMessage } = require("../utils/utils");
const users = new Users();

io.on('connection', ( client ) => {

    client.on('disconnect', () =>{
        console.log(`Back client desconectado`);    

        let userDeleted = users.deleteUser(client.id);

        client.broadcast.to(userDeleted.room).emit("GlobalMessage", CreateMessage("System", `${userDeleted.name} leave chat`))
        client.broadcast.to(userDeleted.room).emit("userList",  users.getUsersByRoom(userDeleted.room));
         
    })

    client.on("userEntry", (data, callback) => { 
        console.log("user connected", data.username, data.image );

        if(!data.username || !data.room){
            return callback({
                err: true,
                message: 'invalid data'
            })
        }

        let clientId = client.id;
        let userList = users.addUser(clientId, data.username, data.image ,data.room);

        client.join(data.room);
        client.broadcast.to(data.room).emit("GlobalMessage", CreateMessage("System", `${data.username} join chat`))
        client.broadcast.to(data.room).emit("userList",   users.getUsersByRoom(data.room));

        return callback({ clientId , userList });
    });

    // client.emit('ServerEvent', ({id:1, datastring:'string'}));

    client.on('PrivateMessage', function(data){

        let errorMessage;
        if(!data.targetId)
            errorMessage = "targetId is required";
        if(!data.message)
            errorMessage = "message is required";
        if(errorMessage)
            throw new Error(errorMessage);

        let user = users.getUserById(client.id);
          
        client.broadcast.to(data.targetId).emit('PrivateMessage', { message: CreateUserMessage(user.userId,data.message) });
        
        console.log("Catch PrivateMessage: ", data);
    });

    client.on('EmmitMessage', (data, callback) => { 
         console.log("message: ", data );

        let user = users.getUserById(data.userId);
        let username = user.name;
        let userImage = user.image;
        resultmessage = CreateUserMessage(data.userId, username, userImage, data.message);

        client.broadcast.emit("RoomMessage", resultmessage )
    
        callback(resultmessage);
        
        });
   
    console.log(`Back client conectado`); 
});