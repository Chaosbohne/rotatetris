var GameModel = function ()
{
 
    /*
        Werte in Playarea:
        0   - leer
        1   - feste Blöcke
        50  - blinkende Blöcke (Blöcke werden gleich entfernt)
        51-54- rutscht 1 - 4 Blöcke runter
        100 - bewegliche Figur 
    */
    
    
    //init
    this.gameStatus = 1;  //1-bevor Start  2-Spiel läuft
  
    this.rows = 20;
    this.cols = 11;

    this.playarea = new Array(this.rows);
    this.playareaRotation = 0;
     
    var steptime = 0;
    var stepduration = 1600;
    
    var blinkduration = 1000;
    var blinktime = blinkduration;
    
    this.slideduration = 500;
    this.slidetime = this.slideduration;
   
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
    
    
    //Process
    this.process = function(timediff, speedFactor)
    {
      
      if(this.gameStatus == 1) return;
      
      //Blinken
      if(blinktime < blinkduration)
      {
          blinktime += timediff;
          
          //Blinken beendet
          if(blinktime >= blinkduration)         
          {
               //Zeilen entfernen
              for(var i=0; i<this.rows; i++)
              { 
                  if(this.playarea[i][0] != 50) continue;
                  
                  for(var k=i; k<this.rows-1; k++)
                  {
                      for(var j=0; j<this.cols; j++)
                      {     this.playarea[k][j] = this.playarea[k+1][j];
                            if(this.playarea[k][j] == 1) this.playarea[k][j] = 51;
                            else if((this.playarea[k][j] >= 51) && (this.playarea[k][j] < 54)) this.playarea[k][j]++;
                      }
                  }
                  for(var j=0; j<this.cols; j++) this.playarea[this.rows-1][j] = 0;
              
                  i--;
              }
              
              this.slidetime = 0;
          }
          return;
      }
      
      //Sliden (Runterrutschen der Blöcke nach Blinken)
      if(this.slidetime < this.slideduration)
      {
           this.slidetime += timediff;
          
          //Sliden beendet
          if(this.slidetime >= this.slideduration)         
          {
              for(var i=0; i<this.rows; i++)
              {
                   for(var j=0; j<this.cols; j++) 
                   {
                       if((this.playarea[i][j] >= 51) && (this.playarea[i][j] < 54)) this.playarea[i][j]=1;
                   }
              }
              
              var figureValid = this.createNewFigure();
              if(!figureValid) this.gameLost();
          }
          
          return;
      }
      
      
      //normaler Spielverlauf
      steptime += timediff;
      
      //Figur versetzen
      if(steptime > stepduration)
      {
          //Figur entfernen
          figure.setOnPlayarea(this.playarea, 0);
  
  
          //Figur liegt auf
          if(figure.touchesGround(this.playarea))
          {   figure.setOnPlayarea(this.playarea, 1);
       
              var zeilenEntfernt = false;
       
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
                      var zeilenEntfernt = true;
                      for(var j=0; j<this.cols; j++) this.playarea[i][j] = 50;
                  }
              }
              
              if(zeilenEntfernt == true)
              { 
                  blinktime = 0;
                  return;
              }
              else
              {
                 var figureValid = this.createNewFigure();
                 if(!figureValid) this.gameLost();
              }
          }
          
          //Figur bewegen
          else figure.y--;
          
          //Figur einsetzen
          figure.setOnPlayarea(this.playarea, 100);
          
          steptime = 0;
      }
    };


    this.createNewFigure = function()
    {
        var figureType = Math.floor(Math.random()*FIGURE_NUMBEROFTYPES);
        figure = new Figure(figureType, this.rows, this.cols);
        return figure.canBePlaced(this.playarea);
    }

    
    this.startGame = function()
    {
      this.gameStatus = 2;
    }
  
    //Startzustand herstellen
    this.reset = function()
    {   this.playareaRotation = 0;
        steptime = 0;
         
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
          
    }

    //Spiel verloren
    this.gameLost = function()
    {
        this.reset();
    }
    

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
 
    this.getFigureSizeX = function()    {    return figure.sizex;    }
    this.getFigureSizeY = function()    {    return figure.sizey;    }    
}
