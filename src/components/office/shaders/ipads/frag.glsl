uniform float uTime;
uniform float uHovered;
uniform vec3 uColor;
uniform sampler2D uLightningMap;

varying vec2 vUv;

#define S smoothstep

#ifndef NUM_OCTAVES
#define NUM_OCTAVES 5
#endif

#pragma glslify: snoise3 = require('glsl-noise/simplex/3d')

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 st) {
  vec2 id = floor(st);
  vec2 fr = fract(st);

  fr = fr * fr * (3.0 - 2.0 * fr);

  float base = mix(
    mix(rand(id), rand(id + vec2(1.0, 0.0)), fr.x),
    mix(rand(id + vec2(0.0, 1.0)), rand(id + vec2(1.0, 1.0)), fr.x),
    fr.y
  );

  return base * base;
}

float fbm(vec2 st) {
  float v = 0.0;
  float a = 0.5;

  vec2 shift = vec2(100.0, 100.0);
  mat2 r = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));

  for (int i = 0; i < NUM_OCTAVES; i++) {
    v += a * noise(st);
    st = r * st * 2.0 + shift;
    a *= 0.5;
  }

  return v;
}

void main() {
  vec3 color = vec3(0.075);
  vec2 st = vUv;
  vec2 center = vec2(0.5);
  vec2 delta = st - center;
  float str = mix(5.0, 10.0, (sin(uTime) + 1.0) / 2.0);
  float angle = str * length(delta);

  float x = cos(angle) * delta.x - sin(angle) * delta.y;
  float y = sin(angle) * delta.x + cos(angle) * delta.y;

  vec2 offset = vec2(
    (cos(uTime) + 1.0) / 2.0,
    (sin(uTime) + 1.0) / 2.0
  );

  vec2 p = vec2(x + center.x + offset.x, y + center.y + offset.y);

  float lightning = texture2D(uLightningMap, (st + offset * 0.15) * 0.5).r * 1.75;

  float flickering = max(0.0, snoise3(vec3(st * 2.5, uTime)) * length(delta) * 2.0);

  float vortexBase = fbm(p);

  float vortex = S(0.0, 1.0, vortexBase) + S(0.3, 0.7, vortexBase);

  color = mix(color, uColor, vortex);

  color += lightning * flickering * uColor * (1.0 - uHovered);

  #if defined(TONE_MAPPING)
    vec3 tonemapped = toneMapping(color);
    color = mix(color, tonemapped, uHovered);
  #endif

  gl_FragColor = vec4(color, 1.0);
}