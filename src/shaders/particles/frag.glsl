precision highp float;
uniform sampler2D uTexture;
uniform float uTransition;
uniform vec3 uColor;

varying vec2 vUv;
varying vec3 vPos;
varying float vDisplacement;

#define S smoothstep

float random(vec3 pos) {
  return fract(sin(dot(pos.xyz, vec3(70.9898, 78.233, 32.4355))) * 43758.5453123);
}

void main() {
  vec4 tex = texture2D(uTexture, vUv);
  vec3 color = tex.rgb;

  float d = 1.0 - distance(vec2(0.5), gl_PointCoord) * 2.0;

  vec3 transitionColor = uColor * random(vPos);

  color = mix(color, transitionColor, uTransition * 0.25);

  float alpha = tex.a * S(0.0, 0.5, d) * S(0.0, 0.9, vDisplacement);

  gl_FragColor = vec4(color, alpha);
} 