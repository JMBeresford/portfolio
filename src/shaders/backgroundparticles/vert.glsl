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

  pos.x += cos(uTime * aRandom) * RADIUS;
  pos.y += sin(uTime * aRandom) * RADIUS;
  pos.z = mod(uTime * aRandom, DEPTH);

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);

  gl_Position = projectionMatrix * mvPos;
  gl_PointSize = 10.5 * uDpr * uScale;

  vDepth = pos.z;
  vRandom = aRandom;
}