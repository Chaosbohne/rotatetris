
/**
 * Module dependencies.
 */

var express = require('express')
  , conf = require('./config/conf')
  , fs = require('fs')
  , http = require('http')
  , socket = require('socket.io');



/**
 * Include Subfiles
 */
var app = express();
require('./config/express')(app, conf);
require('./config/routes')(app);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = socket.listen(server);
io.configure('development', function() {
  io.set('log level', 0);
});


// Socket conneting
io.sockets.on('connection', function(socket) {
  
  //Message initRoom received
  //Pushing each socket in a virtual room foreach id
  //Communicating sockets (desktop, smartphone) in a private room
  //Room can have max 2 sockets (1 desktop, 1 smartphone)
  socket.on('initRoom', function(data) {
    //Valid message?
    if(!data || !data.roomId)
      socket.disconnect('No valid initRoommessage');
    
    console.log(data);
    
    //Is enough place in Room?
    if(io.sockets.clients(data.roomId).length < 1) {
      socket.join(data.roomId);
    //Start game with 2 clients
    }else if(io.sockets.clients(data.roomId).length === 1) {
      //socket.emit('start');
      socket.join(data.roomId);
      io.sockets.in(data.roomId).emit('ready');
    }
    //Room is full, go anywhere else
    else{
      socket.disconnect('Room is full');      
    }
  });  
 
  socket.on('start', function(data) {
    console.log('start');
    if(!data || !data.roomId)
      socket.disconnect('No valid initRoommessage');
    
    io.sockets.in(data.roomId).emit('start');
  });
  
  socket.on('propagate', function(s) {
    socket.broadcast.emit('propagate', s);
  });  
});


