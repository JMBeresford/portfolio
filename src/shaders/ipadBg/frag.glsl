uniform float uTime;
uniform float opacity;
uniform vec3 uCloudColor;

varying vec2 vUv;

#define S smoothstep

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

void main() {
  vec2 st = vUv;

  vec3 color = vec3(0.075, 0.075, 0.075);

  float clouds = snoise3(vec3(st, uTime * 0.1));

  color = mix(color, uCloudColor, S(0.0, 1.0, clouds) + S(0.3, 0.7, clouds));

  gl_FragColor = vec4(color, opacity);
}