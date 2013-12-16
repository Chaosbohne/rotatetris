var gl;

var g_mainObjVertexPosBuffID;
var g_mainObjVertexIndexBuffID;
var g_mainObjVertexColorBuffID;
var cubeVertexTextureCoordBuffer;
var mainObjNormalBufferID;

var g_vertexPositionAttribute;
var g_vertexNormalAttribute;
var g_vertexColorAttribute;
var g_vertexTextCoordAttribute;

var shaderProgram;

var currentRotation = 0.0;
var currentRotationTarget = 0.0;


//Farbdefinitionen
var backgroundR = 0.05;
var backgroundG = 0.05;
var backgroundB = 0.13;

var frontR = 0.3;
var frontG = 0.5;
var frontB = 1.0;

var randR = 0.4;
var randG = 0.6;
var randB = 1.0;
   

function loadFile(shader)
{
    var xhr = new XMLHttpRequest();
    xhr.open("get", shader, false);  
    xhr.send(null);
    return xhr.responseText;
}


var texture;
function handleLoadedTexture(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);
 }
  
  

function initView()
{ 
    
    var canvas = document.getElementById("Canvas3d");   
    try {
           gl = WebGLUtils.setupWebGL(canvas);
    } catch (e) {}
    if (!gl) {
        window.alert("Fehler: WebGL-Context nicht gefunden");
    }
   
 /*
  //Textur laden
    texture = gl.createTexture();
    texture.image = new Image();
    texture.image.onload = function() {
      handleLoadedTexture(texture)
    }
    texture.image.src = "images/age.png";
*/
  
    gl.disable(gl.CULL_FACE);
    
    //Shader laden
    var vertexShaderSource;
    var fragmentShaderSource;   
    vertexShaderSource = loadFile("javascript/desktopFiles/shaders/lightning.vs");   
    fragmentShaderSource = loadFile("javascript/desktopFiles/shaders/lightning.fs");

    shaderProgram = gl.createProgram();    

    // Vertex-Shader anlegen:
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))      {
        alert("vertexShader-Compile-Fehler:\n" + gl.getShaderInfoLog(vertexShader));
        return null;
    }
    gl.attachShader(shaderProgram, vertexShader);
    
    // Fragement-Shader anlegen:          
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))      {
        alert("fragmentShader-Compile-Fehler:\n" + gl.getShaderInfoLog(fragmentShader));
        return null;
    }        
    gl.attachShader(shaderProgram, fragmentShader);
    
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))    {
      alert("Fehler beim Linken des Shader-Programms.");
    }

    gl.useProgram(shaderProgram);

    g_vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    g_vertexNormalAttribute   = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    g_vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    
    g_vertexTextCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(g_vertexTextCoordAttribute);

    gl.enableVertexAttribArray(g_vertexPositionAttribute);
    gl.enableVertexAttribArray(g_vertexNormalAttribute);
    gl.enableVertexAttribArray(g_vertexColorAttribute);
    gl.clearColor(backgroundR, backgroundG, backgroundB, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    initObjBuffers();

    render();
}


function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function initObjBuffers() {
   g_mainObjVertexPosBuffID = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, g_mainObjVertexPosBuffID);
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
   g_mainObjVertexPosBuffID.itemSize = 3;
   g_mainObjVertexPosBuffID.numItems = faMainObjVertexPos / g_mainObjVertexPosBuffID.itemSize;

   mainObjNormalBufferID = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, mainObjNormalBufferID);
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
   mainObjNormalBufferID.itemSize = 3;
   mainObjNormalBufferID.numItems = faMainObjNormals / mainObjNormalBufferID.itemSize;


   g_mainObjVertexColorBuffID = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, g_mainObjVertexColorBuffID);
  
   
   var faMainObjColors = [
    // Vorderseite
    frontR,frontG,frontB,
    frontR,frontG,frontB,
    frontR,frontG,frontB,
    frontR,frontG,frontB,
 
    // Rueckseite
    randR, randG, randB,
    randR, randG, randB,
    randR, randG, randB,
    randR, randG, randB,
  
    // Oberseite
    randR, randG, randB,
    randR, randG, randB,
    randR, randG, randB,
    randR, randG, randB,
    
    // Unterseite
    randR, randG, randB,
    randR, randG, randB,
    randR, randG, randB,
    randR, randG, randB,
    
    // rechte Seite
    randR, randG, randB,
    randR, randG, randB,
    randR, randG, randB,
    randR, randG, randB,
    
    // linke Seite
    randR, randG, randB,
    randR, randG, randB,
    randR, randG, randB,
    randR, randG, randB,
   ];
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(faMainObjColors), gl.STATIC_DRAW);
   g_mainObjVertexColorBuffID.itemSize = 3;
   g_mainObjVertexColorBuffID.numItems = faMainObjColors / g_mainObjVertexColorBuffID.itemSize;
   
   //Texturkoordinaten
    cubeVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
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
    cubeVertexTextureCoordBuffer.itemSize = 2;
    cubeVertexTextureCoordBuffer.numItems = 24;
    
   
   g_mainObjVertexIndexBuffID = gl.createBuffer();
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_mainObjVertexIndexBuffID);
   var faMainObjVertexIndices = [
     0, 1, 2, 0, 2, 3, // Vorderseite
     4, 5, 6, 4, 6, 7, // Rückseite
     8, 9, 10, 8, 10, 11, // Oberseite
     12, 13, 14, 12, 14, 15, // Unterseite
     16, 17, 18, 16, 18, 19, // rechte Seite
     20, 21, 22, 20, 22, 23 // linke Seite
   ];
   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faMainObjVertexIndices), gl.STATIC_DRAW);
   g_mainObjVertexIndexBuffID.itemSize = 1;
   g_mainObjVertexIndexBuffID.numItems = faMainObjVertexIndices.length;

   
 }

  
