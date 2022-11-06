uniform float uPointSize;
uniform float uPointMultiplier;
uniform float uTime;
uniform float uDisplacementFactor;

attribute vec3 position2;
attribute float size;

varying float vRand;
varying float vSize;
varying vec3 vPos;

#define TIME uTime * 0.01 + 1000.0
#define S smoothstep

float rand(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 151.7182))) * 43758.5453);
}

mat3 rotateX(float a) {
    return mat3(1, 0, 0, 1, cos(a), -sin(a), 0, sin(a), cos(a));
}

mat3 rotateY(float a) {
    return mat3(cos(a), 0, sin(a), 0, 1, 0, -sin(a), 0, cos(a));
}

void main() {
    float random = rand(position * 50.0);
    vec3 pos = position;
    vec3 pos2 = position2;

    pos2 = rotateX(TIME * (random * 2.0 - 1.0)) * pos2;
    pos2 = rotateY(TIME * (random * 2.0 - 1.0)) * pos2;

    pos = mix(pos, pos2, uDisplacementFactor);

    vec4 modelPos = modelMatrix * vec4(pos, 1.0);
    vec4 modelViewPos = viewMatrix * modelPos;

    gl_Position = projectionMatrix * modelViewPos;
    gl_PointSize = uPointSize * uPointMultiplier * size * (1.0 / -modelViewPos.z);
    vPos = modelPos.xyz;
    vRand = random;
    vSize = gl_PointSize;
}