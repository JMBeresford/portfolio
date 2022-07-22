#define WHITE vec3(1.0)

uniform float uTime;

uniform sampler2D uAlbedo;
uniform float uAmbientLight;
uniform float uEmailStr;
uniform float uInstaStr;
uniform float uLinkedinStr;
uniform float uGithubStr;
uniform float uShelfTopStr;
uniform float uShelfMidStr;
uniform float uShelfBottomStr;
uniform float uMonitorStr;
uniform float uLampStr;
uniform float uWallLightStr;

uniform float uLightMap1Intensity;
uniform float uLightMap2Intensity;
uniform float uLightMap3Intensity;
uniform float uLightMap4Intensity;
uniform float uLightMap5Intensity;

uniform sampler2D uLightmap1;
uniform sampler2D uLightmap2;
uniform sampler2D uLightmap3;
uniform sampler2D uLightmap4;
uniform sampler2D uLightmap5;

uniform vec3 uEmailColor;
uniform vec3 uInstaColor;
uniform vec3 uLinkedinColor;
uniform vec3 uGithubColor;
uniform vec3 uShelfLightColor;

varying vec2 vUv;

#pragma glslify: blendAdd = require(glsl-blend/add)
#pragma glslify: blendLighten = require(glsl-blend/lighten)

void main() {
  vec3 color = vec3(0.0);

  vec3 albedo = texture2D(uAlbedo, vUv).rgb;
  color = albedo * uAmbientLight;

  vec3 lights1 = clamp(texture2D(uLightmap1, vUv).rgb, 0.0, 1.0) * uLightMap1Intensity;
  vec3 lights2 = clamp(texture2D(uLightmap2, vUv).rgb, 0.0, 1.0) * uLightMap2Intensity;
  vec3 lights3 = clamp(texture2D(uLightmap3, vUv).rgb, 0.0, 1.0) * uLightMap3Intensity;
  vec3 lights4 = clamp(texture2D(uLightmap4, vUv).rgb, 0.0, 1.0) * uLightMap4Intensity;
  vec3 lights5 = clamp(texture2D(uLightmap5, vUv).rgb, 0.0, 1.0) * uLightMap5Intensity;

  // first lightmap
  float emailLight = lights1.r * uEmailStr;
  float instaLight = lights1.g * uInstaStr;
  float linkedinLight = lights1.b * uLinkedinStr;
  color = blendLighten(color, uEmailColor, emailLight);
  color = blendLighten(color, uInstaColor, instaLight);
  color = blendLighten(color, uLinkedinColor, linkedinLight);

  // second lightmap
  float aboutLight = lights2.r * uShelfTopStr;
  float worksLight = lights2.g * uShelfMidStr;
  float labLight = lights2.b * uShelfBottomStr;
  color = blendLighten(color, uShelfLightColor, aboutLight + worksLight + labLight);

  // third lightmap
  float githubLight = lights3.r * uGithubStr;
  float monitorLight = lights3.g * uMonitorStr;
  float tableLight = lights3.b;
  vec3 tableLightColor = mix(uEmailColor, uGithubColor, sin(uTime));
  color = blendLighten(color, uGithubColor, githubLight);
  color = blendLighten(color, WHITE, monitorLight);
  color = blendLighten(color, tableLightColor, tableLight);

  // fourth lightmap
  float macLight = lights4.r;
  float lampLight = lights4.g * uLampStr;
  float wallLight = lights4.b * uWallLightStr;
  color = blendLighten(color, WHITE, macLight);
  color = blendLighten(color, uShelfLightColor, lampLight + wallLight);

  // fifth lightmap
  float ipadTopLight = lights5.r * uShelfTopStr;
  float ipadMidLight = lights5.g * uShelfMidStr;
  float ipadBottomLight = lights5.b * uShelfBottomStr;
  color = blendLighten(color, WHITE, ipadTopLight + ipadMidLight + ipadBottomLight);

  #if defined(TONE_MAPPING)
    color = toneMapping(color);
  #endif

  gl_FragColor = vec4(color, 1.0);

  // equivalent to #include <encodings_pars_fragment>
  gl_FragColor = linearToOutputTexel(gl_FragColor);
}