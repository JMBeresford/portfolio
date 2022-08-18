uniform sampler2D uAvatarMap;
uniform sampler2D uParticleMask;
uniform vec3 uAccentColor;
uniform float uTransition;

varying vec2 vUv;
varying float vDivergenceFactor;
varying float vSpeed;

#define S smoothstep

void main() {
  // textures
  vec4 avatarTex = texture2D(uAvatarMap, vUv);
  float particleMask = texture2D(uParticleMask, gl_PointCoord).r;

  vec3 color = mix(avatarTex.rgb, uAccentColor, S(0.0, 0.75, vDivergenceFactor * vSpeed) + S(0.0, 0.25, uTransition * vSpeed));

  // alpha
  float opacity = avatarTex.a;
  opacity *= particleMask;
  opacity *= 1.0 - vDivergenceFactor;
  opacity *= 1.0 - S(0.0, 0.4, uTransition);

  gl_FragColor = vec4(color, opacity);

  gl_FragColor.xyz = linearToOutputTexel(gl_FragColor).xyz;
}