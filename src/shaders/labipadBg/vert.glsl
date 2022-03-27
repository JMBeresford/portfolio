uniform vec2 uAspect;
uniform float uTime;
uniform vec2 uMouse;

varying vec2 vUv;
varying vec2 vUv2;

mat2 rot(float a) {
  float s=sin(a), c=cos(a);

  return mat2(c, -s, s, c);
}

void main() {
  vec2 newUv = uv * 2.0 - 1.0;
  newUv *= uAspect;
  gl_Position = vec4(position, 1.0);
  vUv = newUv * vec2(0.2, 0.4) * rot(uTime * 0.01);
  vUv2 = newUv + uMouse * 0.1;
}