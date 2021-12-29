uniform float uTime;
uniform float uDpr;
uniform float uScale;
uniform float uIntersecting;
uniform float uTransition;
uniform vec3 uMouse;

varying vec2 vUv;
varying vec3 vPos;
varying float vDisplacement;

attribute float aSpeed;

#define S smoothstep
#define INITIAL_RADIUS 0.05
#define RADIUS 0.1
#define DEPTH 1.0

float random(vec3 pos) {
  return fract(sin(dot(pos.xyz, vec3(70.9898, 78.233, 32.4355))) * 43758.5453123);
}

void main() {
  vec3 pos = position;
  vec3 transisitonPos = position;
  float r = random(position);

  pos.x += cos(uTime * 0.025) * INITIAL_RADIUS;
  pos.y += sin(uTime * 0.05) * INITIAL_RADIUS;
  pos.z += sin(uTime * 0.1) * INITIAL_RADIUS;

  float d = clamp(distance(uMouse, pos), 0.0, 1.0);
  float mouseRadius = clamp(S(0.45, 1.0, d) - uTransition, 0.0, 1.0) * uIntersecting;

  transisitonPos.x += cos(uTime * 2.0 * aSpeed) * RADIUS;
  transisitonPos.y += sin(uTime * 2.0 * aSpeed) * RADIUS;
  transisitonPos.z = mod(transisitonPos.z + (-uTime * aSpeed) + DEPTH + r, DEPTH * 2.0) - DEPTH;

  float transition = mouseRadius + uTransition;

  pos = mix(pos, transisitonPos, transition);

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);

  gl_Position = projectionMatrix * mvPos;
  gl_PointSize = 3.5 * uDpr * uScale / length(mvPos.xyz);
  vDisplacement = clamp(1.0 - pos.z, 0.0, 1.0);
  vUv = uv;
  vPos = pos;
}