var gl;



var currentRotation = 0.0;
var currentRotationTarget = 0.0;


//Farbdefinitionen
var backgroundR = 0.05;
var backgroundG = 0.05;
var backgroundB = 0.13;

//Beleuchtung
var vAdjustedLDir = vec3.normalize(vec3.create([100.0,-200.0,-200.0]));
var ambientR = 0.5;
var ambientG = 0.5;
var ambientB = 0.5;
var directR = 1.0;
var directG = 1.0;
var directB = 0.8;

var textDrawer = new TextDrawer();

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
  
  
function loadShader(fileVertexShader, fileFragmentShader)
{
    var shader;
    
    
     //Shader laden
    var vertexShaderSource;
    var fragmentShaderSource;   
    vertexShaderSource = loadFile(fileVertexShader);   
    fragmentShaderSource = loadFile(fileFragmentShader);

    shader = gl.createProgram();    

    // Vertex-Shader anlegen:
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))      {
        alert("vertexShader-Compile-Fehler:\n" + gl.getShaderInfoLog(vertexShader));
        return null;
    }
    gl.attachShader(shader, vertexShader);
    
    
    // Fragement-Shader anlegen:          
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))      {
        alert("fragmentShader-Compile-Fehler:\n" + gl.getShaderInfoLog(fragmentShader));
        return null;
    }        
    gl.attachShader(shader, fragmentShader);
    
    gl.linkProgram(shader);

    if (!gl.getProgramParameter(shader, gl.LINK_STATUS))    {
      alert("Fehler beim Linken des Shader-Programms.");
    }

    return shader;
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
   
    //Textur laden
  /*  texture = gl.createTexture();
    texture.image = new Image();
    texture.image.onload = function() {
      handleLoadedTexture(texture)
    }
    texture.image.src = "images/age.png";
   */ 
   
    gl.clearColor(backgroundR, backgroundG, backgroundB, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  
    initViewStone(gl);
    initViewpfieldborder(gl);
    initViewbackgrcube(gl);  

    render();
}



  
function render() {
    
  
    WebGLUtils.requestAnimationFrame(canvas, render);    
 
    var canvas = document.getElementById("Canvas3d");
    var canvas = document.getElementById("Canvas3d");


    //allgemeine Einstellungen der Szene
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    


    
    //Texture

    // gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    // gl.vertexAttribPointer(g_vertexTextCoordAttribute, cubeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    // gl.activeTexture(gl.TEXTURE0);
    // gl.bindTexture(gl.TEXTURE_2D, texture);
    // gl.uniform1i(shaderProgram.samplerUniform, 0);
     
     
     
     
    //Projektionsmatrix
    var pMatrix = new mat4.create();
    var zNah = 0.1;
    var zFern = 200.0;     
    
    
    
    
    //Perspektivisch
    var sichtfeldOeffnungswinkel = 45* Math.PI / 180.0; // Öffnungswinkel der virtuellen Kamera zur Berechnung der Perspektive
    var sfOew = sichtfeldOeffnungswinkel; // Abkürzung
    var aspektVerhaeltnis =  canvas.height / canvas.width; // Höhe zu Breite (vgl. "16:9")

    
    pMatrix = new Float32Array([
        aspektVerhaeltnis/Math.tan(sfOew), 0, 0, 0,
        0, 1/Math.tan(sfOew), 0, 0,
        0, 0, (zNah+zFern)/(zNah-zFern), -1,
        0, 0, 2*zNah*zFern/(zNah-zFern), 0]);   
    
    
    
    
    
    //Background
    preparebackgrcubeDraw(pMatrix, ambientR, ambientG, ambientB, vAdjustedLDir, directR, directG, directB);
    bindbackgrcubeBuffer();
  
    drawbackgrcubes();
    
  
//bevor Start
    if(model.gameStatus == 1)
    {   renderingCompleted();
        return;
    }


  
    renderingCompleted();
  
    
    //Orthogonal
    pMatrix = new mat4.create();
    var screenWidth = 50;
    var screenHeight = 50;
    
    mat4.ortho(0, screenWidth, 0, screenHeight, zNah, zFern, pMatrix);
    mat4.translate(pMatrix,[0, 0, -10]); 


//Spielende
    if(model.gameStatus == 3)
    {   
        prepareStoneDraw(pMatrix, ambientR, ambientG, ambientB, vAdjustedLDir, directR, directG, directB);
        bindActiveStoneBuffer();
        textDrawer.drawReachedScore(Math.floor(model.score), screenWidth/2-18, screenHeight/2-2);
    //    textDrawer.drawNumber(3, screenWidth/2-2, screenHeight/2-2);
        renderingCompleted();
        return;
    }

//laufendes Spiel
  
    var cubespace = 1.2;
    var playareax = (screenWidth-model.cols*cubespace)*0.5;
    var playareay = (screenHeight-model.rows*cubespace)*0.5;
    if(rotateModus)
    {   playareax = (screenWidth)*0.5;
        playareay = (screenHeight)*0.5;
    }

     
    //playfieldMatrix für gedrehtes Spielfeld einrichten
    var playfieldMatrix = new mat4.create();
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
        
            mat4.translate(playfieldMatrix,[-model.getFigureCenterX()*cubespace, -model.getFigureCenterY()*cubespace, 0]); 
     }
   
    mat4.translate(playfieldMatrix,[playareax, playareay, 0]); 
        
  
    //Playfieldborder
    preparepfieldborderDraw(pMatrix, ambientR, ambientG, ambientB, vAdjustedLDir, directR, directG, directB);
    bindpfieldborderBuffer();
  
    var mvMatrix = new mat4.create();
    mat4.set(playfieldMatrix, mvMatrix);
    drawpfieldborder(mvMatrix);

  

    //passive Steine rendern
    prepareStoneDraw(pMatrix, ambientR, ambientG, ambientB, vAdjustedLDir, directR, directG, directB);
    bindStoneBuffer();

    for (var i=0; i<model.playarea.length; i++) 
    {
        for (var j=0; j<model.playarea[i].length; j++) 
        {
             if(model.playarea[i][j] == 0) continue;
             if(model.playarea[i][j] >= 100) continue;
             
             if(model.playarea[i][j] == 50 && (Math.random() < 0.5)) continue;
            
             
             var x = j*cubespace; 
             var y = i*cubespace; 
             
             //Sliding
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
                         
            var normalMatrix = new mat4.create();
            mat4.set(mvMatrix, normalMatrix);    
            normalMatrix = mat4.transpose( mat4.inverse(normalMatrix));

            drawStone(mvMatrix, normalMatrix);
        }
     }


  
    //aktive Steine rendern
    prepareStoneDraw(pMatrix, ambientR, ambientG, ambientB, vAdjustedLDir, directR, directG, directB);
    bindActiveStoneBuffer();
     
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
                         
            var normalMatrix = new mat4.create();
            mat4.set(mvMatrix, normalMatrix);    
            normalMatrix = mat4.transpose( mat4.inverse(normalMatrix));

            drawStone(mvMatrix, normalMatrix);
        }
     }


    //Text
    mat4.identity(playfieldMatrix);
    textDrawer.drawNumberRightBound(Math.floor(model.score), screenWidth-2, 1);
    
}

