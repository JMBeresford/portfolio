uniform float uTime;
uniform float uPointScale;
uniform float uIntersecting;
uniform float uTransition;
uniform vec3 uIntersect;

varying vec2 vUv;
varying float vDivergenceFactor;
varying float vSpeed;

#define S smoothstep

#pragma glslify: snoise4 = require('glsl-noise/simplex/4d')

float rand(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 snoise4_3(vec4 x) {
  float a = snoise4(x);
  float b = snoise4(vec4(x.y - 42.3, x.z + 69.0, x.w + 420.0, x.x - 50.0));
  float c = snoise4(vec4(x.w + 128.0, x.x - 65536.0, x.y + 100.0, x.z - 256.0));

  return vec3(a, b, c);
}

void main() {
  float d = length(position.xy); // dist from center in obj space
  float speed = rand(position.xy) * 0.5 + 0.5; // random speed offset per particle

  vec4 modelPosition = modelMatrix * vec4(position, 1.0); // world space coords
  vec3 pos = modelPosition.xyz;

  float ripple = abs(sin(distance(pos, uIntersect) * 50.0 + uTime * 2.75)) * 0.375;

  float rippleStr = S(0.0, 1.0, ripple) * uIntersecting;

  vDivergenceFactor = S(0.0325, 0.04, d) + rippleStr;

  vec3 displacement = snoise4_3(vec4(pos, uTime * speed * 0.1));

  // idle diverged pos
  vec3 divergedPosition = pos + displacement * 0.015;

  // transition diverged position
  vec3 transitionPosition = pos - displacement * 1.0;

  pos = mix(pos, divergedPosition, vDivergenceFactor);
  pos = mix(pos, transitionPosition, uTransition);

  modelPosition.xyz = pos;
  vec4 modelViewPosition = viewMatrix * modelPosition;

  gl_Position = projectionMatrix * modelViewPosition;
  gl_PointSize = 8.0 * uPointScale / -modelViewPosition.z;

  vUv = uv;
  vSpeed = speed;
}