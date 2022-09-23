uniform float uPointSize;
uniform float uTime;
uniform float uDisplacementFactor;

attribute vec3 position2;
attribute vec3 transitionPosition;
attribute float size;

varying float vRand;
varying float vFade;
varying float vSize;

#define TIME uTime * 0.01
#define S smoothstep

#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

float rand(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 151.7182))) * 43758.5453);
}

vec3 noise3_3(vec3 x) {
    float s = snoise3(vec3(x));
    float s1 = snoise3(vec3(x.y - 19.1, x.z + 33.4, x.x + 47.2));
    float s2 = snoise3(vec3(x.z + 74.2, x.x - 124.5, x.y + 99.4));
    return vec3(s, s1, s2);
}

void main() {
    float random = rand(position);
    vec3 pos = position.xzy;
    vec3 displacedNew = transitionPosition.xzy;
    displacedNew.z *= -1.0;

    float idleProgress = fract((uTime + size * 1000.0) * 0.02);

    pos = mix(pos, displacedNew, idleProgress);

    pos = mix(pos, position2, uDisplacementFactor);

    vec4 modelViewPos = modelViewMatrix * vec4(pos, 1.0);

    float shrink = S(0.0, 0.75, 1.0 - idleProgress);

    gl_Position = projectionMatrix * modelViewPos;
    gl_PointSize = uPointSize * size * shrink * (1.0 / -modelViewPos.z);
    vRand = random;
    vSize = gl_PointSize;
    vFade = S(0.0, 0.1, idleProgress);
}