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
import Layer from '../Layer';

const STARTPOS = [1.2, 0, 0.55];
const INIT_RADIUS = 1.5;

const HomeScene = () => {
  const timeline = useRef(gsap.timeline());
  const scrollRef = useRef(0);
  const velocityRef = useRef(0);
  const velocitySmoothRef = useRef(0);
  const touchRef = useRef(0);
  const camRef = useRef();
  const worldRef = useRef();
  const size = useThree((s) => s.size);
  const [introDone, viewManaged] = useHomeStore(
    (s) => [s.introDone, s.viewManaged],
    shallow
  );

  const aspect = useMemo(() => size.width / size.height, [size]);
  const isMobile = useMemo(() => size.width < 768, [size]);
  const radius = useMemo(() => {
    if (!introDone) return INIT_RADIUS;
    else {
      return 2;
    }
  }, [introDone]);

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
      if (!introDone || viewManaged) return;

      scrollRef.current += e.deltaY * 0.00035;

      if (scrollRef.current < 0) {
        scrollRef.current = 0;
        return;
      }

      // scrollRef.current = Math.min(0.6, scrollRef.current);

      velocityRef.current += Math.abs(e.deltaY * 0.00005);
      velocityRef.current = Math.max(1);
    },
    [introDone, viewManaged]
  );

  const handleTouchStart = useCallback(
    (e) => {
      e.stopPropagation();
      if (!introDone || viewManaged || e.pointerType !== 'touch') return;

      let y = e.touches ? e.touches[0].clientY : e.clientY;
      touchRef.current = y;
    },
    [introDone, viewManaged]
  );

  const handleTouchMove = useCallback(
    (e) => {
      e.stopPropagation();
      if (!introDone || viewManaged || e.pointerType !== 'touch') return;

      let y = e.touches ? e.touches[0].clientY : e.clientY;

      let dy = touchRef.current - y;

      velocityRef.current += Math.abs(dy * 0.00005);
      velocityRef.current = Math.max(1);

      scrollRef.current += dy * 0.00095;
      scrollRef.current = Math.max(0, scrollRef.current);
      // scrollRef.current = Math.min(0.6, scrollRef.current);
      touchRef.current = y;
    },
    [introDone, viewManaged]
  );

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

    velocitySmoothRef.current = damp(
      velocitySmoothRef.current,
      velocityRef.current,
      16,
      delta
    );
    velocityRef.current = damp(velocityRef.current, 0, 24, delta);

    camRef.current.position.z = damp(
      pz,
      radius + velocitySmoothRef.current / 35,
      4,
      delta
    );
    worldRef.current.rotation.x = damp(rx, -scrollRef.current, 12, delta);

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
        <Environment
          onWheel={handleScroll}
          onPointerMove={handleTouchMove}
          onPointerDown={handleTouchStart}
        />
      </group>

      <PostProcessing />
    </>
  );
};

export default HomeScene;
