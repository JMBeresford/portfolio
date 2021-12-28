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
  vec4 color = texture2D(uTexture, vUv);

  float d = 1.0 - distance(vec2(0.5), gl_PointCoord) * 2.0;

  if (d <= 0.0 && vDisplacement > 0.0) {
    discard;
  }

  vec4 transitionColor = vec4(uColor, 1.0) * clamp((1.0 - length(vPos)), 0.0, 1.0);

  color = mix(color, transitionColor, S(0.0, 1.0, vDisplacement * 1.2));

  color.rgb *= color.a;

  gl_FragColor = color;
} 