/**
 * Module Dependencies
 */ 
 
 /**
  * Routes
  */
module.exports = function(app) {
    
  var tetris = require('../controller/tetris');
  
  app.get('/', tetris.start);
  
  app.get('/play', tetris.play);

  app.get('/test', tetris.test);  
  
  app.get('/:id', tetris.playDesktop);
};