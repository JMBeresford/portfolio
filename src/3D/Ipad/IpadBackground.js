import { shaderMaterial, useDetectGPU, useTexture } from '@react-three/drei';
import React, { useEffect, useMemo } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import vertexShader from '../../shaders/ipadBg/vert.glsl';
import fragmentShader from '../../shaders/ipadBg/frag.glsl';
import labVertexShader from '../../shaders/labipadBg/vert.glsl';
import labFragmentShader from '../../shaders/labipadBg/frag.glsl';
import { Color, Vector2 } from 'three';
import useStore from '../../store';
import { gsap, Linear } from 'gsap/all';
import portalImage from '../../img/portalImage.webp';
import { useSpring, animated } from '@react-spring/three';

const BackgroundMaterial = shaderMaterial(
  {
    uTime: 0,
    uAspect: [1, 1],
    uCloudColor: new Color(),
    opacity: 0,
    uMouse: new Vector2(),
  },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.transparent = true;
    mat.depthWrite = false;
    mat.depthTest = false;
  }
);

const LabBackgroundMaterial = shaderMaterial(
  {
    uTime: 0,
    uAspect: [1, 1],
    uCloudColor: new Color(),
    opacity: 0,
    uProgress: 0,
    uHovered: 0,
    uFbmOctaves: 3,
    uMouse: new Vector2(),
    uPortalTexture: null,
  },
  labVertexShader,
  labFragmentShader,
  (mat) => {
    mat.transparent = true;
    mat.depthWrite = false;
    mat.depthTest = false;
  }
);

extend({ BackgroundMaterial, LabBackgroundMaterial });

const AnimLabBackgroundMaterial = animated('labBackgroundMaterial');

const IpadBackground = React.forwardRef((props, ref) => {
  const viewport = useThree((state) => state.viewport);
  const gl = useThree((state) => state.gl);
  const currentWork = useStore((state) => state.currentWork);
  const view = useStore((state) => state.view);
  const destination = useStore((state) => state.destination);
  const leavingIpad = useStore((state) => state.leavingIpad);
  const labTextHovered = useStore((state) => state.labTextHovered);
  const color = useMemo(() => new Color(), []);
  const spring = useMemo(() => ({ value: 0 }), []);

  const portalTexture = useTexture(portalImage);

  const GPU = useDetectGPU({ glContext: gl.getContext() });

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
    if (view === 'labEntered' && !leavingIpad) {
      gsap.to(ref.current.material.uniforms.uProgress, {
        value: 1,

        duration: 0.75,
        delay: 0.25,
        ease: Linear.easeOut,
      });
    } else if (leavingIpad) {
      gsap.to(ref.current.material.uniforms.uProgress, {
        value: 0,

        duration: 0.75,
        ease: Linear.easeIn,
      });
    }
  }, [ref, view, leavingIpad]);

  useEffect(() => {
    let aspect =
      viewport.aspect >= 1 ? [viewport.aspect, 1] : [1, 1 / viewport.aspect];

    ref.current.material.uAspect = aspect;
  }, [viewport, ref]);

  useEffect(() => {
    switch (GPU.tier) {
      case 2: {
        ref.current.material.uFbmOctaves = 5;
        break;
      }
      case 3: {
        ref.current.material.uFbmOctaves = 7;
        break;
      }
      default: {
        ref.current.material.uFbmOctaves = 3;
        break;
      }
    }
  }, [GPU, ref]);

  const { hovered } = useSpring({
    hovered: labTextHovered ? 1 : 0,
  });

  useFrame(({ clock, mouse }) => {
    ref.current.material.uTime = clock.elapsedTime;

    ref.current.material.uMouse.lerp(mouse, 0.025);
  });

  return (
    <mesh ref={ref} position={[0, 0, -100]}>
      <planeGeometry args={[2, 2]} />
      {view === 'labEntered' || destination === 'labEntered' ? (
        <AnimLabBackgroundMaterial
          uMouse={[0, 0]}
          uPortalTexture={portalTexture}
          uHovered={hovered}
        />
      ) : (
        <backgroundMaterial uMouse={[0, 0]} />
      )}
    </mesh>
  );
});

export default IpadBackground;
