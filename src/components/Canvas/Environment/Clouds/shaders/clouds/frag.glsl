uniform float uTime;
uniform vec3 uColors[4];
uniform int uOctaves;

varying vec2 vUv;
varying vec3 vPos;

#define S smoothstep

#pragma glslify: noise3 = require(glsl-noise/classic/3d)
#pragma glslify: noise4 = require(glsl-noise/classic/4d)

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;

  for(int i = 0; i < uOctaves; i++) {
    v += a * abs(noise3(p));
    p = p * 2.0;
    a *= 0.5;
  }

  return v;
}

vec3 getColor(vec3 p) {
  p *= 0.035;
  float noise = abs(noise4(vec4(p, uTime * 0.05)) * 4.5);

  vec3 color = uColors[0];

  color = mix(color, uColors[1], S(0.0, 1.0, noise));
  color = mix(color, uColors[2], S(1.0, 2.0, noise));
  color = mix(color, uColors[3], S(2.0, 3.0, noise));

  return color;
}

void main() {
  vec3 p = vPos * 0.15;
  // p.xz *= 0.15;
  p.z -= uTime * 0.05;

  float clouds = fbm(p);

  clouds = S(0.0, 1.0, clouds) * 0.5;

  vec3 colorToUse = getColor(vPos);

  vec3 baseColor = mix(colorToUse, vec3(0.0), 0.85);

  vec3 color = mix(baseColor, colorToUse, clouds);

  gl_FragColor = vec4(color, 1.0);

  gl_FragColor.rgb = toneMapping(gl_FragColor.rgb);
}