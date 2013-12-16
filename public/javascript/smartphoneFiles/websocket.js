
  var socket = io.connect('http://rotatetris-61681.euw1.actionbox.io');
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

  //Websocket ready message received
  socket.on('ready', function() {
    setReady();
  });

  //Websocket start message received
  socket.on('start', function() {
    setStart();
  });

  //Websocket disconnected
  socket.on('disconnect', function(reason) {
    $('#status').text('Disconnected');
    console.log('websocket: Disconnected ' + reason);
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
    $('#ready').removeClass('hidden');
    $('#btnstart').click(function() {
      socket.emit('start', { roomId:  id});
    });
  }
  
  function setStart() {
    $('#start').removeClass('hidden');
    $('#status').addClass('hidden');
    /* listener fuer die rotation */
    i.handle({
       "rotation": {
          //"target": window,
          //"axis": "alpha",
          "degree": 90,
          //"tolerance": 0.3,
          "callback": function (e) {
             //DEBUG 
             //console.log(e.detail);
             //Pe.socket.emit("cmd", {"what": e.detail});
             //document.getElementById("output").innerHTML = e.detail.sector;
             socket.emit('propagate', {key: 'rotateRight'});
          }
       },
       "click": {
          "bTop": function (e) {
             socket.emit('propagate', {key: 'moveUp'});
          },
          "bLeft": function (e) {
             socket.emit('propagate', {key: 'moveLeft'});
          },
          "bRight": function (e) {
             socket.emit('propagate', {key: 'moveRight'});
          },
          "bDown": function (e) {
             socket.emit('propagate', {key: 'moveDown'});
          }
       }
    });    
  }







/*
  $('#left').click(function() {
    //socket.emit('left');
    socket.emit('propagate', {key: 'left'});
  });
  
  $('#right').click(function() {
    //socket.emit('right');
    socket.emit('propagate', {key: 'right'});
  });
  
  $('#up').click(function() {
    //socket.emit('up');
    socket.emit('propagate', {key: 'up'});
  });
  
  $('#down').click(function() {
    //socket.emit('down');
    socket.emit('propagate', {key: 'down'});
  });
  
  $('#rotate').click(function() {
    //socket.emit('rotate');
    socket.emit('propagate', {key: 'rotate'});
  });
  */