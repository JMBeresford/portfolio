import vertexShader from './vert.glsl';
import fragmentShader from './frag.glsl';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { animated } from '@react-spring/three';

const BaseImageMaterial = shaderMaterial(
  {
    map: null,
    opacity: 1,
    uAspect: [1, 1],
  },
  vertexShader,
  fragmentShader,
  (mat) => {
    // mat.depthTest = false;
    mat.transparent = true;
  }
);

extend({ BaseImageMaterial });

const ImageMaterial = animated('baseImageMaterial');

export default ImageMaterial;
