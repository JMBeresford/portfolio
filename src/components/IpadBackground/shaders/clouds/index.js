import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { shaderMaterial } from "@react-three/drei";
import { BackSide, Color } from "three";
import { extend } from "@react-three/fiber";
import { animated } from "@react-spring/three";

const BaseCloudsMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new Color("#38945e"),
    uAspect: [1, 1],
    uOctaves: 3,
  },
  vertexShader,
  fragmentShader,
  (mat) => {
    // mat.depthTest = false;
    mat.depthWrite = false;
    // mat.transparent = true;
    mat.side = BackSide;
  }
);

extend({ BaseCloudsMaterial });

const CloudsMaterial = animated("baseCloudsMaterial");

export default CloudsMaterial;
