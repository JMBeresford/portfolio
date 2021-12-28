uniform vec3 uColor;
uniform float uTime;

varying vec2 vUv;

#define S smoothstep

mat2 rotate(float a) {
  float c = cos(a), s = sin(a);

  return mat2(c,-s,s,c);
}

void main() {
  vec2 newUv = vUv * 2.0 - 1.0;
  newUv *= 0.25;

  float radius = pow(fract(uTime * 0.35), 0.75);
  float d = radius - length(newUv);

  float glow = S(0.01, 0.011, d) * 0.6 - radius;
  float ring = S(0.05, 0.075, d) - S(0.05, 0.1, d);
  float intensity = mix(glow, ring, ring);

  vec3 color = mix(vec3(1.0), uColor, intensity);

  gl_FragColor = vec4(color, 1.0);
}