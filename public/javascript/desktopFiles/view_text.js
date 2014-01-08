
var TextDrawer = function()
{
    this.Chars = new Array(10);
    this.Chars[0] =  [[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]];
    this.Chars[1] =  [[1, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [1, 1, 1]];
    this.Chars[2] =  [[1, 1, 1], [0, 0, 1], [1, 1, 1], [1, 0, 0], [1, 1, 1]];
    this.Chars[3] =  [[1, 1, 1], [0, 0, 1], [1, 1, 1], [0, 0, 1], [1, 1, 1]];
    this.Chars[4] =  [[1, 0, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1], [0, 0, 1]];
    this.Chars[5] =  [[1, 1, 1], [1, 0, 0], [1, 1, 1], [0, 0, 1], [1, 1, 1]];
    this.Chars[6] =  [[1, 1, 1], [1, 0, 0], [1, 1, 1], [1, 0, 1], [1, 1, 1]];
    this.Chars[7] =  [[1, 1, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]];
    this.Chars[8] =  [[1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 1, 1]];
    this.Chars[9] =  [[1, 1, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1], [1, 1, 1]];

    this.CharsScore = new Array(6);
    this.CharsScore[0] =  [[1, 1, 1], [1, 0, 0], [1, 1, 1], [0, 0, 1], [1, 1, 1]];
    this.CharsScore[1] =  [[1, 1, 1], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 1, 1]];
    this.CharsScore[2] =  [[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]];
    this.CharsScore[3] =  [[1, 1, 1], [1, 0, 1], [1, 1, 0], [1, 0, 1], [1, 0, 1]];
    this.CharsScore[4] =  [[1, 1, 1], [1, 0, 0], [1, 1, 1], [1, 0, 0], [1, 1, 1]];
    this.CharsScore[5] =  [[0, 0, 0], [1, 0, 0], [0, 0, 0], [1, 0, 0], [0, 0, 0]];
  
    

    this.drawNumber = function(number, startx, bottomy)
    {
        var digits;
        if(number < 10) digits = 1;
        else if(number < 100) digits = 2;
        else if(number < 1000) digits = 3;
        else if(number < 10000) digits = 4;
        else digits = 5;
        
        var n = number;
        var drawx = startx+(digits*4);
        for(var d = 0; d<digits; d++)
        {
            var newn = Math.floor(n/10);
            var digit = n-newn*10;
            n = newn;
        
            for(var xc = 2; xc >= 0; xc--)
            {
                drawx--;
                
                var drawy = bottomy;
                for(var yc = 4; yc >= 0; yc--)
                {
                    if(this.Chars[digit][yc][xc] == 1)
                    {
                        var mvMatrix = new mat4.create();
                        mat4.identity(mvMatrix);
                        mat4.translate(mvMatrix,[drawx, drawy, 0]);
                        mat4.scale(mvMatrix, [0.8, 0.8, 0.8]);
                                     
                        var normalMatrix = new mat4.create();
                        mat4.set(mvMatrix, normalMatrix);    
                        normalMatrix = mat4.transpose( mat4.inverse(normalMatrix));
                
                        drawStone(mvMatrix, normalMatrix);
                    }
                    
                    drawy++;
                }
            }
            drawx--;
        } 
    }
    
    this.drawNumberRightBound = function(number, endx, bottomy)
    {
        var digits;
        if(number === 0) digits = 1;
        else digits = Math.floor(Math.log(number)/Math.log(10)+1);
        this.drawNumber(number, endx-(digits*4), bottomy);
        
    }
    
    
    this.drawReachedScore = function(score, startx, bottomy)
    {
      
        var drawx = startx;
        for(var d = 0; d<6; d++)
        {
          
            for(var xc = 0; xc < 3; xc++)
            {
                var drawy = bottomy;
                for(var yc = 4; yc >= 0; yc--)
                {
                    if(this.CharsScore[d][yc][xc] == 1)
                    {
                        var mvMatrix = new mat4.create();
                        mat4.identity(mvMatrix);
                        mat4.translate(mvMatrix,[drawx, drawy, 0]);
                        mat4.scale(mvMatrix, [0.8, 0.8, 0.8]);
                                     
                        var normalMatrix = new mat4.create();
                        mat4.set(mvMatrix, normalMatrix);    
                        normalMatrix = mat4.transpose( mat4.inverse(normalMatrix));
                
                        drawStone(mvMatrix, normalMatrix);
                    }
                    drawy++;
                }
                drawx++
            }
            drawx++;
        }
        
        this.drawNumber(score, drawx-2, bottomy);
    }
}


