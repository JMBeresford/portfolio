import vertexShader from './vert.glsl';
import fragmentShader from './frag.glsl';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { animated } from '@react-spring/three';

const BaseMonitorMaterial = shaderMaterial(
  { uTime: 0, uEntered: 0 },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.toneMapped = true;
  }
);

extend({ BaseMonitorMaterial });

const MonitorMaterial = animated('baseMonitorMaterial');

export default MonitorMaterial;
