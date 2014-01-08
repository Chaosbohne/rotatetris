var gl;

var stoneVertexPos;
var stoneVertexIndex;
var stoneVertexColor;
var stoneActiveVertexColor;
var stoneVertexTextureCoord;
var stoneNormals;

var stoneVertexPosAttribute;
var stoneVertexNormalAttribute;
var stoneVertexColorAttribute;
var stoneVertexTextureCoordAttribute;


//Farbdefinitionen
var stoneFrontR = 0.3;
var stoneFrontG = 0.5;
var stoneFrontB = 1.0;

var stoneBorderR = 0.4;
var stoneBorderG = 0.6;
var stoneBorderB = 1.0;

var activeStoneFrontR = 0.25;
var activeStoneFrontG = 0.73;
var activeStoneFrontB = 0.625;

var activeStoneBorderR = 0.25;
var activeStoneBorderG = 0.73;
var activeStoneBorderB = 0.625;

//Shader
var stoneShader;


function initViewStone(glin)
{
    gl = glin;
    
    
    stoneShader = loadShader("javascript/desktopFiles/shaders/lightning.vs", "javascript/desktopFiles/shaders/lightning.fs")
    gl.useProgram(stoneShader);

    
    stoneVertexPosAttribute = gl.getAttribLocation(stoneShader, "aVertexPosition");
    stoneVertexNormalAttribute   = gl.getAttribLocation(stoneShader, "aVertexNormal");
    stoneVertexColorAttribute = gl.getAttribLocation(stoneShader, "aVertexColor");
    
 //   stoneVertexTextureCoordAttribute = gl.getAttribLocation(stoneShader, "aTextureCoord");
 //   gl.enableVertexAttribArray(stoneVertexTextureCoordAttribute);

    gl.enableVertexAttribArray(stoneVertexPosAttribute);
    gl.enableVertexAttribArray(stoneVertexNormalAttribute);
    gl.enableVertexAttribArray(stoneVertexColorAttribute);
    
    
    //Vertexpositions
    stoneVertexPos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, stoneVertexPos);
   var faMainObjVertexPos = [
      // Vorderseite
     0.2, 0.2, 0.2,
      0.8, 0.2, 0.2,
      0.8, 0.8, 0.2,
     0.2, 0.8, 0.2,

     // Rueckseite
     0.0, 0.0, 0.0,
     0.0, 1.0, 0.0,
      1.0, 1.0, 0.0,
      1.0, 0.0, 0.0,

     // Oberseite
     0.0, 1.0, 0.0,
     0.2, 0.8, 0.2,
      0.8,  0.8, 0.2,
     1.0, 1.0, 0.0,

     // Unterseite
     0.0, 0.0, 0.0,
     1.0, 0.0, 0.0,
     0.8, 0.2, 0.2,
     0.2, 0.2, 0.2,

     // rechte Seite
      1.0, 0.0, 0.0,
      1.0, 1.0, 0.0,
      0.8, 0.8, 0.2,
      0.8, 0.2, 0.2,

     // linke Seite
     0.0, 0.0, 0.0,
     0.2, 0.2, 0.2,
     0.2, 0.8, 0.2,
     0.0, 1.0, 0.0,
   
   ];
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(faMainObjVertexPos), gl.STATIC_DRAW);
   stoneVertexPos.itemSize = 3;
   stoneVertexPos.numItems = faMainObjVertexPos / stoneVertexPos.itemSize;

    //Normals
   stoneNormals = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, stoneNormals);
   var faMainObjNormals = [
     // Vorderseite
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,

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
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(faMainObjNormals), gl.STATIC_DRAW);
   stoneNormals.itemSize = 3;
   stoneNormals.numItems = faMainObjNormals / stoneNormals.itemSize;


    //Colors
   stoneVertexColor = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, stoneVertexColor);
  
   
   var stoneColors = [

    stoneFrontR,stoneFrontG,stoneFrontB,
    stoneFrontR,stoneFrontG,stoneFrontB,
    stoneFrontR,stoneFrontG,stoneFrontB,
    stoneFrontR,stoneFrontG,stoneFrontB,
 
    stoneBorderR, stoneBorderG, stoneBorderB,
    stoneBorderR, stoneBorderG, stoneBorderB,
    stoneBorderR, stoneBorderG, stoneBorderB,
    stoneBorderR, stoneBorderG, stoneBorderB,
  
    stoneBorderR, stoneBorderG, stoneBorderB,
    stoneBorderR, stoneBorderG, stoneBorderB,
    stoneBorderR, stoneBorderG, stoneBorderB,
    stoneBorderR, stoneBorderG, stoneBorderB,
    
    stoneBorderR, stoneBorderG, stoneBorderB,
    stoneBorderR, stoneBorderG, stoneBorderB,
    stoneBorderR, stoneBorderG, stoneBorderB,
    stoneBorderR, stoneBorderG, stoneBorderB,

    stoneBorderR, stoneBorderG, stoneBorderB,
    stoneBorderR, stoneBorderG, stoneBorderB,
    stoneBorderR, stoneBorderG, stoneBorderB,
    stoneBorderR, stoneBorderG, stoneBorderB,

    stoneBorderR, stoneBorderG, stoneBorderB,
    stoneBorderR, stoneBorderG, stoneBorderB,
    stoneBorderR, stoneBorderG, stoneBorderB,
    stoneBorderR, stoneBorderG, stoneBorderB,
   ];
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(stoneColors), gl.STATIC_DRAW);
   stoneVertexColor.itemSize = 3;
   stoneVertexColor.numItems = stoneColors / stoneVertexColor.itemSize;
   
   
   stoneActiveVertexColor = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, stoneActiveVertexColor);
  
   var stoneActiveColors = [

    activeStoneFrontR,activeStoneFrontG,activeStoneFrontB,
    activeStoneFrontR,activeStoneFrontG,activeStoneFrontB,
    activeStoneFrontR,activeStoneFrontG,activeStoneFrontB,
    activeStoneFrontR,activeStoneFrontG,activeStoneFrontB,
 
    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,
    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,
    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,
    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,
  
    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,
    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,
    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,
    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,
    
    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,
    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,
    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,
    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,

    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,
    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,
    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,
    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,

    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,
    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,
    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,
    activeStoneBorderR, activeStoneBorderG, activeStoneBorderB,
   ];
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(stoneActiveColors), gl.STATIC_DRAW);
   stoneActiveVertexColor.itemSize = 3;
   stoneActiveVertexColor.numItems = stoneActiveColors / stoneVertexColor.itemSize;
   
   
   
   //Texturkoordinaten
  /*  stoneVertexTextureCoord = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, stoneVertexTextureCoord);
    var textureCoords = [
      // Front face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,

      // Back face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      // Top face
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,

      // Bottom face
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,

      // Right face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      // Left face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    stoneVertexTextureCoord.itemSize = 2;
    stoneVertexTextureCoord.numItems = 24;
    */
   
   //VertexInidzes
   stoneVertexIndex = gl.createBuffer();
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, stoneVertexIndex);
   var faMainObjVertexIndices = [
     0, 1, 2, 0, 2, 3, // Vorderseite
     4, 5, 6, 4, 6, 7, // Rückseite
     8, 9, 10, 8, 10, 11, // Oberseite
     12, 13, 14, 12, 14, 15, // Unterseite
     16, 17, 18, 16, 18, 19, // rechte Seite
     20, 21, 22, 20, 22, 23 // linke Seite
   ];
   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faMainObjVertexIndices), gl.STATIC_DRAW);
   stoneVertexIndex.itemSize = 1;
   stoneVertexIndex.numItems = faMainObjVertexIndices.length;
}



