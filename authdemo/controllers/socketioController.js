'use strict'

exports.startSocketio = function(server){
  // here is our socket.io code for the chat room
  console.log('in StartSocketio')
  var io = require('socket.io').listen(server);
  console.log('io = '+io)
  return io
}

exports.initSocketio = function(io){
  console.log('in initSocketio')

  io.on('connection', function(socket){
    
    console.log('a user connected');

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
      io.emit('chat message',msg);
    });

  });

}
