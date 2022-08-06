uniform sampler2D uParticleMap;
varying float vDist;

#define S smoothstep

void main() {
  vec3 color = vec3(0.65);

  float mask = texture2D(uParticleMap, gl_PointCoord).r;

  float opacity = mask * S(19.0, 15.0, vDist);

  gl_FragColor = vec4(color, opacity);
}