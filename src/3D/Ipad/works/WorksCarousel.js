import React, { useEffect, useRef, useMemo, useLayoutEffect } from 'react';
import { meshBounds, shaderMaterial, useTexture } from '@react-three/drei';
import useStore from '../../../store';
import { Color, Vector2 } from 'three';
import vertexShader from '../../../shaders/particles/vert.glsl';
import fragmentShader from '../../../shaders/particles/frag.glsl';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { gsap, Linear, Power4 } from 'gsap';
import { useSpring, animated } from '@react-spring/three';

const AvatarMaterial = shaderMaterial(
  {
    uTime: 0,
    uDpr: 1,
    uTexture: null,
    uTextureLeft: null,
    uTextureRight: null,
    uScale: 1,
    uOpen: 0,
    uRight: 0,
    uLeft: 0,
    opacity: 0,
    uOffset: new Vector2(),
    uViewport: new Vector2(),
    uHoveredColor: new Color('red'),
  },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.depthTest = false;
    mat.depthWrite = false;
    mat.transparent = true;
  }
);

extend({ AvatarMaterial }); // R3F extend

const AnimMaterial = animated('avatarMaterial');

useTexture.preload(useStore.getState().avatars);

const WorksCarousel = React.forwardRef((props, ref) => {
  const direction = useRef('left');
  const avatars = useStore.getState().avatars;
  const viewport = useThree((state) => state.viewport);
  const size = useThree((state) => state.size);

  const moveLeft = useStore((state) => state.actions.moveLeft);
  const moveRight = useStore((state) => state.actions.moveRight);
  const resolution = useStore((state) => state.resolution);
  const dragging = useStore((state) => state.dragging);
  const touchStartX = useStore((state) => state.touchStartX);
  const animating = useStore((state) => state.animating);
  const currentWork = useStore((state) => state.currentWork);
  const viewingWork = useStore((state) => state.viewingWork);
  const view = useStore((state) => state.view);
  const destination = useStore((state) => state.destination);
  const leavingIpad = useStore((state) => state.leavingIpad);

  const textures = useTexture(avatars);
  const v1 = useMemo(() => new Vector2(), []);
  const positions = useMemo(
    () => new Float32Array(resolution * resolution * 3),
    [resolution]
  );
  const openedPositions = useMemo(
    () => new Float32Array(resolution * resolution * 3),
    [resolution]
  );
  const uvs = useMemo(
    () => new Float32Array(resolution * resolution * 2),
    [resolution]
  );
  const speeds = useMemo(
    () => new Float32Array(resolution * resolution),
    [resolution]
  );
  const scale = useMemo(() => {
    let minDim = Math.min(size.width, size.height);
    let factor = Math.min(1.0, 1000 / minDim);

    return 5 * factor;
  }, [size]);

  const { opacity, open } = useSpring({
    opacity:
      view === 'worksEntered' &&
      !destination &&
      viewingWork === null &&
      !leavingIpad
        ? 1
        : 0,
    open:
      viewingWork !== null
        ? 1
        : view === 'worksEntered' && !destination && !leavingIpad
        ? 0
        : 1,
    config: { duration: 750 },
  });

  useLayoutEffect(() => {
    useStore.setState({ carousel: ref.current });
  }, [ref]);

  // generate geometry
  useEffect(() => {
    let COUNT = resolution,
      COUNTHALF = COUNT / 2;

    let idx = 0;

    for (let ix = 0; ix < COUNT; ix++) {
      for (let iy = 0; iy < COUNT; iy++) {
        let x = (ix - COUNTHALF) / COUNT;
        let y = (iy - COUNTHALF) / COUNT;

        let ox = (Math.random() - 0.5) * 3.0;
        let oy = (Math.random() - 0.5) * 3.0;
        let oz = Math.random() + 1.0;

        let u = ix / COUNT;
        let v = iy / COUNT;

        let s = Math.random() * 0.7 + 0.3;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = 0;

        openedPositions[idx * 3] = ox;
        openedPositions[idx * 3 + 1] = oy;
        openedPositions[idx * 3 + 2] = oz;

        uvs[idx * 2] = u;
        uvs[idx * 2 + 1] = v;

        speeds[idx] = s;

        idx++;
      }
    }
  }, [resolution, positions, openedPositions, speeds, uvs]);

  // set textures
  useEffect(() => {
    ref.current.material.uniforms.uTexture.value = textures[currentWork];
    ref.current.material.uniforms.uTextureRight.value =
      textures[(currentWork + 1) % textures.length];
    if (currentWork === 0) {
      ref.current.material.uniforms.uTextureLeft.value =
        textures[textures.length - 1];
    } else {
      ref.current.material.uniforms.uTextureLeft.value =
        textures[currentWork - 1];
    }

    ref.current.material.uniforms.uHoveredColor.value.set(
      useStore.getState().works[currentWork].accentColor
    );
  }, [currentWork, textures, ref]);

  useEffect(() => {
    if (!dragging && viewingWork === null) {
      if (ref.current.material.uLeft > 0.3) {
        gsap
          .timeline()
          .to(ref.current.material.uniforms.uLeft, {
            value: 1.0,

            ease: Linear.easeInOut,
            onStart: () => {
              useStore.setState({ animating: true });
            },
            onComplete: () => {
              moveLeft();
              ref.current.material.uLeft = 0;
              ref.current.material.uRight = 1.5;
            },
            duration: 0.25,
          })
          .to(ref.current.material.uniforms.uRight, {
            value: 0,

            ease: Linear.easeOut,
            delay: 0.2,
            onComplete: () => {
              useStore.setState({ animating: false });
            },
            duration: 0.5,
          });
      } else if (ref.current.material.uRight > 0.3) {
        gsap
          .timeline()
          .to(ref.current.material.uniforms.uRight, {
            value: 1.0,

            ease: Linear.easeInOut,
            onStart: () => {
              useStore.setState({ animating: true });
            },
            onComplete: () => {
              moveRight();
              ref.current.material.uRight = 0;
              ref.current.material.uLeft = 1.5;
            },
            duration: 0.25,
          })
          .to(ref.current.material.uniforms.uLeft, {
            value: 0,

            ease: Linear.easeOut,
            delay: 0.2,
            onComplete: () => {
              useStore.setState({ animating: false });
            },
            duration: 0.5,
          });
      } else if (ref.current) {
        if (direction.current === 'left') {
          gsap.to(ref.current.material.uniforms.uLeft, {
            value: 0,

            ease: Power4.easeOut,
            duration: 0.5,
          });
        } else {
          gsap.to(ref.current.material.uniforms.uRight, {
            value: 0,

            ease: Power4.easeOut,
            duration: 0.5,
          });
        }
      }
    }
  }, [dragging, moveLeft, moveRight, ref, viewingWork]);

  // handle increasingly narrow devices
  useLayoutEffect(() => {
    if (size.width < 500) {
      let d = 500 - size.width;
      ref.current.position.z = -5 - 0.05 * d;
    }
  }, [size, ref]);

  useFrame(({ clock, mouse }) => {
    if (view !== 'worksEntered' && destination !== 'worksEntered') return;

    if (dragging && !animating) {
      let dx = mouse.x - touchStartX;

      if (dx < 0) {
        ref.current.material.uLeft = -dx;
        direction.current = 'left';
      } else if (dx > 0) {
        ref.current.material.uRight = dx;
        direction.current = 'right';
      }
    }

    if (ref.current) {
      ref.current.material.uTime = clock.elapsedTime;

      v1.copy(mouse);

      ref.current.material.uOffset.lerp(v1, 0.1);
    }
  });

  return (
    <points
      position={[0, 0, -5]}
      scale={[scale, scale, scale]}
      ref={ref}
      raycast={meshBounds}
      {...props}
    >
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          array={positions}
          itemSize={3}
          count={positions ? positions.length / 3 : 0}
        />
        <bufferAttribute
          attachObject={['attributes', 'aOpenedPosition']}
          array={openedPositions}
          itemSize={3}
          count={openedPositions ? openedPositions.length / 3 : 0}
        />
        <bufferAttribute
          attachObject={['attributes', 'uv']}
          array={uvs}
          itemSize={2}
          count={uvs ? uvs.length / 2 : 0}
        />
        <bufferAttribute
          attachObject={['attributes', 'aSpeed']}
          array={speeds}
          itemSize={1}
          count={speeds ? speeds.length : 0}
        />
      </bufferGeometry>
      <AnimMaterial
        uDpr={viewport.dpr}
        uOpen={open}
        uScale={5 / scale}
        uViewport={[size.width, size.height]}
        opacity={opacity}
      />
    </points>
  );
});

export default WorksCarousel;
