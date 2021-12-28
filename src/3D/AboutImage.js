import React, { useEffect, useMemo, useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { shaderMaterial, useTexture } from '@react-three/drei';
import img from '../img/me.jpeg';
import vertexShader from '../shaders/aboutimage/vert.glsl';
import fragmentShader from '../shaders/aboutimage/frag.glsl';
import { RGBFormat, Vector3 } from 'three';
import { gsap, Power1 } from 'gsap';

const ImageMaterial = shaderMaterial(
  { uTexture: null, uMouse: [0, 0, 0], uIntersecting: 0, uTime: 0 },
  vertexShader,
  fragmentShader
);

extend({ ImageMaterial });

const AboutImage = React.memo(() => {
  const ref = useRef();
  const intersectionRef = useRef();
  const ripple = useMemo(() => new Vector3(0, 0, 0), []);
  const i = useMemo(() => new Vector3(0, 0, 0), []);

  useEffect(() => {
    intersectionRef.current = gsap
      .timeline({ paused: true })
      .to(ref.current.material.uniforms.uIntersecting, {
        value: 1,

        duration: 0.25,
        ease: Power1.easeInOut,
      });

    return () => {
      if (intersectionRef.current && intersectionRef.current.kill) {
        intersectionRef.current.kill();
      }
    };
  }, []);

  const handleIn = (e) => {
    if (intersectionRef.current && intersectionRef.current.play) {
      intersectionRef.current.play();
    }
  };

  const handleOut = (e) => {
    if (intersectionRef.current && intersectionRef.current.reverse) {
      intersectionRef.current.reverse();
    }
  };

  const handleMove = (e) => {
    let { x, y, z } = e.point;
    i.set(x, y, z);
  };

  useFrame(({ clock }) => {
    let d = Math.min(1.0, i.distanceTo(ripple));

    ripple.lerp(i, d);

    ref.current.material.uniforms.uMouse.value = [ripple.x, ripple.y, ripple.z];
    ref.current.material.uniforms.uTime.value = clock.elapsedTime;
  });

  const map = useTexture(img);
  map.format = RGBFormat;

  return (
    <>
      <mesh
        rotation={[0, -0.1, 0]}
        onPointerEnter={(e) => {
          handleIn(e);
        }}
        onPointerLeave={(e) => {
          handleOut(e);
        }}
        onPointerMove={(e) => handleMove(e)}
      >
        <planeGeometry args={[2.5, 2.5]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      <mesh ref={ref} rotation={[0, -0.1, 0]}>
        <planeGeometry args={[2, 2, 50, 50]} />
        <imageMaterial uTexture={map} />
      </mesh>
    </>
  );
});

export default AboutImage;
