uniform float uTime;
uniform float uDpr;
uniform float uScale;
uniform vec2 uViewport;
uniform vec2 uOffset;
uniform float uIntersecting;
uniform float uRight;
uniform float uLeft;
uniform float uOpen;

varying vec2 vUv;
varying float vBurn;
varying float vHover;

attribute float aSpeed;
attribute vec3 aOpenedPosition;

#define S smoothstep
#define RADIUS 0.1
#define DEPTH 0.25

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

float random(vec3 pos) {
  return fract(sin(dot(pos.xyz, vec3(70.9898, 78.233, 32.4355))) * 43758.5453123);
}

void main() {
  vec3 pos = position * 0.8;

  float r = random(position);
  
  vec3 burnedPos = pos;

  pos.x -= uOffset.x * 0.05;
  pos.y -= uOffset.y * 0.05;

  float d = length(pos.xy) * 1.25;
  float distFromCenter = S(0.35, 0.6, d);

  burnedPos.x += cos(uTime * 0.2 * aSpeed) * RADIUS;
  burnedPos.y += mod((uTime * aSpeed * 0.2) + DEPTH + r, DEPTH * 2.0);
  burnedPos.z += sin(uTime * 0.2 * aSpeed) * RADIUS;

  pos.x += uRight;
  pos.x -= uLeft;

  float burn = (1.0 - uv.x) * uLeft + uv.x * uRight;
  burn = S(0.25 * (0.75 - max(uLeft, uRight)), 0.7525, burn);
  
  burnedPos.z += burn * aSpeed;
  burnedPos.x *= 1.0 + burn * aSpeed;

  pos = mix(pos, burnedPos, distFromCenter * snoise3(vec3(pos.xy, uTime * 0.035)));
  pos = mix(pos, burnedPos, burn);

  pos = mix(pos, aOpenedPosition, uOpen);
  // pos.z += pos.x * 20.0;

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);

  gl_Position = projectionMatrix * mvPos;
  gl_PointSize = min(3.5 * uDpr * uScale, 19.0);
  vUv = uv;
  vBurn = burn + distFromCenter + uLeft + uRight;
  vHover = distFromCenter;
}