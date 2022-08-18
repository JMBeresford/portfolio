import useStore from '@/store';
import { events, useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
import { Color } from 'three';
import { damp } from 'three/src/math/MathUtils';
import IpadBackground from '../IpadBackground';
import WorksCarousel from './WorksCarousel';

const tempCol = new Color();

const Works = () => {
  const bgRef = useRef();
  const { works, selectedWork } = useStore();

  useEffect(() => {
    useStore.setState({ enteringWorks: false });
  }, []);

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
      <WorksCarousel />
      <IpadBackground ref={bgRef} />
    </group>
  );
};

export default Works;
