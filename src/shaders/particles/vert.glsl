uniform float uTime;
uniform float uDpr;
uniform float uScale;
uniform float uIntersecting;
uniform float uTransition;
uniform vec3 uMouse;

varying vec2 vUv;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)


float random(in vec3 pos) {
  return fract(sin(dot(pos.xyz, vec3(70.9898, 78.233, 32.4355))) * 43758.5453123);
}

vec3 snoise3( vec2 x ){
    float s  = snoise2(vec2( x ));
    float s1 = snoise2(vec2( x.y - 19.1 , x.x + 47.2 ));
    float s2 = snoise2(vec2( x.x - 124.5 , x.y + 99.4 ));
    vec3 c = vec3( s , s1 , s2 );
    return c;
}

vec3 snoise3( vec4 x ){
    float s  = snoise4(vec4( x ));
    float s1 = snoise4(vec4( x.y - 19.1 , x.z + 33.4 , x.x + 47.2, x.w ));
    float s2 = snoise4(vec4( x.z + 74.2 , x.x - 124.5 , x.y + 99.4, x.w ));
    vec3 c = vec3( s , s1 , s2 );
    return c;
}

void main() {
  vec3 pos = position;
  vec3 m = uMouse;
  float maxDist = 0.125;

  float d = clamp(maxDist - distance(m, pos), 0.0, maxDist);

  float factor = d * uIntersecting;

  vec3 r = vec3(random(pos.xxx), random(pos.yyy), random(pos.zzz));

  // vec3 displacement = snoise3(vec2((sin(uTime * 0.5) + 2.0) * r, (cos(uTime * 0.5) + 2.0) * -r));
  vec3 displacement = snoise3(vec4(r, uTime * 0.2)) * 3.0;
  pos = mix(pos, displacement, (factor * 5.0 + uTransition * 0.9));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 3.5 * uDpr * uScale;
  vUv = uv;
}