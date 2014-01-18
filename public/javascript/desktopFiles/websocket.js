
  //Establishing websocketconnection
  var socket = io.connect('http://rotatetris-61681.euw1.nitrousbox.com');
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

    inputReceived(data.key);
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
    $('#wait').addClass('hidden');
    $('#play').removeClass('hidden');
    initializeTetris();
  }
  

  function setStart() {
    startGame();
  }