function prepareStoneDraw(pMatrix, ambientR, ambientG, ambientB, vAdjustedLDir, directR, directG, directB)
{
    gl.useProgram(stoneShader);
    
    gl.uniformMatrix4fv(gl.getUniformLocation(stoneShader, "uPMatrix"), false, pMatrix); 
    
    gl.uniform3f(gl.getUniformLocation(stoneShader, "uAmbientColor"), ambientR, ambientG, ambientB);
    gl.uniform3f(gl.getUniformLocation(stoneShader, "uLightingDirection"),vAdjustedLDir[0],vAdjustedLDir[1],vAdjustedLDir[2]);
    gl.uniform3f(gl.getUniformLocation(stoneShader, "uDirectionalColor"), directR, directG, directB);
    
    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
}

function bindStoneBuffer()
{
    gl.bindBuffer(gl.ARRAY_BUFFER, stoneNormals);
    gl.vertexAttribPointer(stoneVertexNormalAttribute, stoneNormals.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER,stoneVertexPos);
    gl.vertexAttribPointer(stoneVertexPosAttribute,stoneVertexPos.itemSize, gl.FLOAT, false, 0,0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER,stoneVertexColor);
    gl.vertexAttribPointer(stoneVertexColorAttribute, stoneVertexColor.itemSize, gl.FLOAT, false, 0,0);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, stoneVertexIndex);
}

function bindActiveStoneBuffer()
{
    gl.bindBuffer(gl.ARRAY_BUFFER, stoneNormals);
    gl.vertexAttribPointer(stoneVertexNormalAttribute, stoneNormals.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER,stoneVertexPos);
    gl.vertexAttribPointer(stoneVertexPosAttribute,stoneVertexPos.itemSize, gl.FLOAT, false, 0,0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER,stoneActiveVertexColor);
    gl.vertexAttribPointer(stoneVertexColorAttribute, stoneActiveVertexColor.itemSize, gl.FLOAT, false, 0,0);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, stoneVertexIndex);
}


function drawStone(mvMatrix, normalMatrix)
{
     gl.uniformMatrix4fv(gl.getUniformLocation(stoneShader, "uMVMatrix"), false, mvMatrix);
     gl.uniformMatrix4fv(gl.getUniformLocation(stoneShader, "uNMatrix"), false, normalMatrix);
     
     gl.drawElements(gl.TRIANGLES, stoneVertexIndex.numItems, gl.UNSIGNED_SHORT, 0);
}




