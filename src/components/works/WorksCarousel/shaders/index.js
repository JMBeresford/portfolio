import vertexShader from './vert.glsl';
import fragmentShader from './frag.glsl';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { animated } from '@react-spring/three';
import { Color, Vector3 } from 'three';

const BaseAvatarMaterial = shaderMaterial(
  {
    uTime: 0,
    uAvatarMap: null,
    uParticleMask: null,
    uIntersecting: 0,
    uIntersect: new Vector3(),
    uTransition: 0,
    uPointScale: 1,
    uAccentColor: new Color(),
  },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.transparent = true;
    mat.depthWrite = false;
    // mat.depthTest = false;
  }
);

extend({ BaseAvatarMaterial });

const AvatarMaterial = animated('baseAvatarMaterial');

export default AvatarMaterial;
