var FIGURE_NUMBEROFTYPES = 7;

var Figure = function (typein, rows, cols)
{    

    this.setPiecesAndSize = function()
    {
        switch(this.type)
        {
            case 0:         //--
                            //--
                this.sizex = 2; this.sizey = 2;
                this.pieces = [[1, 1], [1, 1]];
                break;
            case 1:         // -
                            //---
                this.sizex = 3; this.sizey = 3;
                if(this.rot == 0)  this.pieces = [[0, 0, 0], [1, 1, 1], [0, 1, 0]];
                if(this.rot == 1)  this.pieces = [[0, 1, 0], [0, 1, 1], [0, 1, 0]];
                if(this.rot == 2)  this.pieces = [[0, 1, 0], [1, 1, 1], [0, 0, 0]];
                if(this.rot == 3)  this.pieces = [[0, 1, 0], [1, 1, 0], [0, 1, 0]];
                break;
           case 2:         //  -
                           //---
                this.sizex = 3; this.sizey = 3;
                if(this.rot == 0)  this.pieces = [[0, 1, 0], [0, 1, 0], [1, 1, 0]];
                if(this.rot == 1)  this.pieces = [[0, 0, 0], [1, 1, 1], [0, 0, 1]];
                if(this.rot == 2)  this.pieces = [[0, 1, 1], [0, 1, 0], [0, 1, 0]];
                if(this.rot == 3)  this.pieces = [[1, 0, 0], [1, 1, 1], [0, 0, 0]];
                break;
           case 3:         //---
                           //  -
                this.sizex = 3; this.sizey = 3;
                if(this.rot == 0)  this.pieces = [[0, 1, 0], [0, 1, 0], [0, 1, 1]];
                if(this.rot == 1)  this.pieces = [[0, 0, 1], [1, 1, 1], [0, 0, 0]];
                if(this.rot == 2)  this.pieces = [[1, 1, 0], [0, 1, 0], [0, 1, 0]];
                if(this.rot == 3)  this.pieces = [[0, 0, 0], [1, 1, 1], [1, 0, 0]];
                break;
            case 4:        // --
                           //--
                this.sizex = 3; this.sizey = 3;
                if(this.rot == 0)  this.pieces = [[0, 0, 0], [1, 1, 0], [0, 1, 1]];
                if(this.rot == 1)  this.pieces = [[0, 1, 0], [1, 1, 0], [1, 0, 0]];
                if(this.rot == 2)  this.pieces = [[0, 0, 0], [1, 1, 0], [0, 1, 1]];
                if(this.rot == 3)  this.pieces = [[0, 1, 0], [1, 1, 0], [1, 0, 0]];
                break;               
            case 5:        //--
                           // --
                this.sizex = 3; this.sizey = 3;
                if(this.rot == 0)  this.pieces = [[0, 0, 0], [0, 1, 1], [1, 1, 0]];
                if(this.rot == 1)  this.pieces = [[0, 1, 0], [0, 1, 1], [0, 0, 1]];
                if(this.rot == 2)  this.pieces = [[0, 0, 0], [0, 1, 1], [1, 1, 0]];
                if(this.rot == 3)  this.pieces = [[0, 1, 0], [0, 1, 1], [0, 0, 1]];
                break;
            case 6:         //----
                this.sizex = 4; this.sizey = 4;
                if(this.rot == 0)  this.pieces = [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]];
                if(this.rot == 1)  this.pieces = [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]];
                if(this.rot == 2)  this.pieces = [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]];
                if(this.rot == 3)  this.pieces = [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]];
                break;
        }
    }
    
    this.type = typein;
    this.rot = 0;
     
    this.pieces;
    this.sizex = 2;
    this.sizey = 2;
      
    this.setPiecesAndSize();

    this.x = Math.floor((cols-this.sizex) / 2);
    this.y = rows - this.sizey;
   
    
    this.setOnPlayarea = function(playarea, value)
    {
        for(var i=0; i<this.sizey; i++)
        {  
             for(var j=0; j<this.sizex; j++)
             {
                        
                 if(this.pieces[i][j] == 1)
                 {
                    playarea[this.y+i][this.x+j] = value;
                 }
             }
        }
    }
    
    this.touchesGround = function(playarea)
    {
        for(var i=0; i<this.sizey; i++)
        {  
             for(var j=0; j<this.sizex; j++)
             {
                 if(this.pieces[i][j] == 1)
                 {
                    if(this.y+i <= 0) return true;
                    var v = playarea[this.y+i-1][this.x+j];
                    if((v > 0) && (v < 100)) return true;
                 }
             }
        }
        return false;
    }
    
    
    this.canMoveX = function(playarea, cols, moveValue)
    { 
        for(var i=0; i<this.sizey; i++)
        {  
             for(var j=0; j<this.sizex; j++)
             {
                 if(this.pieces[i][j] == 1)
                 {
                    if(this.x+moveValue+j < 0) return false;
                    if(this.x+moveValue+j >= cols) return false;
                     var v = playarea[this.y+i][this.x+moveValue+j];
                    if((v > 0) && (v < 100)) return false;
                 }
             }
        }
        return true;
    }
    
    this.rotateIfPossible = function(playarea, cols, direction)
    {
        var oldrot = this.rot;
        this.rot += direction;
        if(this.rot < 0) this.rot += 4;
        if(this.rot >= 4) this.rot -= 4;
        this.setPiecesAndSize();
        
        if(!this.canMoveX(playarea, cols, 0))
        {
            this.rot = oldrot;
            this.setPiecesAndSize();
            return false;
        }
        return true;
    }
}

