//this ifdef is a temporary work-around for the (upcoming) strict shader validator
#ifdef GL_ES
  precision mediump float;
#endif
varying vec3 vColor; 
varying vec3 vLightWeighting;
void main(void)
{
    gl_FragColor = vec4(vLightWeighting,1.0)*vec4(vColor, 1.0);
}
