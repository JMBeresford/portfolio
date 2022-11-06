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
    uEmailStr: 0.5,
    uInstaStr: 0.5,
    uLinkedinStr: 0.5,
    uGithubStr: 0.5,
    uShelfTopStr: 1,
    uShelfMidStr: 1,
    uShelfBottomStr: 1,
    uMonitorStr: 1,
    uLampStr: 1,
    uWallLightStr: 1,

    uLightMap1Intensity: 1,
    uLightMap2Intensity: 1,
    uLightMap3Intensity: 0.75,
    uLightMap4Intensity: 1,
    uLightMap5Intensity: 1,

    uLightmap1: null,
    uLightmap2: null,
    uLightmap3: null,
    uLightmap4: null,
    uLightmap5: null,

    uEmailColor: new Color('#4998ff'),
    uInstaColor: new Color('#7e6bff'),
    uLinkedinColor: new Color('#ed6bff'),
    uGithubColor: new Color('#ff6b92'),
    uShelfLightColor: new Color('#FFE9A9'),
    uBaseLightColor: new Color('#ffddc1'),
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
