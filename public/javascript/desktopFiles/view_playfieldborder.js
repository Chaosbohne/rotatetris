var gl;

var pfieldborderVertexPos;
var pfieldborderVertexIndex;
var pfieldborderVertexColor;

var pfieldborderVertexPosAttribute;
var pfieldborderVertexColorAttribute;

//Farbdefinitionen
var pfieldborderGroundR = 0.990153;
var pfieldborderGroundG = 0.99025;
var pfieldborderGroundB = 0.9905;
var pfieldborderGroundA = 0.3;

var pfieldborderTopR = 0.167;
var pfieldborderTopG = 0.47;
var pfieldborderTopB = 0.3;
var pfieldborderTopA = 0.0;

//Shader
var pfieldborderShader;


function initViewpfieldborder(glin)
{
    gl = glin;
    
    
    pfieldborderShader = loadShader("javascript/desktopFiles/shaders/playfieldborder.vs", "javascript/desktopFiles/shaders/playfieldborder.fs")
    gl.useProgram(pfieldborderShader);

    
    pfieldborderVertexPosAttribute = gl.getAttribLocation(pfieldborderShader, "aVertexPosition");
    pfieldborderVertexColorAttribute = gl.getAttribLocation(pfieldborderShader, "aVertexColor");
    

    gl.enableVertexAttribArray(pfieldborderVertexPosAttribute);
    gl.enableVertexAttribArray(pfieldborderVertexColorAttribute);
    
    
    //Vertexpositions
    pfieldborderVertexPos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pfieldborderVertexPos);
   var faMainObjVertexPos = [
     -1.5, -0.8, 0.2,
      14.5, -0.8, 0.2,
      14.5, -1.3, 0.2,
     -1.5, -1.3, 0.2,
     
     -1.5, 25, 0.2,
     -1.0, 25, 0.2,
     -1.0, -0.8, 0.2,
     -1.5, -0.8, 0.2,
     
     14.0, 25, 0.2,
     14.5, 25, 0.2,
     14.5, -0.8, 0.2,
     14.0, -0.8, 0.2,
   ];
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(faMainObjVertexPos), gl.STATIC_DRAW);
   pfieldborderVertexPos.itemSize = 3;
   pfieldborderVertexPos.numItems = faMainObjVertexPos / pfieldborderVertexPos.itemSize;


    //Colors
   pfieldborderVertexColor = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, pfieldborderVertexColor);
  
   
   var pfieldborderColors = [

    pfieldborderGroundR,pfieldborderGroundG,pfieldborderGroundB,pfieldborderGroundA,
    pfieldborderGroundR,pfieldborderGroundG,pfieldborderGroundB,pfieldborderGroundA,
    pfieldborderGroundR,pfieldborderGroundG,pfieldborderGroundB,pfieldborderGroundA,
    pfieldborderGroundR,pfieldborderGroundG,pfieldborderGroundB,pfieldborderGroundA,
       
    pfieldborderTopR,pfieldborderTopG,pfieldborderTopB,pfieldborderTopA,
    pfieldborderTopR,pfieldborderTopG,pfieldborderTopB,pfieldborderTopA,
    pfieldborderGroundR,pfieldborderGroundG,pfieldborderGroundB,pfieldborderGroundA,
    pfieldborderGroundR,pfieldborderGroundG,pfieldborderGroundB,pfieldborderGroundA,
    
    pfieldborderTopR,pfieldborderTopG,pfieldborderTopB,pfieldborderTopA,
    pfieldborderTopR,pfieldborderTopG,pfieldborderTopB,pfieldborderTopA,
    pfieldborderGroundR,pfieldborderGroundG,pfieldborderGroundB,pfieldborderGroundA,
    pfieldborderGroundR,pfieldborderGroundG,pfieldborderGroundB,pfieldborderGroundA,
   ];
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pfieldborderColors), gl.STATIC_DRAW);
   pfieldborderVertexColor.itemSize = 4;
   pfieldborderVertexColor.numItems = pfieldborderColors / pfieldborderVertexColor.itemSize;
   
   
   //VertexInidzes
   pfieldborderVertexIndex = gl.createBuffer();
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pfieldborderVertexIndex);
   var faMainObjVertexIndices = [
     0, 1, 2, 0, 2, 3, 
     4, 5, 6, 4, 6, 7, 
     8, 9, 10, 8, 10, 11, 
   ];
   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faMainObjVertexIndices), gl.STATIC_DRAW);
   pfieldborderVertexIndex.itemSize = 1;
   pfieldborderVertexIndex.numItems = faMainObjVertexIndices.length;
}



function preparepfieldborderDraw(pMatrix, ambientR, ambientG, ambientB, vAdjustedLDir, directR, directG, directB)
{
    gl.useProgram(pfieldborderShader);
    gl.uniformMatrix4fv(gl.getUniformLocation(pfieldborderShader, "uPMatrix"), false, pMatrix); 
    
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
}

function bindpfieldborderBuffer()
{
    gl.bindBuffer(gl.ARRAY_BUFFER,pfieldborderVertexPos);
    gl.vertexAttribPointer(pfieldborderVertexPosAttribute,pfieldborderVertexPos.itemSize, gl.FLOAT, false, 0,0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER,pfieldborderVertexColor);
    gl.vertexAttribPointer(pfieldborderVertexColorAttribute, pfieldborderVertexColor.itemSize, gl.FLOAT, false, 0,0);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pfieldborderVertexIndex);
}


function drawpfieldborder(mvMatrix)
{
    
     gl.uniformMatrix4fv(gl.getUniformLocation(pfieldborderShader, "uMVMatrix"), false, mvMatrix);
     gl.uniformMatrix4fv(gl.getUniformLocation(pfieldborderShader, "uNMatrix"), false, mvMatrix);
     
     gl.drawElements(gl.TRIANGLES, pfieldborderVertexIndex.numItems, gl.UNSIGNED_SHORT, 0);
}




