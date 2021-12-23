uniform sampler2D uTexture;
uniform float uIntersecting;
uniform vec3 uMouse;

varying vec3 vPos;
varying vec2 vUv;

mat2 rotate(float a) {
  float c = cos(a), s = sin(a);

  return mat2(c,-s,s,c);
}

void main() {
  float d = clamp(0.2 - distance(uMouse, vPos), 0.0, 0.2);

  float factor = d * uIntersecting;

  vec3 color = texture2D(uTexture, vUv * rotate(factor)).rgb;

  gl_FragColor = vec4(color, 1.0);
}