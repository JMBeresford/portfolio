import vertexShader from './vert.glsl';
import fragmentShader from './frag.glsl';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { animated } from '@react-spring/three';
import { AdditiveBlending } from 'three';

const BaseParticleMaterial = shaderMaterial(
  {
    uTime: 0,
    uParticleMap: null,
  },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.depthTest = false;
    mat.depthWrite = false;
    mat.blending = AdditiveBlending;
    mat.transparent = true;
  }
);

extend({ BaseParticleMaterial });

const ParticleMaterial = animated('baseParticleMaterial');

export default ParticleMaterial;
