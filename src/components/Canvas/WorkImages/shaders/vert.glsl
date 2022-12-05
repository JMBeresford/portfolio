uniform float uTime;

varying vec2 vUv;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

void main() {
  vec3 pos = position;

  pos.z += snoise3(vec3(pos.xy * 5.0, uTime * 0.125)) * 0.015;

  vec4 modelPos = modelMatrix * vec4(pos, 1.0);

  gl_Position = projectionMatrix * viewMatrix * modelPos;
  vUv = uv;
}