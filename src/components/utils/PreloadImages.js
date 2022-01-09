import React from 'react';
import { useTexture } from '@react-three/drei';
import useStore from '../../store';

const PreloadImages = () => {
  const works = useStore((state) => state.works);

  useTexture.preload(works[0].images);
  useTexture.preload(works[1].images);
  useTexture.preload(works[2].images);

  return <> </>;
};

export default PreloadImages;
