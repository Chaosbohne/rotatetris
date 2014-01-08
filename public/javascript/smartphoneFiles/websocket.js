
  var socket = io.connect('http://rotatetris-61681.euw1.actionbox.io');
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);
  var started = false;

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
    //setReady();
    setTimeout(setReady(),3000);
  });

  //Websocket start message received
  socket.on('start', function() {
    setStart();
  });

  //Websocket disconnected
  socket.on('disconnect', function(reason) {
    console.log('websocket: Disconnected ' + reason);
  });


  //status connecting, update ui
  function setConnecting() {

  }
  
  //status init of websocket, update ui
  function setInitialising() {
    
  }

  //status ready, update ui
  function setReady() {
    $('#ready').removeClass('hidden');
    $('#start').removeClass('hidden');
    $('#loading h2').html('Press a button to start');
    $('#loading h1').addClass('hidden');
    $('#bTop').mousedown(function() {
      socket.emit('start', { roomId:  id});      
      $('#bTop').unbind('mousedown');
      $('#bDown').unbind('mousedown');
      $('#bLeft').unbind('mousedown');
      $('#bRight').unbind('mousedown');
    });
    $('#bDown').mousedown(function() {
      socket.emit('start', { roomId:  id});      
      $('#bTop').unbind('mousedown');
      $('#bDown').unbind('mousedown');
      $('#bLeft').unbind('mousedown');
      $('#bRight').unbind('mousedown');
    });
    $('#bLeft').mousedown(function() {
      socket.emit('start', { roomId:  id});      
      $('#bTop').unbind('mousedown');
      $('#bDown').unbind('mousedown');
      $('#bLeft').unbind('mousedown');
      $('#bRight').unbind('mousedown');
    });
    $('#bRight').mousedown(function() {
      socket.emit('start', { roomId:  id});      
      $('#bTop').unbind('mousedown');
      $('#bDown').unbind('mousedown');
      $('#bLeft').unbind('mousedown');
      $('#bRight').unbind('mousedown');
    });    
  }
  
  function setStart() {
    $('#loading').addClass('hidden');   
    var height = 0;
    if(document.documentElement.clientWidth > document.documentElement.clientHeight) 
      height = document.documentElement.clientHeight;    
    else 
      height = document.documentElement.clientWidth;    
    
    height = height - 200;
    if(height > 0)
      $('#start').css({'margin-top': height/2 + 'px'});
    
    /* listener fuer die rotation */
    i.handle({
       "rotation": {
          //"target": window,
          "axis": "beta",
          "degree": 180,
          //"tolerance": 0.3,
          "callback": function (e) {
             //DEBUG 
             console.log(e.detail.sector);
             //Pe.socket.emit("cmd", {"what": e.detail});
             //document.getElementById("output").innerHTML = e.detail.sector;
             socket.emit('propagate', {key: e.detail.sector});
          }
       },
       "mousedown": {
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
