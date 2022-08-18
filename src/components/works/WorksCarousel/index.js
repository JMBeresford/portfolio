import useTextureMaps from "@/hooks/useTextureMaps";
import useWorkAvatar from "@/hooks/useWorkAvatar";
import useStore from "@/store";
import { useSpring } from "@react-spring/three";
import { meshBounds, useCursor } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap, { Power2 } from "gsap";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Vector2, Vector3 } from "three";
import { damp } from "three/src/math/MathUtils";
import AvatarMaterial from "./shaders";

const AVATAR_SIZE = 0.08;

const WorksCarousel = () => {
  const avatarRef = useRef();
  const wrapperRef = useRef();
  const pointRef = useRef(new Vector3(0, 0, -0.1));
  const pointer = useRef(new Vector2(0, 0));
  const tl = useRef(gsap.timeline());

  const {
    selectedWork,
    works,
    prevSelectedWork,
    transitioningWork,
    workAvatarHovered,
  } = useStore();
  const { size } = useThree();
  const maps = useTextureMaps();
  const [workId, setWorkId] = useState(selectedWork || 0);

  const curWork = useMemo(() => works[workId], [workId, works]);

  const avatarTexture = useWorkAvatar(curWork.name);

  const { intersecting } = useSpring({
    intersecting: workAvatarHovered ? 1 : 0,
  });

  useCursor(workAvatarHovered);

  useEffect(() => {
    if (prevSelectedWork === null || prevSelectedWork === selectedWork) return;

    tl.current.kill();

    let toAnimate = avatarRef.current.material.uniforms.uTransition;

    tl.current
      .to(toAnimate, {
        value: 1,

        duration: 1,
        ease: Power2.easeIn,
        onStart: () => {
          useStore.setState({ transitioningWork: true });
        },
        onComplete: () => {
          setWorkId(selectedWork);
        },
      })
      .to(toAnimate, {
        value: 0,

        duration: 1,
        ease: Power2.easeOut,
        onComplete: () => {
          useStore.setState({ transitioningWork: false });
        },
      });
  }, [selectedWork, prevSelectedWork, setWorkId]);

  const handlePointerMove = useCallback(
    (e) => {
      if (!workAvatarHovered || !e.point) return;

      pointRef.current.copy(e.point);
    },
    [workAvatarHovered]
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      pointer.current.set(
        (e.clientX / window.innerWidth) * 2 - 1.0,
        -((e.clientY / window.innerHeight) * 2 - 1.0)
      );
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(({ clock, camera }, delta) => {
    avatarRef.current.material.uTime = clock.elapsedTime + 1000.0;

    let [x, y, z] = avatarRef.current.material.uIntersect;

    avatarRef.current.material.uniforms.uIntersect.value.set(
      damp(x, pointRef.current.x, 4, delta),
      damp(y, pointRef.current.y, 4, delta),
      damp(z, pointRef.current.z, 4, delta)
    );

    camera.rotation.x = damp(
      camera.rotation.x,
      pointer.current.y * 0.1,
      4,
      delta
    );
    camera.rotation.y = damp(
      camera.rotation.y,
      -pointer.current.x * 0.1,
      4,
      delta
    );

    // wrapperRef.current.rotation.y = damp(
    //   wrapperRef.current.rotation.y,
    //   pointer.current.x * 0.3,
    //   4,
    //   delta
    // );

    // wrapperRef.current.rotation.x = damp(
    //   wrapperRef.current.rotation.x,
    //   -pointer.current.y * 0.3,
    //   4,
    //   delta
    // );
  });

  return (
    <group position={[0, 0, -0.09]}>
      <group ref={wrapperRef}>
        <mesh
          visible={false}
          onPointerEnter={() => useStore.setState({ workAvatarHovered: true })}
          onPointerLeave={() => useStore.setState({ workAvatarHovered: false })}
          onPointerMove={(e) => handlePointerMove(e)}
        >
          <planeGeometry args={[AVATAR_SIZE, AVATAR_SIZE]} />
        </mesh>
        <points ref={avatarRef} raycast={meshBounds}>
          <planeGeometry args={[AVATAR_SIZE, AVATAR_SIZE, 256, 256]} />
          <AvatarMaterial
            uAvatarMap={avatarTexture}
            uParticleMask={maps.particle}
            uAccentColor={curWork.accentColor}
            uPointScale={size.height / 8000}
            uIntersecting={intersecting}
          />
        </points>
      </group>
    </group>
  );
};

export default WorksCarousel;
