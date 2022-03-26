varying vec2 vUv;
varying vec2 vScreenSpaceCoords;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  vUv = uv;
  vScreenSpaceCoords = ( gl_Position.xy / gl_Position.w );
}