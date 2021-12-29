import React, { useMemo, useRef, useEffect } from 'react';
import { shaderMaterial, useTexture } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import vertexShader from '../shaders/particles/vert.glsl';
import fragmentShader from '../shaders/particles/frag.glsl';
import { Color, Vector3 } from 'three';
import { gsap, Linear, Power4 } from 'gsap';

const ParticleMaterial = shaderMaterial(
  {
    uTime: 0,
    uDpr: 1,
    uTexture: null,
    uTexture2: null,
    uScale: 1,
    uIntersecting: 0,
    uTransition: 0,
    uMouse: [0, 0, 0],
    uAspect: 1,
    uColor: new Color(),
  },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.transparent = true;
    mat.depthTest = false;
    mat.depthWrite = false;
  }
);

extend({ ParticleMaterial });

const WorkBackground = React.memo(({ images, color }) => {
  const ref = useRef();
  const planeRef = useRef();
  const intersectionRef = useRef();
  const transitionRef = useRef();
  const dpr = useThree((state) => state.viewport.dpr);
  const size = useThree((state) => state.size);

  const ripple = useMemo(() => new Vector3(0, 0, 0), []);
  const i = useMemo(() => new Vector3(0, 0, 0), []);
  const imgState = useMemo(
    () => ({ current: null, idx: 0, lastSecond: 0 }),
    []
  );

  const maps = useTexture(images);

  useEffect(() => {
    if (ref.current) {
      ref.current.material.uniforms.uTexture.value = maps[0];
    }
  }, [maps]);

  useEffect(() => {
    intersectionRef.current = gsap
      .timeline({ paused: true })
      .to(ref.current.material.uniforms.uIntersecting, {
        value: 1,

        duration: 0.25,
        ease: Linear.easeInOut,
      });

    return intersectionRef.current.kill();
  }, []);

  useEffect(() => {
    transitionRef.current = gsap
      .timeline({ paused: true })
      .to(ref.current.material.uniforms.uTransition, {
        value: 1,

        duration: 0.5,
        ease: Power4.easeIn,
        onComplete: () => {
          imgState.idx = (imgState.idx + 1) % maps.length;
          let nextImg = maps[imgState.idx];
          ref.current.material.uniforms.uTexture.value = nextImg;
        },
      })
      .to(ref.current.material.uniforms.uTransition, {
        value: 0,

        delay: 0.75,
        duration: 0.5,
        ease: Power4.easeOut,
      });

    return transitionRef.current.kill();
  }, [maps, imgState]);

  const handleIn = (e) => {
    intersectionRef.current.play();
  };

  const handleOut = (e) => {
    intersectionRef.current.reverse();
  };

  const handleMove = (e) => {
    let { x, y, z } = e.point;
    i.set(x, y, z);
  };

  useFrame(({ clock }) => {
    let d = Math.min(1.0, i.distanceTo(ripple));

    ripple.lerp(i, d * 0.2);

    ref.current.material.uniforms.uMouse.value = [ripple.x, ripple.y, ripple.z];
    ref.current.material.uniforms.uTime.value = clock.elapsedTime;

    let sec = Math.floor(clock.elapsedTime);

    if (sec % 7 === 0 && sec > imgState.lastSecond) {
      transitionRef.current.play(0);
      imgState.lastSecond = sec;
    }
  });

  var COUNT = useMemo(() => 512, []),
    COUNT2 = useMemo(() => COUNT / 2, [COUNT]);

  const pos = useMemo(() => [], []);
  const uv = useMemo(() => [], []);
  const speed = useMemo(() => [], []);

  for (let i = 0; i < COUNT; i++) {
    for (let j = 0; j < COUNT; j++) {
      let x = (i - COUNT2) / COUNT;
      let y = (j - COUNT2) / COUNT;

      let u = i / COUNT;
      let v = j / COUNT;

      let s = Math.random() * 0.7 + 0.3;

      pos.push(x, y, 0);
      uv.push(u, v);
      speed.push(s);
    }
  }

  const vertices = useMemo(() => new Float32Array(pos), [pos]);
  const uvs = useMemo(() => new Float32Array(uv), [uv]);
  const speeds = useMemo(() => new Float32Array(speed), [speed]);

  return (
    <>
      <mesh
        ref={planeRef}
        onPointerEnter={(e) => {
          handleIn(e);
        }}
        onPointerLeave={(e) => {
          handleOut(e);
        }}
        onPointerMove={(e) => handleMove(e)}
      >
        <planeGeometry args={[1.1, 1]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      <points ref={ref} scale={[1, 1, 1]}>
        <bufferGeometry>
          <bufferAttribute
            attachObject={['attributes', 'position']}
            array={vertices}
            itemSize={3}
            count={vertices.length / 3}
          />
          <bufferAttribute
            attachObject={['attributes', 'uv']}
            array={uvs}
            itemSize={2}
            count={uvs.length / 2}
          />
          <bufferAttribute
            attachObject={['attributes', 'aSpeed']}
            array={speeds}
            itemSize={1}
            count={speeds.length}
          />
        </bufferGeometry>
        <particleMaterial
          uDpr={dpr}
          uColor={color}
          uScale={Math.min(size.width / 650, size.height / 650)}
        />
      </points>
    </>
  );
});

export default WorkBackground;
