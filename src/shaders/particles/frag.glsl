#define WORKS_COUNT 3

precision highp float;
uniform sampler2D uTexture;
uniform sampler2D uTextureLeft;
uniform sampler2D uTextureRight;
uniform float uLeft;
uniform float uRight;
uniform float opacity;
uniform vec3 uHoveredColor;
uniform vec2 uViewport;

varying vec2 vUv;
varying float vHover;
varying float vBurn;

#define S smoothstep

float random(vec3 pos) {
  return fract(sin(dot(pos.xyz, vec3(70.9898, 78.233, 32.4355))) * 43758.5453123);
}

void main() {
  vec4 texCur = texture2D(uTexture, vUv);
  vec4 texLeft = texture2D(uTextureLeft, vUv);
  vec4 texRight = texture2D(uTextureRight, vUv);

  vec4 tex = mix(texCur, texLeft, S(0.2, 1.0, uLeft * vBurn));
  tex = mix(tex, texRight, S(0.2, 1.0, uRight * vBurn));

  float d = 1.0 - distance(vec2(0.5), gl_PointCoord) * 2.0;
  float particleMask = S(0.0, 0.5, d);

  float screenX = gl_FragCoord.x / uViewport.x;

  float alpha = tex.a * particleMask * (1.0 - vBurn);

  vec3 color = mix(tex.rgb, uHoveredColor, vHover);

  gl_FragColor = vec4(color, alpha * opacity);
} 