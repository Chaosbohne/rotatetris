var GameModel = function ()
{
 
    
    
    
    this.rows = 20;
    this.cols = 10;

    this.playarea = new Array(this.rows);
    this.playareaRotation = 0;
     
    var steptime = 0;
    var stepduration = 500;
    
    for(var i=0; i<this.rows; i++)
    {
         this.playarea[i] = new Array(this.cols);
         for(var j=0; j<this.cols; j++) this.playarea[i][j] = 0;

    }
    
    for(var i=0; i<10; i++)
    {
         this.playarea[i][0] = 1;
         this.playarea[i][this.cols-1] = 1;
    }
    
    for(var i=0; i<2; i++)
    {
         for(var j=0; j<6; j++) this.playarea[i][j] = 1;
    }
  
    var figureType = Math.floor(Math.random()*FIGURE_NUMBEROFTYPES);
    figure = new Figure(figureType, this.rows, this.cols);
    figure.setOnPlayarea(this.playarea, 100);
      
    
    this.process = function(timediff, speedFactor)
    {
      steptime += timediff;
      if(steptime > stepduration)
      {
          
          figure.setOnPlayarea(this.playarea, 0);
  
          if(figure.touchesGround(this.playarea))
          {   figure.setOnPlayarea(this.playarea, 1);
       
       
              //Zeilen entfernen
              for(var i=0; i<this.rows; i++)
              {
                  //gefüllte Felder zählen
                  var sum = 0;
                  for(var j=0; j<this.cols; j++)
                  {
                      if(this.playarea[i][j] > 0) sum++;
                  }
                  
                  //Zeile voll
                  if(sum == this.cols)
                  {
                      for(var k=i; k<this.rows-1; k++)
                      {
                          for(var j=0; j<this.cols; j++) this.playarea[k][j] = this.playarea[k+1][j];
                      }
                      for(var j=0; j<this.cols; j++) this.playarea[this.rows-1][j] = 0;
                      
                      i--;
                  }
              }
       
             var figureType = Math.floor(Math.random()*FIGURE_NUMBEROFTYPES);
              figure = new Figure(figureType, this.rows, this.cols);
          }
          else figure.y--;
          figure.setOnPlayarea(this.playarea, 100);
          
          steptime = 0;
      }
    };


    this.logicMoveLeft = function()
    {
       if(figure.canMoveX(this.playarea, this.cols, -1))
        {
             figure.setOnPlayarea(this.playarea, 0);
             figure.x--;
             figure.setOnPlayarea(this.playarea, 100);
        }
    }
    
    this.logicMoveRight = function()
    {
        if(figure.canMoveX(this.playarea, this.cols, 1))
        {
             figure.setOnPlayarea(this.playarea, 0);
             figure.x++;
             figure.setOnPlayarea(this.playarea, 100);
        }
    }
    
    this.logicMoveDown = function()
    {
        if(!figure.touchesGround(this.playarea))
        {
             figure.setOnPlayarea(this.playarea, 0);
             figure.y--;
             figure.setOnPlayarea(this.playarea, 100);
             if(figure.touchesGround(this.playarea)) steptime = stepduration-100;
        }
    }
    
    this.inputMoveLeft = function()
    {
        if(this.playareaRotation == 0) this.logicMoveLeft();
        if(this.playareaRotation == 2) this.logicMoveRight();
        if(this.playareaRotation == 3) this.logicMoveDown();
    }
    
    this.inputMoveRight = function()
    {
        if(this.playareaRotation == 0) this.logicMoveRight();
        if(this.playareaRotation == 1) this.logicMoveDown();
        if(this.playareaRotation == 2) this.logicMoveLeft();
     }

    this.inputMoveUp = function()
    {
        if(this.playareaRotation == 1) this.logicMoveRight();
        if(this.playareaRotation == 2) this.logicMoveDown();
        if(this.playareaRotation == 3) this.logicMoveLeft();
    }
    
    this.inputMoveDown = function()
    {
       if(this.playareaRotation == 0) this.logicMoveDown();
       if(this.playareaRotation == 1) this.logicMoveLeft();
       if(this.playareaRotation == 3) this.logicMoveRight();
    }

    this.inputRotateLeft = function()
    {
        figure.setOnPlayarea(this.playarea, 0);
        if(figure.rotateIfPossible(this.playarea, this.cols, 1) && rotateModus)
        {
            this.playareaRotation++;
            if(this.playareaRotation >= 4) this.playareaRotation -= 4;
        }
        figure.setOnPlayarea(this.playarea, 100);
    }
        
    this.inputRotateRight = function()
    {
        figure.setOnPlayarea(this.playarea, 0);
        if(figure.rotateIfPossible(this.playarea, this.cols, -1) && rotateModus)
        {
            this.playareaRotation--;
            if(this.playareaRotation < 0) this.playareaRotation += 4;
        }
        figure.setOnPlayarea(this.playarea, 100);
    }
    
    this.getFigureCenterX = function()    {    return figure.x + figure.sizex*0.5;    }
    this.getFigureCenterY = function()    {    return figure.y + figure.sizey*0.5;    }
 
    
}
