import { useHomeStore, useStore } from '@/store';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import gsap, { Power4 } from 'gsap';
import { useControls } from 'leva';
import { useMemo } from 'react';
import { useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { damp } from 'three/src/math/MathUtils';
import shallow from 'zustand/shallow';
import { Constellation } from '../Environment/Constellation';
import Environment, { Starfield, Clouds } from '../Environment';
import Sections from './Sections';
import PostProcessing from '../PostProcessing';

const STARTPOS = [1.2, 0, 0.55];
const INIT_RADIUS = 1.5;

const HomeScene = () => {
  const timeline = useRef(gsap.timeline());
  const scrollRef = useRef(0);
  const touchRef = useRef(0);
  const camRef = useRef();
  const worldRef = useRef();
  const size = useThree((s) => s.size);
  const [introDone, viewManaged] = useHomeStore(
    (s) => [s.introDone, s.viewManaged],
    shallow
  );

  const isMobile = useMemo(() => size.width < 768, [size]);
  const radius = useMemo(
    () => (introDone ? (isMobile ? 2.25 : 2) : INIT_RADIUS),
    [introDone, isMobile]
  );

  useLayoutEffect(() => {
    if (introDone) return;

    useHomeStore.setState({
      camera: camRef.current,
      world: worldRef.current,
    });

    camRef.current.position.set(...STARTPOS);
    camRef.current.lookAt(0, 0, 0.5);
  }, [introDone]);

  useEffect(() => {
    useStore.setState({ transitioning: false });
  }, []);

  const handleScroll = useCallback(
    (e) => {
      e.stopPropagation();
      if (!introDone || viewManaged) return;

      scrollRef.current += e.deltaY * 0.00035;
      scrollRef.current = Math.max(0, scrollRef.current);
      scrollRef.current = Math.min(0.6, scrollRef.current);
    },
    [introDone, viewManaged]
  );

  useEffect(() => {
    const handleTouchStart = (e) => {
      e.stopPropagation();
      let touch = e.touches[0];
      touchRef.current = touch.clientY;
    };

    const handleTouchMove = (e) => {
      e.stopPropagation();
      e.preventDefault();
      let touch = e.touches[0];
      let dy = touchRef.current - touch.clientY;
      scrollRef.current += dy * 0.00095;
      scrollRef.current = Math.max(0, scrollRef.current);
      scrollRef.current = Math.min(0.6, scrollRef.current);
      touchRef.current = touch.clientY;
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    if (introDone) return;

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
        useHomeStore.setState({
          introDone: true,
          converged: false,
          viewManaged: false,
        });
      },
    });
  }, [introDone]);

  useFrame(({ mouse }, delta) => {
    if (!introDone) return;

    let pz = camRef.current.position.z;
    let rx = worldRef.current.rotation.x;

    camRef.current.position.z = damp(pz, radius, 4, delta);
    worldRef.current.rotation.x = damp(rx, -scrollRef.current, 16, delta);

    if (isMobile) return;

    camRef.current.rotation.x = damp(
      camRef.current.rotation.x,
      mouse.y * 0.05,
      8,
      delta
    );

    camRef.current.rotation.y = damp(
      camRef.current.rotation.y,
      -mouse.x * 0.05,
      8,
      delta
    );
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
        <Sections />
        <Environment onWheel={handleScroll} />
      </group>

      <PostProcessing />
    </>
  );
};

export default HomeScene;
