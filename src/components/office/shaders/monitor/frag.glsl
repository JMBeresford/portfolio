uniform float uTime;
uniform float uEntered;

varying vec2 vUv;

#define S smoothstep
#define BLUR 0.075
#define COUNT 8.0

float Wave(vec2 uv) {
  float wave = S(BLUR, -BLUR, uv.y * 2.0 + sin(uv.x) + cos(uv.x));

  return wave;
}

void main() {
  vec2 uv = vUv;
  vec3 color1 = vec3(0.1373, 0.3647, 1.0);
  vec3 color2 = vec3(1.0, 0.1176, 0.4863);

  vec3 waves = vec3(0.0);

  for(float i = 0.0; i < 1.0; i += 1.0 / COUNT) {
    uv = vUv;

    uv.y += i + abs(sin(uTime * 0.1)) * i;
    uv.x += uTime * i * 0.5;

    float wave = Wave(uv * 3.0);
    vec3 c = mix(color1, color2, i);
    waves = mix(waves, c, wave);
  }

  #if defined(TONE_MAPPING)
  waves = toneMapping(waves);
  #endif

  waves = mix(vec3(1.0), waves, S(0.0, 1.0, uEntered));

  gl_FragColor = vec4(waves, 1.0);
}