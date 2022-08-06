uniform float uTime;

varying float vDist;

float rand(vec3 p) {
  return fract(sin(dot(p, vec3(12.9898, 78.233, 151.7182))) * 43758.5453);
}

#ifndef mod
float mod(float a, float b) {
  return a - b * floor(a / b);
}
#endif

void main() {
  // get final position - calculated at load in JS
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // set start position relative to final position, but further away
  vec3 positionInitial = position * 2.0;
  positionInitial.z = -20.0;

  float speed = rand(position) * 0.5 + 0.5; // speed between 0.5 and 1.0
  
  // add gradual rotation
  modelPosition.x += sin(uTime * 0.5 * speed);
  modelPosition.y += cos(uTime * 0.5 * speed);

  // move the particle along the path
  modelPosition.xyz = mix(positionInitial, modelPosition.xyz, mod(uTime * 0.1 * speed, 50.0));

  float d = distance(modelPosition.xyz, cameraPosition);

  gl_Position = projectionMatrix * viewMatrix * modelPosition;
  gl_PointSize = 45.0 / d;

  vDist = d;
}