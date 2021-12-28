uniform float uTime;
uniform float uIntersecting;
uniform vec3 uMouse;

varying vec2 vUv;
varying vec3 vPos;

#define MAX_DIST 0.35

void main() {
  vec3 pos = position;

  float d = clamp(MAX_DIST - distance(uMouse, pos), 0.0, MAX_DIST);

  float factor = d * uIntersecting * 5.0;

  float offset = mix((sin(pos.y * 5.0 + uTime) + cos(pos.x * 5.0 + uTime)) * 0.05, 0.2, factor);

  pos.z += offset;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  vUv = uv;
  vPos = (modelMatrix * vec4(position, 1.0)).xyz;
}