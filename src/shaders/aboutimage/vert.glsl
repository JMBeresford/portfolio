uniform float uTime;

varying vec2 vUv;
varying vec3 vPos;

void main() {
  vec3 pos = position;
  pos.z += (sin(pos.y * 5.0 + uTime) + cos(pos.x * 5.0 + uTime)) * 0.05;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  vUv = uv;
  vPos = (modelMatrix * vec4(position, 1.0)).xyz;
}