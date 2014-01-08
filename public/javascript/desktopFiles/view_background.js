var gl;

var backgrcubeVertexPos;
var backgrcubeVertexIndex;
var backgrcubeVertexColor;
var backgrcubeActiveVertexColor;
var backgrcubeVertexTextureCoord;
var backgrcubeNormals;

var backgrcubeVertexPosAttribute;
var backgrcubeVertexNormalAttribute;
var backgrcubeVertexColorAttribute;



//Farbdefinitionen
var backgrcubeR = 0.30;
var backgrcubeG = 0.10;
var backgrcubeB = 0.05;


var numberOfBackgroundCubes = 15;
var backgroundCubes = new Array(numberOfBackgroundCubes);

//Shader
var backgrcubeShader;

var BackgroundCube = function (relXPos)
{    

    this.x = -30+relXPos*60;//+Math.floor(Math.random()*10-0);
    this.y = Math.floor(Math.random()*40-20);
    this.z = Math.floor(Math.random()*20-30);
    
    this.xspeed = Math.floor(Math.random()*2+1)/300;
    this.yspeed = Math.floor(Math.random()*4-2)/500;
    this.zspeed = 0;
    
    this.rotx = 0;
    this.roty = 0;
    this.rotspeedx = Math.floor(Math.random()*20-10)/80;
    this.rotspeedy = Math.floor(Math.random()*20-10)/80;
    
    this.size = Math.floor(Math.random()*20)/4;
    
    
    
    this.process = function(speedFactor)
    {
        this.x += this.xspeed*speedFactor;
        this.y += this.yspeed*speedFactor;
        this.z += this.zspeed*speedFactor;
        this.rotx += this.rotspeedx*speedFactor;
        this.roty += this.rotspeedy*speedFactor;
        
        if(this.x > 30) this.x = -30;
        if(this.y > 30) this.yspeed *= -1;
        if(this.y < -30) this.yspeed *= -1;
    }
}

function initViewbackgrcube(glin)
{
    
    for(var i=0; i<numberOfBackgroundCubes; i++)
    {
        backgroundCubes[i] = new BackgroundCube(i/numberOfBackgroundCubes);
    }
    
    gl = glin;
    
    backgrcubeShader = loadShader("javascript/desktopFiles/shaders/lightning.vs", "javascript/desktopFiles/shaders/lightning.fs")
    gl.useProgram(backgrcubeShader);

    
    backgrcubeVertexPosAttribute = gl.getAttribLocation(backgrcubeShader, "aVertexPosition");
    backgrcubeVertexNormalAttribute   = gl.getAttribLocation(backgrcubeShader, "aVertexNormal");
    backgrcubeVertexColorAttribute = gl.getAttribLocation(backgrcubeShader, "aVertexColor");


    gl.enableVertexAttribArray(backgrcubeVertexPosAttribute);
    gl.enableVertexAttribArray(backgrcubeVertexNormalAttribute);
    gl.enableVertexAttribArray(backgrcubeVertexColorAttribute);
    
    
    //Vertexpositions
    backgrcubeVertexPos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, backgrcubeVertexPos);
   var faMainObjVertexPos = [
    // Vorderseite
     -1.0, -1.0, 1.0,
      1.0, -1.0, 1.0,
      1.0, 1.0, 1.0,
     -1.0, 1.0, 1.0,

     // Rueckseite
     -1.0, -1.0, -1.0,
     -1.0, 1.0, -1.0,
      1.0, 1.0, -1.0,
      1.0, -1.0, -1.0,

     // Oberseite
     -1.0, 1.0, -1.0,
     -1.0, 1.0, 1.0,
      1.0, 1.0, 1.0,
      1.0, 1.0, -1.0,

     // Unterseite
     -1.0, -1.0, -1.0,
      1.0, -1.0, -1.0,
      1.0, -1.0, 1.0,
     -1.0, -1.0, 1.0,

     // rechte Seite
      1.0, -1.0, -1.0,
      1.0, 1.0, -1.0,
      1.0, 1.0, 1.0,
      1.0, -1.0, 1.0,

     // linke Seite
     -1.0, -1.0, -1.0,
     -1.0, -1.0, 1.0,
     -1.0, 1.0, 1.0,
     -1.0, 1.0, -1.0,
   
   ];
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(faMainObjVertexPos), gl.STATIC_DRAW);
   backgrcubeVertexPos.itemSize = 3;
   backgrcubeVertexPos.numItems = faMainObjVertexPos / backgrcubeVertexPos.itemSize;

    //Normals
   backgrcubeNormals = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, backgrcubeNormals);
   var faMainObjNormals = [
     // Vorderseite
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      
     // Rueckseite
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      
     // Oberseite
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,

     // Unterseite
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,

     // rechte Seite
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,

     // linke Seite
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
     
    ];
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(faMainObjNormals), gl.STATIC_DRAW);
   backgrcubeNormals.itemSize = 3;
   backgrcubeNormals.numItems = faMainObjNormals / backgrcubeNormals.itemSize;


    //Colors
   backgrcubeVertexColor = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, backgrcubeVertexColor);
  
   
   var backgrcubeColors = [

    backgrcubeR,backgrcubeG,backgrcubeB,
    backgrcubeR,backgrcubeG,backgrcubeB,
    backgrcubeR,backgrcubeG,backgrcubeB,
    backgrcubeR,backgrcubeG,backgrcubeB,
 
    backgrcubeR,backgrcubeG,backgrcubeB,
    backgrcubeR,backgrcubeG,backgrcubeB,
    backgrcubeR,backgrcubeG,backgrcubeB,
    backgrcubeR,backgrcubeG,backgrcubeB,
   
    backgrcubeR,backgrcubeG,backgrcubeB,
    backgrcubeR,backgrcubeG,backgrcubeB,
    backgrcubeR,backgrcubeG,backgrcubeB,
    backgrcubeR,backgrcubeG,backgrcubeB,
    
    backgrcubeR,backgrcubeG,backgrcubeB,
    backgrcubeR,backgrcubeG,backgrcubeB,
    backgrcubeR,backgrcubeG,backgrcubeB,
    backgrcubeR,backgrcubeG,backgrcubeB,
 
    backgrcubeR,backgrcubeG,backgrcubeB,
    backgrcubeR,backgrcubeG,backgrcubeB,
    backgrcubeR,backgrcubeG,backgrcubeB,
    backgrcubeR,backgrcubeG,backgrcubeB,
 
    backgrcubeR,backgrcubeG,backgrcubeB,
    backgrcubeR,backgrcubeG,backgrcubeB,
    backgrcubeR,backgrcubeG,backgrcubeB,
    backgrcubeR,backgrcubeG,backgrcubeB,
   ];
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(backgrcubeColors), gl.STATIC_DRAW);
   backgrcubeVertexColor.itemSize = 3;
   backgrcubeVertexColor.numItems = backgrcubeColors / backgrcubeVertexColor.itemSize;
   
   
   //VertexInidzes
   backgrcubeVertexIndex = gl.createBuffer();
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, backgrcubeVertexIndex);
   var faMainObjVertexIndices = [
     0, 1, 2, 0, 2, 3, // Vorderseite
     4, 5, 6, 4, 6, 7, // Rückseite
     8, 9, 10, 8, 10, 11, // Oberseite
     12, 13, 14, 12, 14, 15, // Unterseite
     16, 17, 18, 16, 18, 19, // rechte Seite
     20, 21, 22, 20, 22, 23 // linke Seite
   ];
   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faMainObjVertexIndices), gl.STATIC_DRAW);
   backgrcubeVertexIndex.itemSize = 1;
   backgrcubeVertexIndex.numItems = faMainObjVertexIndices.length;
}



