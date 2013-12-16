
  //Establishing websocketconnection
  var socket = io.connect('http://rotatetris-43308.euw1.actionbox.io');
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);

  //Websocket connected
  //send initRoom message
  //init sockethandler
  setConnecting();
  socket.on('connect', function () {
    console.log('websocket: socket connected');
    //get roomid which is the same as logged in url
    setInitialising();
    if(!id) {
      console.log('websocket: Something went wrong! No roomID found!');
    }else {
      console.log('websocket: Sending { initRoom : ' + id + '}');
      //push roomid to server
      socket.emit('initRoom', { roomId:  id});
    }     
  });

  socket.on('ready', function() {
    console.log('websocket: ready');
    setReady();
  });

  socket.on('start', function() {
    console.log('websocket: start');
    setStart();
  });

  //Websocket disconnected
  socket.on('disconnect', function(reason) {
    $('#status').text('Disconnected');
    console.log('websocket: Disconnected ' + reason);
  });

  socket.on('propagate', function (data) {
    console.log('INPUT FROM CLIENT');
    console.log(data);
    switch(data.key) {
      case 'left':
        inputReceived('moveLeft');
        break;
      case 'right':
        inputReceived('moveRight');
        break;
      case 'up':
        inputReceived('moveUp');
        break;
      case 'down':
        inputReceived('moveDown');
        break;
      case 'rotate':
        inputReceived('rotateRight');
        break;        
    }
  });

  //status connecting, update ui
  function setConnecting() {
    $('#statustext').text('Connecting');
  }
  
  //status init of websocket, update ui
  function setInitialising() {
    $('#statustext').text('Initializing');    
  }  

  //status ready, update ui
  function setReady() {
    $('#statustext').text('Ready...');
  }
  

  function setStart() {
    initializeTetris();
  }