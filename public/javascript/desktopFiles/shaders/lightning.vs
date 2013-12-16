attribute vec3 aVertexPosition; 
attribute vec3 aVertexColor; 
attribute vec3 aVertexNormal; 
uniform mat4 uMVMatrix; 
uniform mat4 uPMatrix; 
uniform mat4 uNMatrix; 
varying vec3 vColor; 
// Licht:
uniform vec3 uAmbientColor; 
uniform vec3 uLightingDirection; 
uniform vec3 uDirectionalColor; 
varying vec3 vLightWeighting; 

void main(void) 
{ 
   gl_Position = uPMatrix  * uMVMatrix * vec4(aVertexPosition, 1.0);

 

     vec4 position =uPMatrix  * uMVMatrix * vec4(aVertexPosition, 1.0);
     float zToDivideBy = 1.0 + position.z * 0.0;
 //    gl_Position = vec4(position.xy / zToDivideBy, position.zw);

  
    vColor = aVertexColor;
    
    //BEGIN BELEUCHTUNG 
    vec4 transformedNormal = uNMatrix * vec4(aVertexNormal, 1.0); 
    float fDirectionalLightWeighting = max(dot(transformedNormal.xyz, -uLightingDirection), 0.0); 
    vLightWeighting = uAmbientColor + uDirectionalColor * fDirectionalLightWeighting; 
    //ENDE BELEUCHTUNG 
}