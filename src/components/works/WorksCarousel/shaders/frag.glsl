uniform sampler2D uAvatarMap;
uniform sampler2D uNextAvatarMap;
uniform sampler2D uPrevAvatarMap;
uniform sampler2D uParticleMask;
uniform float uLeft;
uniform float uRight;
uniform vec3 uAccentColor;

varying vec2 vUv;
varying float vDivergenceFactor;
varying float vSpeed;
varying float vHeightCycle;
varying float vHorizCycle;
varying float vTransition;

#define S smoothstep

void main() {
  // textures
  vec4 curTex = texture2D(uAvatarMap, vUv);
  vec4 nextTex = texture2D(uNextAvatarMap, vUv);
  vec4 prevTex = texture2D(uPrevAvatarMap, vUv);
  float particleMask = texture2D(uParticleMask, gl_PointCoord).r;

  // determine which texture to use
  vec4 displayTex = mix(curTex, prevTex, clamp(uLeft * vHorizCycle, 0.0, 1.0));
  displayTex = mix(displayTex, nextTex, clamp(uRight * vHorizCycle, 0.0, 1.0));

  vec3 color = mix(displayTex.rgb, uAccentColor, S(0.0, 0.75, vDivergenceFactor * vSpeed));

  // alpha
  float opacity = curTex.a; // always use curTex opacity
  opacity *= particleMask;

  if (vDivergenceFactor > 0.0) {
    opacity *= 1.0 - vDivergenceFactor;
    opacity *= 1.0 - distance(vHeightCycle, 0.5) * 2.0;
  }

  opacity *= 1.0 - vHorizCycle;
  opacity *= 1.0 - S(0.0, 0.85, vTransition);

  gl_FragColor = vec4(color, opacity);

  gl_FragColor.xyz = linearToOutputTexel(gl_FragColor).xyz;
}