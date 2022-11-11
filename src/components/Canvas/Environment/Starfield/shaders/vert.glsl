uniform float uPointSize;
uniform float uTime;

varying float vRand;
varying float vSize;
varying vec3 vPos;

#define TIME uTime * 0.01

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
    vec3 pos = position;
    float random = rand(position);

    pos = rotateX(TIME * (random * 2.0 - 1.0)) * pos;
    pos = rotateY(TIME * (random * 2.0 - 1.0)) * pos;

    vec4 modelPos = modelMatrix * vec4(pos, 1.0);
    vec4 modelViewPos = viewMatrix * modelPos;

    gl_Position = projectionMatrix * modelViewPos;
    gl_PointSize = uPointSize * (1.0 / -modelViewPos.z);
    vRand = random;
    vSize = gl_PointSize;
    vPos = modelPos.xyz;
}