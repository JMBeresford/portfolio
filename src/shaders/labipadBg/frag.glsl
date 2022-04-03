// HIGHLY insprired by https://www.shadertoy.com/view/ldKGDh

uniform float uTime;
uniform float opacity;
uniform float uProgress;
uniform float uHovered;
uniform int uFbmOctaves;
uniform vec3 uCloudColor;
uniform vec2 uMouse;
uniform sampler2D uPortalTexture;

varying vec2 vUv;
varying vec2 vUv2;

#define S smoothstep
#define PI 3.1415926535897932384626433832795

mat2 rot(float a) {
  return mat2(cos(a), sin(a), -sin(a), cos(a));
}

// from https://github.com/yiwenl/glsl-fbm
float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

// from https://github.com/yiwenl/glsl-fbm
float noise2D(vec2 p){
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);
	
	float res = mix(
		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
	return res*res;
}

// from https://github.com/yiwenl/glsl-fbm
float fbm(vec2 x) {
	float v = 0.0;
	float a = 0.5;
	vec2 shift = vec2(100);
	// Rotate to reduce axial bias
    mat2 rm = rot(0.5);
	for (int i = 0; i < uFbmOctaves; ++i) {
		v += a * noise2D(x);
		x = rm * x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}

float fbmDistorted(vec2 p) {
  vec2 newP = p + uMouse * 0.1;
  vec2 f = vec2(fbm(newP * 2.5 + uTime * -0.35), fbm(newP * 2.5 + uTime * -0.5));

  // domain distortion
  return fbm(p + f);
}

float circle(vec2 p) {
  float r = log(sqrt(length(p)));

  return abs(mod(r * 1.7, PI * 2.0) - 4.5) * 2.5 + 0.05;
}

void main() {
  float distFromCenter = length(vUv2);

  vec3 tex = texture2D(uPortalTexture, vUv).rgb;

  vec3 cloudColor = mix(
    uCloudColor, vec3(1.0, 0.0, 0.0), min(uHovered * pow(distFromCenter, 1.5) * 0.2, 1.0)
  );

  vec2 p = vUv2 / (1.0 + uHovered / 2.0) * rot(uTime * 0.025 - pow(distFromCenter, 1.25));

  float noise = fbmDistorted(p * 10.0);

  float rim = noise * pow(abs((-circle(vec2(p.x / 5.0, p.y / 5.0)))), 1.05);

  // rim = pow(rim, 0.99);

  vec3 portal = cloudColor * 0.1/rim * (1.0 - S(0.45, 2.0, distFromCenter));

  vec3 color = portal + cloudColor * 0.1 * distFromCenter;

  float inPortal = S(1.2, 0.0, distFromCenter) - step(0.6085 + 0.5 * uHovered, distFromCenter);

  // inPortal = clamp(1.0 - inPortal, 0.0, 1.0);

  color = mix(color, tex, S(0.0, 1.0 - 0.3 * uHovered, inPortal));

  color *= uProgress;

  color = max(color, vec3(0.075));

  gl_FragColor = vec4(color, opacity);
}