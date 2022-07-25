varying vec2 vUv;

void main() {
  vec4 modelPos = modelMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * viewMatrix * modelPos;
  vUv = vec2(uv.x, 1.0 - uv.y) * 2.0 - 1.0;
  vUv.y -= 1.0;
}