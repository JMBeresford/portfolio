uniform float uTime;
uniform float uDpr;
uniform float uScale;
uniform float uIntersecting;
uniform float uTransition;
uniform vec3 uMouse;

varying vec2 vUv;
varying vec3 vPos;
varying float vDisplacement;

#pragma glslify: snoise21 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise31 = require(glsl-noise/simplex/3d)
#pragma glslify: snoise41 = require(glsl-noise/simplex/4d)

mat2 rotate(float a) {
  float s = sin(a), c = cos(a);

  return mat2(c,-s,s,c);
}

float random(vec3 pos) {
  return fract(sin(dot(pos.xyz, vec3(70.9898, 78.233, 32.4355))) * 43758.5453123);
}

vec3 snoise33(vec3 x) {
  float a = snoise31(x);
  float b = snoise31(vec3(x.x + 123.4, x.y + 376.2, x.z));
  float c = snoise31(vec3(x.x - 44.2, x.y - 125.6, -x.z));

  return vec3(a,b,c);
}

void main() {
  vec3 pos = position;
  vec3 m = uMouse;
  float maxDist = 0.075;

  float d = clamp(maxDist - distance(m, pos), 0.0, maxDist);

  vec3 r = vec3(random(pos.xxx), random(pos.yyy), random(pos.zzz));

  float factor = d * uIntersecting;

  factor -= uTransition;

  vec3 v = snoise33(r + uTime * 0.1) * 0.05;

  pos = mix(pos, normalize(pos + v), factor * 5.0);
  pos = mix(pos, v, uTransition);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 3.5 * uDpr * uScale;
  vDisplacement = distance(position, pos) * 1.2;
  vUv = uv;
  vPos = pos;
}