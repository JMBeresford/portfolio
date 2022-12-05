import { animated } from '@react-spring/three';
import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import vertexShader from './vert.glsl';
import fragmentShader from './frag.glsl';
import { Color } from 'three';

const BaseWorkImageMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: null,
    uNextTexture: null,
    uTransition: 0,
    uOpacity: 0,
    uScrollOpacity: 0,
    uAccentColor: new Color(),
  },
  vertexShader,
  fragmentShader,
  (m) => {
    m.transparent = true;
  }
);

extend({ BaseWorkImageMaterial });

const WorkImageMaterial = animated('baseWorkImageMaterial');

export default WorkImageMaterial;
