uniform float uTime;
uniform float uScale;
uniform float uDpr;

attribute float aRandom;

varying float vDepth;
varying float vRandom;

#define S smoothstep
#define RADIUS 0.2
#define DEPTH 6.0

void main() {
  vec3 pos = position;

  pos.x += cos(uTime * 0.2 * aRandom) * RADIUS;
  pos.y += sin(uTime * 0.2 * aRandom) * RADIUS;
  pos.z = mod(uTime * 0.2 * aRandom, DEPTH);

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);

  gl_Position = projectionMatrix * mvPos;
  gl_PointSize = uDpr * uScale * pos.z;

  vDepth = pos.z;
  vRandom = aRandom;
}