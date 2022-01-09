import React, { useRef, useLayoutEffect } from 'react';
import WorksCarousel from './WorksCarousel';
import WorkImages from './WorkImages';
import Title from './Title';
import useStore from '../../../store';
import { useThree } from '@react-three/fiber';

const Works = () => {
  const ref = useRef();
  const carouselRef = useRef();
  const titleRef = useRef();
  const imagesRef = useRef();

  const camera = useThree((state) => state.camera);

  const pointerType = useStore((state) => state.pointerType);

  useLayoutEffect(() => {
    camera.add(ref.current);
  }, [camera, ref, pointerType]);

  return (
    <group ref={ref}>
      <Title ref={titleRef} />
      <WorksCarousel ref={carouselRef} />
      <WorkImages ref={imagesRef} />
    </group>
  );
};

export default Works;
