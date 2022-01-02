import React, { useEffect, useRef, useMemo } from 'react';
import { shaderMaterial, useTexture, useDetectGPU } from '@react-three/drei';
import useStore from '../store';
import { Color, Vector2, Vector3 } from 'three';
import vertexShader from '../shaders/particles/vert.glsl';
import fragmentShader from '../shaders/particles/frag.glsl';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { gsap, Linear, Power4 } from 'gsap';

const AvatarMaterial = shaderMaterial(
  {
    uTime: 0,
    uDpr: 1,
    uTexture: null,
    uTextureLeft: null,
    uTextureRight: null,
    uScale: 1,
    uSpring: 0,
    uIntersecting: 0,
    uRight: 0,
    uLeft: 0,
    uMouse: [0, 0, 0],
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

extend({ AvatarMaterial });

const WorksCarousel = React.forwardRef((props, ref) => {
  const direction = useRef('left');
  const avatars = useStore.getState().avatars;
  const viewport = useThree((state) => state.viewport);
  const size = useThree((state) => state.size);
  const GPUTier = useDetectGPU();

  const initAttributes = useStore((state) => state.actions.initAttributes);
  const moveLeft = useStore((state) => state.actions.moveLeft);
  const moveRight = useStore((state) => state.actions.moveRight);
  const resolution = useStore((state) => state.resolution);
  const positions = useStore((state) => state.positions);
  const uvs = useStore((state) => state.uvs);
  const speeds = useStore((state) => state.speeds);
  const dragging = useStore((state) => state.dragging);
  const touchStartX = useStore((state) => state.touchStartX);
  const animating = useStore((state) => state.animating);
  const currentWork = useStore((state) => state.currentWork);
  const view = useStore((state) => state.view);
  const destination = useStore((state) => state.destination);

  const textures = useTexture(avatars);
  const i = useMemo(() => new Vector3(0, 0, 0), []);
  const v1 = useMemo(() => new Vector3(), []);
  const v2 = useMemo(() => new Vector3(), []);

  // animation handlers
  const intersectingTl = useRef();
  useEffect(() => {
    intersectingTl.current = gsap
      .timeline({ paused: true })
      .to(ref.current.material.uniforms.uIntersecting, {
        value: 1,

        ease: Linear.easeInOut,
        duration: 0.75,
      });

    return () => {
      if (intersectingTl.current && intersectingTl.current.kill) {
        intersectingTl.current.kill();
      }
    };
  }, [ref]);

  // generate geometry
  useEffect(() => {
    let res = GPUTier.tier * 256;
    initAttributes(res);
  }, [resolution, initAttributes, GPUTier]);

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

  // event handlers
  const handleEnter = (e) => {
    if (
      !dragging &&
      !animating &&
      intersectingTl.current &&
      intersectingTl.current.play
    ) {
      intersectingTl.current.play();
    }
  };

  const handleExit = (e) => {
    if (!dragging && intersectingTl.current && intersectingTl.current.reverse) {
      intersectingTl.current.reverse();
    }
  };

  const handleMove = (e) => {
    let { x, y, z } = e.point;
    i.set(x, y, z);
  };

  const handleDown = (e) => {
    let x = (e.clientX / window.innerWidth) * 2.0 - 1.0;
    useStore.setState({ touchStartX: x, dragging: true });

    if (intersectingTl.current && intersectingTl.current.reverse) {
      intersectingTl.current.reverse();
    }
  };

  const handleUp = (e) => {
    useStore.setState({ dragging: false });

    if (ref.current.material.uLeft > 0.3) {
      intersectingTl.current.reverse();

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
            ref.current.material.uRight = 1.0;
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
      intersectingTl.current.reverse();

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
            ref.current.material.uLeft = 1.0;
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
  };

  useFrame(({ clock, mouse }) => {
    if (view !== 'worksEntered' || destination) return;

    if (dragging && !animating) {
      let dx = mouse.x - touchStartX;
      if (dx < 0) {
        ref.current.material.uLeft = -dx;
        direction.current = 'left';
      } else {
        ref.current.material.uRight = dx;
        direction.current = 'right';
      }
    }

    if (ref.current) {
      ref.current.material.uniforms.uMouse.value = [i.x, i.y, i.z];
      ref.current.material.uTime = clock.elapsedTime;

      v1.set(-mouse.y * 0.2, mouse.x * 0.2, 0);
      ref.current.rotation.toVector3(v2);

      let delta = Math.min(v2.distanceTo(v1) * 10.0, 1.0);

      v2.lerp(v1, 1.2 - delta);
      ref.current.rotation.setFromVector3(v2, 'YXZ');
    }
  });

  return (
    <>
      <mesh
        onPointerMove={(e) => handleMove(e)}
        onPointerDown={(e) => handleDown(e)}
        onPointerUp={(e) => handleUp(e)}
      >
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      <mesh
        onPointerEnter={(e) => handleEnter(e)}
        onPointerLeave={(e) => handleExit(e)}
        onPointerMove={() => {
          if (
            !dragging &&
            intersectingTl.current &&
            intersectingTl.current.play
          ) {
            intersectingTl.current.play();
          }
        }}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      <points ref={ref} raycast={null}>
        <bufferGeometry>
          <bufferAttribute
            attachObject={['attributes', 'position']}
            array={positions}
            itemSize={3}
            count={positions ? positions.length / 3 : 0}
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
        <avatarMaterial
          uDpr={viewport.dpr}
          uScale={Math.min(size.width / 650, size.height / 650)}
          uViewport={[size.width, size.height]}
        />
      </points>
    </>
  );
});
export default WorksCarousel;