function render() {
    
  
    WebGLUtils.requestAnimationFrame(canvas, render);    
 
    var canvas = document.getElementById("Canvas3d");
    var canvas = document.getElementById("Canvas3d");


    //allgemeine Einstellungen der Szene
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
 
    
    //Beleuchtung
    gl.uniform3f(gl.getUniformLocation(shaderProgram, "uAmbientColor"), 0.2, 0.2,0.2);
    var vLightDirection = vec3.create([1.0,-2.0,-2.0]);
    var vAdjustedLDir = vec3.normalize(vLightDirection);
    
    //var flatLD = [vAdjustedLDir.e(1),vAdjustedLDir.e(2),vAdjustedLDir.e(3)];
    gl.uniform3f(gl.getUniformLocation(shaderProgram, "uLightingDirection"),vAdjustedLDir[0],vAdjustedLDir[1],vAdjustedLDir[2]);
    gl.uniform3f(gl.getUniformLocation(shaderProgram, "uDirectionalColor"), 1.0, 1.0, 0.8);


    //Buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, mainObjNormalBufferID);
    gl.vertexAttribPointer(g_vertexNormalAttribute, mainObjNormalBufferID.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER,g_mainObjVertexPosBuffID);
    gl.vertexAttribPointer(g_vertexPositionAttribute,g_mainObjVertexPosBuffID.itemSize, gl.FLOAT, false, 0,0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER,g_mainObjVertexColorBuffID);
    gl.vertexAttribPointer(g_vertexColorAttribute,g_mainObjVertexColorBuffID.itemSize, gl.FLOAT, false, 0,0);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_mainObjVertexIndexBuffID);
    
    //Texture

    // gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    // gl.vertexAttribPointer(g_vertexTextCoordAttribute, cubeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    // gl.activeTexture(gl.TEXTURE0);
    // gl.bindTexture(gl.TEXTURE_2D, texture);
    // gl.uniform1i(shaderProgram.samplerUniform, 0);
     
    //Worldmatrix
    var pMatrix = new mat4.create();
    var zNah = 0.1;
    var zFern = 200.0;     
    
    //Perspektivisch
       
    // var sichtfeldOeffnungswinkel = 60* Math.PI / 180.0; // Öffnungswinkel der virtuellen Kamera zur Berechnung der Perspektive
    // var sfOew = sichtfeldOeffnungswinkel; // Abkürzung
    // var aspektVerhaeltnis =  canvas.height / canvas.width; // Höhe zu Breite (vgl. "16:9")

    
    // pMatrix = new Float32Array([
    // aspektVerhaeltnis/Math.tan(sfOew), 0, 0, 0,
    // 0, 1/Math.tan(sfOew), 0, 0,
    // 0, 0, (zNah+zFern)/(zNah-zFern), -1,
    // 0, 0, 2*zNah*zFern/(zNah-zFern), 0]);   
    
    
    //Orthogonal
    var screenWidth = 50;
    var screenHeight = 50;
    
    mat4.ortho(0, screenWidth, 0, screenHeight, zNah, zFern, pMatrix);
    mat4.translate(pMatrix,[0, 0, -10]); 

       
    var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    gl.uniformMatrix4fv(pUniform, false, pMatrix); 


    var cubespace = 1.2;
    var playareax = (screenWidth-model.cols*cubespace)*0.5;
    var playareay = (screenHeight-model.rows*cubespace)*0.5;
    if(rotateModus)
    {   playareax = (screenWidth)*0.5;
        playareay = (screenHeight)*0.5;
    }
    
    
    
    var playfieldMatrix = new mat4.create();
     
     
    //Spielfeld rendern
     mat4.identity(playfieldMatrix);
   
     if(rotateModus)
     {
             //aktuelle Rotation einstellen
            currentRotationTarget = model.playareaRotation;
            if((currentRotationTarget - currentRotation) > 2) currentRotation+=4;
            if((currentRotationTarget - currentRotation) < -2) currentRotation-=4;
       
            var rotationdiff = (currentRotationTarget - currentRotation);
            if(rotationdiff > 2) rotationdiff -= 4;
            if(rotationdiff < -2) rotationdiff += 4;
            
            currentRotation = currentRotation + rotationdiff*0.2;
            if(currentRotation >= 4) currentRotation -= 4;
            if(currentRotation < 4) currentRotation += 4;

            mat4.translate(playfieldMatrix,[screenWidth/2, screenHeight/2, 0]); 
            mat4.rotate(playfieldMatrix, Math.PI/2*currentRotation, [0, 0, 1]);
            mat4.translate(playfieldMatrix,[-screenWidth/2, -screenHeight/2, 0]); 
        
       
            var centerx = -model.getFigureCenterX()*cubespace;
            var centery = -model.getFigureCenterY()*cubespace;
       
            if(model.getFigureSizeX == 4)
            {  centerx += 0.5*cubespace;
               centery += 0.5*cubespace;
            }
            mat4.translate(playfieldMatrix,[centerx, centery, 0]); 
     }
   
    mat4.translate(playfieldMatrix,[playareax, playareay, 0]); 
    
    
    for (var i=0; i<model.playarea.length; i++) 
    {
        for (var j=0; j<model.playarea[i].length; j++) 
        {
             if(model.playarea[i][j] == 0) continue;
             if(model.playarea[i][j] >= 100) continue;
             
             if(model.playarea[i][j] == 50 && (Math.random() < 0.5)) continue;
            
             
             var x = j*cubespace; 
             var y = i*cubespace; 
             
            if((model.playarea[i][j] >= 51) && (model.playarea[i][j] < 54))
            {
               var pos = 1 - model.slidetime / (model.slideduration*0.2);
               if(pos < 0) pos = 0;
               var slidedist = (model.playarea[i][j]-50)*cubespace;
               y += slidedist*pos;
            }
          
            var mvMatrix = new mat4.create();
            mat4.set(playfieldMatrix, mvMatrix);
            mat4.translate(mvMatrix,[x, y, 0]);
       
            var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
            gl.uniformMatrix4fv(mvUniform, false, mvMatrix);
            var normalMatrix = mat4.inverse(mvMatrix);
            normalMatrix = mat4.transpose(normalMatrix);
            var nUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
            gl.uniformMatrix4fv(nUniform, false, normalMatrix);
            
            gl.drawElements(gl.TRIANGLES, g_mainObjVertexIndexBuffID.numItems, gl.UNSIGNED_SHORT, 0);
        }
     }

  
  
  
  
  
     //aktive Steine rendern
     mat4.identity(playfieldMatrix);
   
     if(rotateModus)
     {
        //aktuelle Rotation einstellen
        mat4.translate(playfieldMatrix,[screenWidth/2, screenHeight/2, 0]); 
        mat4.rotate(playfieldMatrix, Math.PI/2*model.playareaRotation, [0, 0, 1]);
        mat4.translate(playfieldMatrix,[-screenWidth/2, -screenHeight/2, 0]); 
        
        mat4.translate(playfieldMatrix,[-model.getFigureCenterX()*cubespace, -model.getFigureCenterY()*cubespace, 0]); 
            
     }
   
    mat4.translate(playfieldMatrix,[playareax, playareay, 0]); 

    for (var i=0; i<model.playarea.length; i++) 
    {
        for (var j=0; j<model.playarea[i].length; j++) 
        {
             if(model.playarea[i][j] == 0) continue;
             if(model.playarea[i][j] != 100) continue;
            
             var x = j*cubespace; 
             var y = i*cubespace; 

            var mvMatrix = new mat4.create();
            mat4.set(playfieldMatrix, mvMatrix);
            mat4.translate(mvMatrix,[x, y, 0]);
       
            var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
            gl.uniformMatrix4fv(mvUniform, false, mvMatrix);
            var normalMatrix = mat4.inverse(mvMatrix);
            normalMatrix = mat4.transpose(normalMatrix);
            var nUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
            gl.uniformMatrix4fv(nUniform, false, normalMatrix);
            
            gl.drawElements(gl.TRIANGLES, g_mainObjVertexIndexBuffID.numItems, gl.UNSIGNED_SHORT, 0);
        }
     }





    
    renderingCompleted();
}

