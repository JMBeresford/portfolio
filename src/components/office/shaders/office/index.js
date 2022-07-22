import vertexShader from './vert.glsl';
import fragmentShader from './frag.glsl';
import { animated } from '@react-spring/three';
import { Color } from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

const BaseOfficeMaterial = shaderMaterial(
  {
    uTime: 0,
    uAlbedo: null,
    uAmbientLight: 0.1,
    uEmailStr: 0.2,
    uInstaStr: 0.2,
    uLinkedinStr: 0.2,
    uGithubStr: 0.2,
    uShelfTopStr: 1,
    uShelfMidStr: 1,
    uShelfBottomStr: 1,
    uMonitorStr: 1,
    uLampStr: 1,
    uWallLightStr: 1,

    uLightMap1Intensity: 1,
    uLightMap2Intensity: 0.5,
    uLightMap3Intensity: 1,
    uLightMap4Intensity: 1,
    uLightMap5Intensity: 0.5,

    uLightmap1: null,
    uLightmap2: null,
    uLightmap3: null,
    uLightmap4: null,
    uLightmap5: null,

    uEmailColor: new Color('#235DFF'),
    uInstaColor: new Color('#5E80B2'),
    uLinkedinColor: new Color('#FF56B8'),
    uGithubColor: new Color('#FF1E7C'),
    uShelfLightColor: new Color('#FFE9A9'),
  },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.toneMapped = true;
  }
);

extend({ BaseOfficeMaterial });

const OfficeMaterial = animated('baseOfficeMaterial');

export { OfficeMaterial };
