import { useHomeStore, useStore } from '@/store';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import { useRef, useEffect, useLayoutEffect } from 'react';
import { damp } from 'three/src/math/MathUtils';
import Environment from '../Environment';
import PostProcessing from '../PostProcessing';
import WorksList from './WorksList';

const WorksScene = () => {
  const camRef = useRef();
  const size = useThree((s) => s.size);

  const isMobile = useMemo(() => size.width < 768, [size]);

  useLayoutEffect(() => {
    useHomeStore.setState({ converged: false });
  }, []);

  useEffect(() => {
    useStore.setState({ transitioning: false });
  }, []);

  useFrame(({ mouse }, delta) => {
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
    <group>
      <PerspectiveCamera
        ref={camRef}
        makeDefault={true}
        near={0.001}
        far={50}
        fov={65}
        position={[0, 0, isMobile ? 2.25 : 2]}
      />

      <WorksList />

      <Environment />
      <PostProcessing />
    </group>
  );
};

export default WorksScene;
