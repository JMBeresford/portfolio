precision highp float;
uniform sampler2D uTexture;
uniform float uTransition;
uniform vec3 uColor;

varying vec3 vPos;
varying vec3 vColor;
varying vec2 vUv;

void main() {
  float d = 1.0 - distance(gl_PointCoord, vec2(0.5)) * 2.0;

  vec4 color = texture2D(uTexture, vUv);
  color = vec4(mix(color.rgb, uColor, uTransition * 2.0), color.a);

  // #if defined(TONE_MAPPING)
  //   color = vec4(toneMapping(color.rgb), color.a);
  // #endif

  color.a = mix(color.a, color.a * d, uTransition * 2.0);

  color.rgb *= color.a;

  gl_FragColor = color;
}