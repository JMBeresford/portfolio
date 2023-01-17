uniform float uTime;
uniform vec3 uColors[4];
uniform int uOctaves;

varying vec3 vPos;

#define S smoothstep

#pragma glslify: noise3 = require(glsl-noise/classic/3d)
#pragma glslify: noise4 = require(glsl-noise/classic/4d)

float fbm(vec3 p) {
  float v = 0.2;
  float a = 0.65;

  for (int i = 0; i < uOctaves; i++) {
    v += a * noise3(p);
    p = p * 2.0;
    a *= 0.45;
  }

  return v;
}

vec3 getColor(vec3 p) {
  p *= 0.125;

  vec3 color = uColors[0];

  for (int i = 0; i < 4; i++) {
    float speed = 2.0 + float(i) * 1.3;
    float time = uTime * 0.0125 * speed;

    vec3 pNew = p + vec3(time, time * 1.3, time * 2.0);

    float noise = noise3(pNew) + 0.25;

    color = mix(color, uColors[i], S(0.0, 1.0, noise));
  }

  return color;
}

void main() {
  vec3 p = vPos * 0.25;
  // p.xz *= 0.15;
  p.z -= uTime * 0.05;

  float clouds = abs(noise3(p));

  clouds = S(0.0, 1.0, clouds) * 0.5;

  vec3 colorToUse = getColor(vPos);

  vec3 baseColor = mix(colorToUse, vec3(0.0), 0.85);

  vec3 color = mix(baseColor, colorToUse, clouds);

  // color *= 0.75;
  // color = vec3(clouds);

  gl_FragColor = vec4(color, 1.0);

  gl_FragColor.rgb = toneMapping(gl_FragColor.rgb);
}