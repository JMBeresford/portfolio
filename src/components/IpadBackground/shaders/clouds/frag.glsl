uniform float uTime;
uniform vec3 uColor;
uniform int uOctaves;

varying vec2 vUv;
varying vec3 vPos;

#define S smoothstep

#pragma glslify: noise3 = require(glsl-noise/simplex/3d)
#pragma glslify: noise4 = require(glsl-noise/simplex/4d)

float fbm(vec4 p) {
  float v = 0.0;
  float a = 0.5;

  for (int i = 0; i < uOctaves; i++) {
    v += a * noise4(p);
    p = p * 2.0;
    a *= 0.5;
  }

  return v;
}

void main() {
  vec3 p = vPos * 0.125;
  p.z -= uTime * 0.1;

  float clouds = fbm(vec4(p, uTime * 0.01));

  clouds = S(0.0, 1.0, clouds) + S(0.3, 0.7, clouds);

  vec3 color = mix(vec3(0.075), uColor, clouds);

  gl_FragColor = vec4(color, 1.0);
}