import vertexShader from './vert.glsl';
import fragmentShader from './frag.glsl';
import { shaderMaterial } from '@react-three/drei';
import { Color } from 'three';
import { extend } from '@react-three/fiber';
import { animated } from '@react-spring/three';

const BaseIpadMaterial = shaderMaterial(
  {
    uTime: 0,
    uHovered: 0,
    uColor: new Color(),
    uLightningMap: null,
  },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.toneMapped = true;
    mat.vertexColors = true;
  }
);

extend({ BaseIpadMaterial });

const IpadMaterial = animated('baseIpadMaterial');

export default IpadMaterial;
