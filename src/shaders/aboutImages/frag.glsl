uniform sampler2D map;
uniform float opacity;
uniform vec2 uAspect;

varying vec2 vUv;
varying vec2 vScreenSpaceCoords;

#define S smoothstep

void main() {
  vec4 tex = texture2D(map, vUv);

  float distFromCenter = length(vScreenSpaceCoords * uAspect) * 0.5;

  float fade = S(0.35, 0.95, distFromCenter);

  gl_FragColor = vec4(tex.rgb , tex.a * opacity * fade);
}