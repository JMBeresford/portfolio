uniform float uTime;
uniform float opacity;
uniform int uFbmOctaves;
uniform vec3 uCloudColor;
uniform sampler2D uNoiseTex;

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
  vec2 f = vec2(fbm(p * 2.5 + uTime * 0.1), fbm(p * 2.5 + uTime * 0.2));

  // domain distortion
  return fbm(p + f);
}

float circle(vec2 p) {
  float r = log(sqrt(length(p)));

  return abs(mod(r * 2., PI * 2.0) - 4.5) * 3.0 + 0.5;
}

void main() {
  float distFromCenter = length(vUv2);

  vec2 p = vUv2 * rot(uTime * 0.25 + S(0.3, 0.8, distFromCenter) - pow(distFromCenter, 2.0));

  float noise = fbmDistorted(p);

  float rim = noise * pow(abs((-circle(vec2(p.x / 5.0, p.y / 5.0)))), 3.0);

  rim = pow(rim, 0.89);

  vec3 portal = max(uCloudColor * 0.1/rim, vec3(0.075));

  // fix for artifact at center
  float center = S(0.0, 0.2, distFromCenter);
  portal = mix(vec3(0.075), portal, center);

  gl_FragColor = vec4(portal, opacity);
}