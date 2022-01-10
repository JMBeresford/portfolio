import React, { useRef, useLayoutEffect } from 'react';
import WorksCarousel from './WorksCarousel';
import WorkImages from './WorkImages';
import Title from './Title';
import useStore from '../../../store';
import { useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

// preload all textures
for (let work of useStore.getState().works) {
  useTexture.preload(work.images);
}

const Works = (props) => {
  const ref = useRef();
  const carouselRef = useRef();
  const titleRef = useRef();

  const camera = useThree((state) => state.camera);

  const pointerType = useStore((state) => state.pointerType);
  const works = useStore((state) => state.works);
  const currentWork = useStore((state) => state.currentWork);

  useLayoutEffect(() => {
    camera.add(ref.current);
  }, [camera, ref, pointerType]);

  return (
    <group ref={ref} {...props}>
      <Title ref={titleRef} />
      <WorksCarousel ref={carouselRef} />
      {React.Children.toArray(
        works.map((work, idx) => (
          <WorkImages work={work} idx={idx} visible={idx === currentWork} />
        ))
      )}
    </group>
  );
};

export default Works;
