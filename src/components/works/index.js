import { useWorksStore } from '@/store';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
import { Color } from 'three';
import { damp } from 'three/src/math/MathUtils';
import shallow from 'zustand/shallow';
import { Starfield } from '../about/Starfield';
import IpadBackground from '../IpadBackground';
import WorksCarousel from './WorksCarousel';

const tempCol = new Color();

const Works = () => {
  const bgRef = useRef();
  const [works, selectedWork] = useWorksStore(
    (s) => [s.works, s.selectedWork],
    shallow
  );

  const color = useMemo(() => {
    let c = tempCol.setStyle(works[selectedWork].color);

    return c;
  }, [selectedWork, works]);

  useFrame((state, delta) => {
    let { r, g, b } = bgRef.current.material.uniforms.uColor.value;

    r = damp(r, color.r, 1, delta);
    g = damp(g, color.g, 1, delta);
    b = damp(b, color.b, 1, delta);

    bgRef.current.material.uniforms.uColor.value.setRGB(r, g, b);
  });

  return (
    <group>
      <PerspectiveCamera makeDefault={true} near={0.001} far={50} fov={65} />
      <WorksCarousel />
      <Starfield />
      <IpadBackground ref={bgRef} />
    </group>
  );
};

export default Works;
