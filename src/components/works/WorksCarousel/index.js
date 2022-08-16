import useTextureMaps from '@/hooks/useTextureMaps';
import useWorkAvatar from '@/hooks/useWorkAvatar';
import useStore from '@/store';
import { useSpring } from '@react-spring/three';
import { useFrame, useThree } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import { damp } from 'three/src/math/MathUtils';
import AvatarMaterial from './shaders';
import WorksList from './WorksList';
import NextButton from './NextButton';
import PrevButton from './PrevButton';

const AVATAR_SIZE = 0.08;

const WorksCarousel = () => {
  const avatarRef = useRef();
  const wrapperRef = useRef();
  const { selectedWork, works, nextHovered, prevHovered, transitioningWork } =
    useStore();
  const { size } = useThree();
  const maps = useTextureMaps();

  const curWork = useMemo(() => works[selectedWork], [selectedWork, works]);
  const nextWork = useMemo(
    () => works[(selectedWork + 1) % works.length],
    [selectedWork, works]
  );
  const prevWork = useMemo(
    () => works[selectedWork === 0 ? works.length - 1 : selectedWork - 1],
    [selectedWork, works]
  );

  const avatarTexture = useWorkAvatar(curWork.name);
  const nextAvatarTexture = useWorkAvatar(nextWork.name);
  const prevAvatarTexture = useWorkAvatar(prevWork.name);

  const { leftFactor, rightFactor } = useSpring({
    leftFactor: prevHovered && !transitioningWork ? 1 : 0,
    rightFactor: nextHovered && !transitioningWork ? 1 : 0,
  });

  useFrame(({ clock, mouse }, delta) => {
    avatarRef.current.material.uTime = clock.elapsedTime + 1000.0;

    // let x = avatarRef.current.material.uniforms.uMouse.value[0];
    // avatarRef.current.material.uniforms.uMouse.value[0] = damp(
    //   x,
    //   mouse.x * 0.01,
    //   1,
    //   delta
    // );

    // let y = avatarRef.current.material.uniforms.uMouse.value[1];
    // avatarRef.current.material.uniforms.uMouse.value[1] = damp(
    //   y,
    //   mouse.y * 0.01,
    //   1,
    //   delta
    // );

    wrapperRef.current.rotation.y = damp(
      wrapperRef.current.rotation.y,
      mouse.x * 0.3,
      4,
      delta
    );

    wrapperRef.current.rotation.x = damp(
      wrapperRef.current.rotation.x,
      -mouse.y * 0.3,
      4,
      delta
    );
  });

  return (
    <group position={[0, 0, -0.1]}>
      <group ref={wrapperRef} position-y={-0.01}>
        <mesh
          visible={false}
          onPointerEnter={() => useStore.setState({ workAvatarHovered: true })}
          onPointerLeave={() => useStore.setState({ workAvatarHovered: false })}
        >
          <planeGeometry args={[AVATAR_SIZE, AVATAR_SIZE]} />
        </mesh>
        <points ref={avatarRef}>
          <planeGeometry args={[AVATAR_SIZE, AVATAR_SIZE, 256, 256]} />
          <AvatarMaterial
            uAvatarMap={avatarTexture}
            uNextAvatarMap={nextAvatarTexture}
            uPrevAvatarMap={prevAvatarTexture}
            uParticleMask={maps.particle}
            uAccentColor={curWork.accentColor}
            uPointScale={size.height / 1000}
            uLeft={leftFactor}
            uRight={rightFactor}
          />
        </points>
      </group>

      <Suspense fallback={null}>
        {/* <WorksList /> */}
        {/* <Title /> */}
        {/* <NextButton ref={avatarRef} />
        <PrevButton ref={avatarRef} /> */}
      </Suspense>
    </group>
  );
};

export default WorksCarousel;
