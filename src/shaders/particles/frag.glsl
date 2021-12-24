precision highp float;
uniform sampler2D uTexture;
uniform float uTransition;
uniform vec3 uColor;

varying vec3 vPos;
varying vec3 vColor;
varying vec2 vUv;

void main() {

  vec4 color = texture2D(uTexture, vUv);
  color = vec4(mix(color.rgb, uColor, uTransition), color.a);

  // #if defined(TONE_MAPPING)
  //   color = vec4(toneMapping(color.rgb), color.a);
  // #endif

  color.rgb *= color.a;

  gl_FragColor = color;
}