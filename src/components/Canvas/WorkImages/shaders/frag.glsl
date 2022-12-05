uniform sampler2D uTexture;
uniform sampler2D uNextTexture;
uniform float uTransition;
uniform float uOpacity;
uniform float uScrollOpacity;
uniform float uTime;
uniform vec3 uAccentColor;

varying vec2 vUv;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

#define S smoothstep

void main() {
  // base image colors
  vec4 tex1 = texture2D(uTexture, vUv);
  vec4 tex2 = texture2D(uNextTexture, vUv);

  // calc transition factor
  float transition = S(0.25, 0.75, (0.25 + abs(snoise2(vUv + uTime * 0.05))) * uTransition * 2.5);

  // mix final color
  vec3 color = tex1.rgb;
  color = mix(color, uAccentColor, S(0.35, 0.5, transition));
  color = mix(color, tex2.rgb, S(0.5, 0.65, transition));

  // mix opacity
  float opacity = mix(tex1.a, tex2.a, uTransition) * uOpacity * uScrollOpacity;

  gl_FragColor = vec4(color, opacity);
  gl_FragColor.rgb = linearToOutputTexel(gl_FragColor).rgb;
}