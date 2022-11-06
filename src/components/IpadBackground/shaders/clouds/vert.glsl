uniform float uAspect;

varying vec2 vUv;
varying vec3 vPos;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * viewMatrix * modelPosition;

  vUv = (uv * 2.0 - 1.0);
  vUv.x *= uAspect;
  vPos = position.xyz;
}