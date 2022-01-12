precision highp float;
uniform vec3 uColor;
uniform float opacity;

varying float vDepth;
varying float vRandom;

#define S smoothstep

void main() {
  float mask = S(0.7, 0.0, distance(vec2(0.5), gl_PointCoord.xy) * 2.0);

  vec3 color = mix(uColor, vec3(1.0), vRandom);

  gl_FragColor = vec4(color, opacity * mask * S(0.3, 1.0, vDepth / 6.0));
} 