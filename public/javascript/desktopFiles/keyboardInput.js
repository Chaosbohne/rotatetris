document.addEventListener('keydown', function(event) {
    switch(event.keyCode)
    {
        case 37: inputReceived("moveLeft"); break;
        case 39: inputReceived("moveRight"); break;
        case 38: inputReceived("moveUp"); break;
        case 40: inputReceived("moveDown"); break;
         
        case 49: inputReceived("rotateLeft"); break;
        case 50: inputReceived("rotateRight"); break;
        
        case 51: inputReceived("reset"); break;
    }
})



