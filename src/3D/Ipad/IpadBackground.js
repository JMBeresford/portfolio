import { shaderMaterial } from '@react-three/drei';
import React, { useEffect, useMemo } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import vertexShader from '../../shaders/ipadBg/vert.glsl';
import fragmentShader from '../../shaders/ipadBg/frag.glsl';
import { Color } from 'three';
import useStore from '../../store';
import { gsap, Linear } from 'gsap/all';

const BackgroundMaterial = shaderMaterial(
  { uTime: 0, uAspect: 1, uCloudColor: new Color(), opacity: 0 },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.transparent = true;
    mat.depthWrite = false;
    mat.depthTest = false;
  }
);

extend({ BackgroundMaterial });

const IpadBackground = React.forwardRef((props, ref) => {
  const viewport = useThree((state) => state.viewport);
  const currentWork = useStore((state) => state.currentWork);
  const view = useStore((state) => state.view);
  const color = useMemo(() => new Color(), []);
  const spring = useMemo(() => ({ value: 0 }), []);

  useEffect(() => {
    if (color && spring) {
      color.set(useStore.getState().works[currentWork].color);

      gsap.killTweensOf(spring);

      gsap.to(spring, {
        value: 1,

        duration: 0.75,
        onUpdate: () => {
          ref.current.material.uniforms.uCloudColor.value.lerp(
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
  }, [currentWork, color, spring, ref]);

  useEffect(() => {
    if (color && spring) {
      if (view === 'aboutEntered') {
        color.setStyle('#472221');
      } else if (view === 'labEntered') {
        color.setRGB(0.6706, 0.4196, 1.0);
      } else {
        return;
      }

      gsap.killTweensOf(spring);

      gsap.to(spring, {
        value: 1,

        duration: 0.75,
        onUpdate: () => {
          ref.current.material.uniforms.uCloudColor.value.lerp(
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
  }, [view, color, spring, ref]);

  useEffect(() => {
    ref.current.material.uAspect = viewport.aspect;
  }, [viewport, ref]);

  useFrame(({ clock }) => {
    ref.current.material.uTime = clock.elapsedTime;
  });

  return (
    <mesh ref={ref} position={[0, 0, -100]}>
      <planeGeometry args={[2, 2]} />
      <backgroundMaterial />
    </mesh>
  );
});

export default IpadBackground;
