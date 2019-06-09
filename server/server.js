const express = require('express');

const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 8080;
const socketIO = require('socket.io');
const http = require('http');


app.use(express.static(publicPath));
let server = http.createServer(app);

module.exports.io = socketIO(server);
require("../server/sockets/socket");

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});



