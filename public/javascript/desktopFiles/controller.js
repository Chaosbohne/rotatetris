/*
 * globales Objekt, zum steuern des Spiels
 *
 * gameControler = GC
 */
var GC = function () {};

GC.prototype._model = null;
GC.prototype._rotateModus = true;
GC.prototype._oldtime = (new Date()).getTime();
GC.prototype._oldFps = 50;

GC.prototype.initializeTetris = function () {
  this._model = new GameModel();
  initView();

  return this;
}

GC.prototype.startGame = function () {
  this._model.startGame();

  return this;
}


GC.prototype.renderingCompleted = function () {    
  //Fps erfassen
  var newtime = (new Date()).getTime();
  var fps = 1 / ((newtime - this._oldtime) / 1000);
  var timediff = newtime - this._oldtime;

  this._oldFps = this._oldFps + (fps - this._oldFps)*0.01;
  this._oldtime = newtime;

  //process
  var speedFactor = timediff / (1000/60);

  this._model.process(timediff, speedFactor);
  processBackground(speedFactor);

  return this;
}


GC.prototype.inputReceived = function ( inputType ) {
  switch(inputType) {
    case "moveLeft": model.inputMoveLeft(); break;
    case "moveRight": model.inputMoveRight(); break;
    case "moveUp": model.inputMoveUp(); break;
    case "moveDown": model.inputMoveDown(); break;
    case "rotateLeft": model.inputRotateLeft(); break;
    case "rotateRight": model.inputRotateRight(); break;
    case "reset": model.reset(); break;
  }

  return this;
}




var model;

var rotateModus = true;

var oldtime = (new Date()).getTime();
var oldFps = 50; 

function initializeTetris() {
    model = new GameModel();
    initView();  
}


function startGame() {
  model.startGame();
}


function renderingCompleted()
{
    
    //Fps erfassen
    var newtime = (new Date()).getTime();
    var fps = 1 / ((newtime - oldtime) / 1000);
    var timediff = newtime - oldtime;
    oldFps = oldFps + (fps - oldFps)*0.01;
    oldtime = newtime;
      
    
//process
    var speedFactor = timediff / (1000/60);
    model.process(timediff, speedFactor);
      processBackground(speedFactor);
}


function inputReceived(inputType)
{
    switch(inputType)
    {
        case "moveLeft": model.inputMoveLeft(); break;
        case "moveRight": model.inputMoveRight(); break;
        case "moveUp": model.inputMoveUp(); break;
        case "moveDown": model.inputMoveDown(); break;
        
        case "rotateLeft": model.inputRotateLeft(); break;
        case "rotateRight": model.inputRotateRight(); break;
        
        case "reset": model.reset(); break;
    }
}