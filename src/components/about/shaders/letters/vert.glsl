uniform float uPointSize;
uniform float uTime;
uniform float uDisplacementFactor;

attribute vec3 position2;
attribute vec3 transitionPosition;
attribute float size;

varying float vRand;
varying float vFade;
varying float vSize;
varying vec3 vPos;

#define TIME uTime * 0.01 + 1000.0
#define S smoothstep

#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

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
    float random = rand(position);
    vec3 pos = position.xzy;
    vec3 displacedNew = transitionPosition.xzy;
    displacedNew.z *= -1.0;

    float idleProgress = fract((uTime + size * 1000.0) * 0.02);

    pos = mix(pos, displacedNew, idleProgress);

    vec3 pos2 = position2;

    pos2 = rotateX(TIME * (random * 2.0 - 1.0)) * pos2;
    pos2 = rotateY(TIME * (random * 2.0 - 1.0)) * pos2;

    pos = mix(pos, pos2, uDisplacementFactor);

    vec4 modelPos = modelMatrix * vec4(pos, 1.0);
    vec4 modelViewPos = viewMatrix * modelPos;

    float shrink = S(0.0, 0.75, 1.0 - idleProgress);

    gl_Position = projectionMatrix * modelViewPos;
    gl_PointSize = uPointSize * size * shrink * (1.0 / -modelViewPos.z);
    vPos = modelPos.xyz;
    vRand = random;
    vSize = gl_PointSize;
    vFade = S(0.0, 0.1, idleProgress);
}