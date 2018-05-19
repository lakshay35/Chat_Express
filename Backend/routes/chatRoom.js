var express = require('express');
var router = express.Router();
var io = require('socket.io')({
  chat:'/chatroom'
});

/* Initialize server socket */
let init = (server) => {
    io.attach(server, {
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
    });
}

/* Configure actions with server*/
io.on('connection', (client) => {

  client.on('chat', function(data) {
    io.sockets.emit('chat', data);
  });

  client.on('typing', function(data) {
    client.broadcast.emit('typing', data);
  });
});



module.exports = init;
