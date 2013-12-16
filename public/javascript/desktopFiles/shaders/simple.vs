attribute vec3 aVertexNormal; 
attribute vec3 aVertexPosition; 
attribute vec3 aVertexColor; 
uniform mat4 uMVMatrix; 
uniform mat4 uPMatrix; 
uniform mat4 uNMatrix; 
varying vec3 vColor; 


void main(void) 
{ 
    gl_Position = uPMatrix  * uMVMatrix * vec4(aVertexPosition, 1.0); 
    vColor = aVertexColor; 
}