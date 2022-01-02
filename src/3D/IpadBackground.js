import { shaderMaterial, useDetectGPU } from '@react-three/drei';
import React, { useEffect, useRef, useMemo } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import vertexShader from '../shaders/ipadBg/vert.glsl';
import fragmentShader from '../shaders/ipadBg/frag.glsl';
import { Color } from 'three';
import useStore from '../store';
import { gsap, Linear } from 'gsap/all';

const BackgroundMaterial = shaderMaterial(
  { uTime: 0, uAspect: 1, uCloudColor: new Color() },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.transparent = true;
    mat.depthWrite = false;
  }
);

extend({ BackgroundMaterial });

const IpadBackground = ({ section }) => {
  const bgRef = useRef();
  const viewport = useThree((state) => state.viewport);
  const gl = useThree((state) => state.gl);
  const GPUTier = useDetectGPU({ glContext: gl.getContext() });
  const currentWork = useStore((state) => state.currentWork);
  const color = useMemo(() => new Color(), []);
  const spring = useMemo(() => ({ value: 0 }), []);

  useEffect(() => {
    bgRef.current.material.uCloudDetail = GPUTier.tier;
  }, [GPUTier]);

  useEffect(() => {
    if (color && spring) {
      color.set(useStore.getState().works[currentWork].accentColor);

      gsap.killTweensOf(spring);

      gsap.to(spring, {
        value: 1,

        duration: 0.75,
        onUpdate: () => {
          bgRef.current.material.uniforms.uCloudColor.value.lerp(
            color,
            spring.value
          );
        },
        onComplete: () => {
          spring.value = 0;
        },
        ease: Linear.easeInOut,
      });
    }
  }, [currentWork, color, spring]);

  useEffect(() => {
    bgRef.current.material.uAspect = viewport.aspect;
  }, [viewport]);

  useFrame(({ clock }) => {
    bgRef.current.material.uTime = clock.elapsedTime;
  });

  return (
    <group position={[0, 0, -2]}>
      <mesh ref={bgRef}>
        <planeGeometry args={[2, 2]} />
        <backgroundMaterial />
      </mesh>
    </group>
  );
};

export default IpadBackground;
