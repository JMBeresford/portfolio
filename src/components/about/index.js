import { useAboutStore } from '@/store';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import gsap, { Power2, Power4 } from 'gsap';
import { useControls } from 'leva';
import { KernelSize } from 'postprocessing';
import { useMemo } from 'react';
import { useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { damp } from 'three/src/math/MathUtils';
import shallow from 'zustand/shallow';
import IpadBackground from '../IpadBackground';
import WorksCarousel from '../works/WorksCarousel';
import { Letters } from './constellations/Letters';
import { Starfield } from './Starfield';
import Sections from './Sections';

const STARTPOS = [1.2, 0, 0.55];
const INIT_RADIUS = 1.5;

const About = () => {
  const bgRef = useRef();
  const timeline = useRef(gsap.timeline());
  const scrollRef = useRef(0);
  const camRef = useRef();
  const worldRef = useRef();
  const [introDone, section, lastSection, viewManaged] = useAboutStore(
    (s) => [s.introDone, s.section, s.lastSection, s.viewManaged],
    shallow
  );

  const { spaceColor } = useControls('space', {
    spaceColor: { value: '#4d006c' },
  });

  const { smoothing, threshold, intensity } = useControls('bloom', {
    smoothing: { value: 0.9, min: 0, max: 2 },
    threshold: { value: 0.5, min: 0, max: 1 },
    intensity: { value: 1, min: 0, max: 2 },
  });

  const radius = useMemo(() => (introDone ? 2 : INIT_RADIUS), [introDone]);

  useLayoutEffect(() => {
    useAboutStore.setState({
      introDone: false,
      converged: true,
      section: 0,
      viewManaged: true,
      camera: camRef.current,
      world: worldRef.current,
    });
    camRef.current.position.set(...STARTPOS);
    camRef.current.lookAt(0, 0, 0.5);
  }, []);

  const handleScroll = useCallback(
    (e) => {
      if (!introDone || viewManaged) return;

      scrollRef.current += e.deltaY * 0.00035;
      scrollRef.current = Math.max(0, scrollRef.current);
    },
    [introDone, viewManaged]
  );

  useEffect(() => {
    let [x2, y2, z2] = [0, 0, INIT_RADIUS];

    timeline.current.to(camRef.current.position, {
      x: x2,
      y: y2,
      z: z2,

      duration: 3.5,
      ease: Power4.easeInOut,
      onUpdate: () => {
        camRef.current?.lookAt(0, 0, 0.5);
      },
      onComplete: () => {
        useAboutStore.setState({
          introDone: true,
          converged: false,
          viewManaged: false,
        });
      },
    });
  }, []);

  useFrame(({ clock }, delta) => {
    if (!introDone) return;

    let pz = camRef.current.position.z;
    let rx = worldRef.current.rotation.x;

    camRef.current.position.z = damp(pz, radius, 4, delta);
    worldRef.current.rotation.x = damp(rx, -scrollRef.current, 12, delta);
    bgRef.current.material.uTime = clock.elapsedTime;
  });

  return (
    <>
      <PerspectiveCamera
        ref={camRef}
        makeDefault={true}
        near={0.001}
        far={50}
        fov={65}
      />
      <group ref={worldRef}>
        <Starfield />
        <Letters />
        <Sections />

        <IpadBackground
          ref={bgRef}
          noParticles
          uOctaves={2}
          color={spaceColor}
          onWheel={handleScroll}
        />
      </group>

      <EffectComposer multisampling={2}>
        <Bloom
          luminanceThreshold={threshold}
          intensity={intensity}
          luminanceSmoothing={smoothing}
          height={200}
          kernelSize={KernelSize.SMALL}
        />
        <Vignette eskil={false} darkness={0.65} />
      </EffectComposer>
    </>
  );
};

export default About;
