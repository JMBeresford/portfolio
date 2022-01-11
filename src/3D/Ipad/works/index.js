import React, { useRef, useLayoutEffect } from 'react';
import WorksCarousel from './WorksCarousel';
import Title from './Title';
import useStore from '../../../store';
import { useThree } from '@react-three/fiber';

const Works = (props) => {
  const ref = useRef();
  const carouselRef = useRef();
  const titleRef = useRef();

  const camera = useThree((state) => state.camera);

  const pointerType = useStore((state) => state.pointerType);

  useLayoutEffect(() => {
    camera.add(ref.current);
  }, [camera, ref, pointerType]);

  return (
    <group ref={ref} {...props}>
      <Title ref={titleRef} />
      <WorksCarousel ref={carouselRef} />
    </group>
  );
};

export default Works;
