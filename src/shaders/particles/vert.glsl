uniform float uTime;
uniform float uDpr;
uniform float uScale;
uniform float uIntersecting;
uniform float uRight;
uniform float uLeft;
uniform vec3 uMouse;

varying vec2 vUv;
varying float vBurn;
varying float vHover;

attribute float aSpeed;

#define S smoothstep
#define RADIUS 0.1
#define DEPTH 0.25

float random(vec3 pos) {
  return fract(sin(dot(pos.xyz, vec3(70.9898, 78.233, 32.4355))) * 43758.5453123);
}

void main() {
  vec3 pos = position;
  float r = random(position);

  vec3 hoveredPos = position;

  float d = clamp(distance(uMouse, pos), 0.0, 1.0);
  float mouseRadius = S(0.45, 1.0, d) * uIntersecting;

  hoveredPos.x += cos(uTime * 2.0 * aSpeed) * RADIUS;
  hoveredPos.y += sin(uTime * 2.0 * aSpeed) * RADIUS;
  hoveredPos.z = mod(hoveredPos.z + (-uTime * aSpeed) + DEPTH + r, DEPTH * 2.0) - DEPTH;

  pos.x += uRight;
  pos.x -= uLeft;
  hoveredPos.x += uRight;
  hoveredPos.x -= uLeft;

  float burn = (1.0 - uv.x) * uLeft + uv.x * uRight;
  burn = S(0.25 * (0.75 - max(uLeft, uRight)), 0.325, burn);
  
  hoveredPos.z += burn * aSpeed;
  hoveredPos.x *= 1.0 + burn * aSpeed;

  pos = mix(pos, hoveredPos, mouseRadius);
  pos = mix(pos, hoveredPos, burn);

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);

  gl_Position = projectionMatrix * mvPos;
  gl_PointSize = 3.5 * uDpr * uScale / length(mvPos.xyz);
  vUv = uv;
  vBurn = burn * 3.25 + mouseRadius;
  vHover = mouseRadius;
}