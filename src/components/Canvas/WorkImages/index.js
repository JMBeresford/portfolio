import useFullHeight from '@/hooks/useFullHeight';
import { useHomeStore } from '@/store';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap, { Power0 } from 'gsap';
import { useEffect, useMemo, useRef, useState } from 'react';
import { sRGBEncoding } from 'three';
import { damp } from 'three/src/math/MathUtils';
import WorkImageMaterial from './shaders';

const WorkImages = ({ work, size, ...props }) => {
  const ref = useRef();
  const fullHeight = useFullHeight();
  const world = useHomeStore((s) => s.world);
  const opacityTl = useRef(gsap.timeline());
  const transitionTl = useRef(gsap.timeline({ repeat: -1, repeatDelay: 5 }));
  const selectedWork = useHomeStore((s) => s.selectedWork);
  const [curImgIdx, setCurImgIdx] = useState(0);
  const [nextImgIdx, setNextImgIdx] = useState(1);
  const textures = useTexture(work.images, (ts) => {
    for (let t of ts) {
      t.encoding = sRGBEncoding;
    }
  });

  const imgSize = useMemo(
    () => Math.min(size * 0.9, fullHeight * 0.8),
    [size, fullHeight]
  );

  useEffect(() => {
    let dur = 0.35;
    let delay = selectedWork === work.name ? dur / 2 : 0;
    let opacity = selectedWork === work.name ? 1 : 0;

    opacityTl.current.clear();

    opacityTl.current.to(ref.current.material.uniforms.uOpacity, {
      value: opacity,
      ease: Power0.easeInOut,
      duration: dur,
      delay: delay,
    });
  }, [selectedWork, work]);

  useEffect(() => {
    let dur = 1.5;

    transitionTl.current.clear();

    transitionTl.current.to(ref.current.material.uniforms.uTransition, {
      value: 1,
      ease: Power0.easeOut,
      duration: dur,
      onComplete: () => {
        ref.current.material.uTransition = 0;
        setCurImgIdx((prev) => (prev + 1) % work.images.length);
        setNextImgIdx((prev) => (prev + 1) % work.images.length);
      },
    });
  }, [work]);

  useFrame(({ clock }, delta) => {
    ref.current.material.uTime = clock.elapsedTime;

    if (world) {
      let r = world.rotation.x;

      let opacity = r < -0.1484 ? 1 : 0;

      ref.current.material.uniforms.uScrollOpacity.value = damp(
        ref.current.material.uniforms.uScrollOpacity.value,
        opacity,
        6,
        delta
      );
    }
  });

  return (
    <mesh ref={ref} rotation-y={0.15}>
      <planeGeometry args={[imgSize, imgSize, 15, 15]} />
      <WorkImageMaterial
        uTexture={textures[curImgIdx]}
        uNextTexture={textures[nextImgIdx]}
        uAccentColor={work.accentColor}
      />
    </mesh>
  );
};

export default WorkImages;
