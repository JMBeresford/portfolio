import vertexShader from './vert.glsl';
import fragmentShader from './frag.glsl';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { animated } from '@react-spring/three';
import { generateUUID } from 'three/src/math/MathUtils';
import { AdditiveBlending, Color } from 'three';

const BaseConstellationMaterial = shaderMaterial(
  {
    uTime: 0,
    uTransition: 0,
    uPointSize: 0,
    uPointMultiplier: 1,
    uHovered: 0,
    uDisplacementFactor: 1,
    uColor1: new Color(),
    uColor2: new Color(),
    uColor3: new Color(),
  },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.transparent = true;
    mat.depthWrite = false;
    // mat.depthTest = false;
    mat.blending = AdditiveBlending;
    mat.premultipliedAlpha = true;
  }
);

BaseConstellationMaterial.key = generateUUID();

extend({ BaseConstellationMaterial });

export const ConstellationMaterial = animated('baseConstellationMaterial');
