import useStore from '@/store';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import gsap, { Power4 } from 'gsap';
import { useControls } from 'leva';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { damp } from 'three/src/math/MathUtils';
import IpadBackground from '../IpadBackground';
import { Letters } from './Letters';
import { Starfield } from './Starfield';

const STARTPOS = [1.2, 0, 0.55];

const About = () => {
  const bgRef = useRef();
  const camRef = useRef();
  const worldRef = useRef();

  const introDone = useStore((s) => s.introDone);

  const { spaceColor } = useControls('space', {
    spaceColor: { value: '#1c0d5c' },
  });

  useEffect(() => {
    useStore.setState({ enteringAbout: false, introDone: false });

    camRef.current.position.set(...STARTPOS);
    camRef.current.lookAt(0, 0, 0.5);
  }, []);

  const introAnimation = useCallback(
    (e) => {
      e.stopPropagation();

      if (introDone || gsap.isTweening(camRef.current.position)) return;

      let [x2, y2, z2] = [0, 0, 1.5];

      gsap.to(camRef.current.position, {
        x: x2,
        y: y2,
        z: z2,

        duration: 3.5,
        ease: Power4.easeInOut,
        onUpdate: () => {
          if (camRef.current) {
            camRef.current.lookAt(0, 0, 0.5);
          }
        },
        onComplete: () => {
          useStore.setState({ introDone: true });

          setTimeout(() => {
            let el = document.documentElement;
            let target = document.querySelector('#about section.career');

            if (el.scrollTop === 0 && target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }, 5000);
        },
      });
    },
    [introDone]
  );

  // useFrame(({}, delta) => {
  //   let [x, y, z] = camRef.current.position.toArray();
  //   let [x2, y2, z2] = transitionRef.current;

  //   camRef.current.position.x = damp(x, x2, 0.7, delta);

  //   camRef.current.position.y = damp(y, y2, 0.7, delta);

  //   camRef.current.position.z = damp(z, z2, 0.7, delta);

  //   camRef.current.lookAt(0, 0, 0);
  // });

  return (
    <>
      <PerspectiveCamera
        ref={camRef}
        makeDefault={true}
        near={0.001}
        far={50}
        fov={65}
      />
      {/* <OrbitControls position0={[0, 0, 3]} enablePan={false} /> */}
      <group
        ref={worldRef}
        onClick={(e) => {
          introAnimation(e);
        }}
      >
        <Starfield />
        <Letters />
        <IpadBackground ref={bgRef} noParticles color={spaceColor} />
      </group>

      <EffectComposer multisampling={2}>
        <Bloom
          luminanceThreshold={0.5}
          intensity={1}
          luminanceSmoothing={0.9}
          height={300}
        />
        <Vignette eskil={false} darkness={0.65} />
      </EffectComposer>
    </>
  );
};

export default About;
