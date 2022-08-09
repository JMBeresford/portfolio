import vertexShader from './vert.glsl';
import fragmentShader from './frag.glsl';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { animated } from '@react-spring/three';
import { Color } from 'three';

const BaseAvatarMaterial = shaderMaterial(
  {
    uTime: 0,
    uAvatarMap: null,
    uNextAvatarMap: null,
    uPrevAvatarMap: null,
    uParticleMask: null,
    uMouse: [0, 0],
    uLeft: 0,
    uRight: 0,
    uTransitionPrev: 0,
    uTransitionNext: 0,
    uPointScale: 1,
    uAccentColor: new Color(),
  },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.transparent = true;
    // mat.depthWrite = false;
    mat.depthTest = false;
  }
);

extend({ BaseAvatarMaterial });

const AvatarMaterial = animated('baseAvatarMaterial');

export default AvatarMaterial;
