
var model;

var rotateModus = true;

var oldtime = (new Date()).getTime();
var oldFps = 50; 

/*
$(document).ready(function() 
{
    model = new GameModel();
    
    initView();
});
*/
function initializeTetris() {
    model = new GameModel();
    initView();  
}


function renderingCompleted()
{
    
    //Fps erfassen
    var newtime = (new Date()).getTime();
    var fps = 1 / ((newtime - oldtime) / 1000);
    var timediff = newtime - oldtime;
    oldFps = oldFps + (fps - oldFps)*0.01;
    oldtime = newtime;
      
//Textausgaben
    var divFps = document.getElementById("divFps"); 
    divFps.innerHTML =  "Fps: " + oldFps;
    
//process
    var speedFactor = timediff / (1000/60);
    model.process(timediff, speedFactor);
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
    }
}