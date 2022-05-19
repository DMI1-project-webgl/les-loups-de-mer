varying vec3	vNormal;

uniform vec3   lightColor;
uniform float	anglePower;
uniform float attenuation;

void main() {

    //////////////////////////////////////////////////////////
    // intensity on angle					//
    //////////////////////////////////////////////////////////
    float angleIntensity = min(pow(abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), anglePower ), 0.54);

    //////////////////////////////////////////////////////////
    // final color						//
    //////////////////////////////////////////////////////////

    // set the final color
    gl_FragColor = vec4( lightColor, angleIntensity / attenuation);
}