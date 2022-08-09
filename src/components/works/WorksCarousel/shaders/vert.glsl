uniform float uTime;
uniform float uLeft;
uniform float uRight;
uniform float uTransitionNext;
uniform float uTransitionPrev;
uniform float uPointScale;
uniform vec2 uMouse;

varying vec2 vUv;
varying float vDivergenceFactor;
varying float vSpeed;
varying float vHeightCycle;
varying float vHorizCycle;
varying float vTransition;

#define S smoothstep
#define MOD_BOUNDS 0.009
#define HORIZ_MOD_BOUNDS 0.1
#pragma glslify: snoise3 = require('glsl-noise/simplex/3d')

float rand(vec2 p){
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec3 pos = position;
  pos.xy += uMouse;
  float d = length(pos);

  vDivergenceFactor = S(0.035, 0.04, d);

  vec3 p = position * 50.0;

  float speed = rand(position.xy) * 0.5 + 0.5;

  // idle diverged pos
  vec3 divergedPosition = pos;
  divergedPosition.z += cos(uTime * 0.5 * speed) * 0.01;
  divergedPosition.x += sin(uTime * 0.5 * speed) * 0.01;
  float heightOffset = mod(uTime * 0.005 * speed, MOD_BOUNDS);
  divergedPosition.y += heightOffset;

  float horizDivergence = mod(uTime * 0.25 * speed, HORIZ_MOD_BOUNDS);

  // to left
  vec3 leftPosition = pos;
  leftPosition.x -= horizDivergence;
  leftPosition.z += cos(uTime * 0.1 * speed) * 0.01;
  leftPosition.y += sin(uTime * 2.0) * 0.075 * abs(leftPosition.x);

  // to right
  vec3 rightPosition = pos;
  rightPosition.x += horizDivergence;
  rightPosition.z += cos(uTime * 0.1 * speed) * 0.01;
  rightPosition.y += sin(uTime * 2.0) * 0.075 * abs(rightPosition.x);

  // interpolate horiz pos
  float leftFactor = uLeft * S(0.9, 0.0, uv.x);
  float rightFactor = uRight * S(0.1, 1.0, uv.x);

  vec3 transitionNextPos = rightPosition;
  transitionNextPos.x = 0.15 * speed;
  transitionNextPos.y += sin(uTime * 0.1 * speed) * 0.025;
  transitionNextPos.z += cos(uTime * 0.1 * speed) * 0.025;

  vec3 transitionPrevPos = leftPosition;
  transitionPrevPos.x = -0.15 * speed;
  transitionPrevPos.y += sin(uTime * 0.1 * speed) * 0.025;
  transitionPrevPos.z += cos(uTime * 0.1 * speed) * 0.025;

  float transitionNextFactor = clamp(uTransitionNext - (1.0 - uv.x), 0.0, 1.0);
  float transitionPrevFactor = clamp(uTransitionPrev - uv.x, 0.0, 1.0);

  pos = mix(pos, divergedPosition, vDivergenceFactor);
  pos = mix(pos, leftPosition, leftFactor);
  pos = mix(pos, rightPosition, rightFactor);
  pos = mix(pos, transitionNextPos, transitionNextFactor);
  pos = mix(pos, transitionPrevPos, transitionPrevFactor);

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);

  gl_Position = projectionMatrix * viewMatrix * modelPosition;
  gl_PointSize = 8.0 * uPointScale;

  vUv = uv;
  vSpeed = speed;
  vHeightCycle = heightOffset / MOD_BOUNDS;
  vHorizCycle = (horizDivergence / HORIZ_MOD_BOUNDS) * (leftFactor + rightFactor);
  vTransition = clamp(transitionNextFactor + transitionPrevFactor, 0.0, 1.0);
}