function preparebackgrcubeDraw(pMatrix, ambientR, ambientG, ambientB, vAdjustedLDir, directR, directG, directB)
{
    gl.useProgram(backgrcubeShader);
    
    gl.uniformMatrix4fv(gl.getUniformLocation(backgrcubeShader, "uPMatrix"), false, pMatrix); 
    
    gl.uniform3f(gl.getUniformLocation(backgrcubeShader, "uAmbientColor"), ambientR, ambientG, ambientB);
    gl.uniform3f(gl.getUniformLocation(backgrcubeShader, "uLightingDirection"),vAdjustedLDir[0],vAdjustedLDir[1],vAdjustedLDir[2]);
    gl.uniform3f(gl.getUniformLocation(backgrcubeShader, "uDirectionalColor"), directR, directG, directB);
    
    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
}

function bindbackgrcubeBuffer()
{
    gl.bindBuffer(gl.ARRAY_BUFFER, backgrcubeNormals);
    gl.vertexAttribPointer(backgrcubeVertexNormalAttribute, backgrcubeNormals.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER,backgrcubeVertexPos);
    gl.vertexAttribPointer(backgrcubeVertexPosAttribute,backgrcubeVertexPos.itemSize, gl.FLOAT, false, 0,0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER,backgrcubeVertexColor);
    gl.vertexAttribPointer(backgrcubeVertexColorAttribute, backgrcubeVertexColor.itemSize, gl.FLOAT, false, 0,0);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, backgrcubeVertexIndex);
}


function drawbackgrcubes()
{
    for(var i=0; i<numberOfBackgroundCubes; i++)
    {
        var mvMatrix = new mat4.create();
        mat4.identity(mvMatrix);
        mat4.translate(mvMatrix,[ backgroundCubes[i].x,  backgroundCubes[i].y,  backgroundCubes[i].z]);
        mat4.rotateX(mvMatrix, backgroundCubes[i].rotx* Math.PI / 180.0);
        mat4.rotateY(mvMatrix, backgroundCubes[i].roty* Math.PI / 180.0);
        mat4.scale(mvMatrix, [backgroundCubes[i].size, backgroundCubes[i].size, backgroundCubes[i].size]);
        
        var normalMatrix = new mat4.create();
        mat4.set(mvMatrix, normalMatrix);    
        normalMatrix = mat4.transpose( mat4.inverse(normalMatrix));
    
        gl.uniformMatrix4fv(gl.getUniformLocation(backgrcubeShader, "uMVMatrix"), false, mvMatrix);
        gl.uniformMatrix4fv(gl.getUniformLocation(backgrcubeShader, "uNMatrix"), false, normalMatrix);
         
        gl.drawElements(gl.TRIANGLES, backgrcubeVertexIndex.numItems, gl.UNSIGNED_SHORT, 0);
    }
}


function processBackground(speedFactor)
{
    for(var i=0; i<numberOfBackgroundCubes; i++)
    {
        backgroundCubes[i].process(speedFactor)
    }
}
