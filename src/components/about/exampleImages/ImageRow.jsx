import { useFrame } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import Image from './Image';

const LENGTH = 10;
const CELL_SIZE = 1;
const ASPECT = 1368 / 1069;

const ImageRow = ({ align }) => {
  const ref = useRef();

  var direction = useMemo(() => (align === 'middle' ? 1 : -1), [align]);

  const verticalPos = useMemo(() => {
    if (align === 'top') {
      return CELL_SIZE / ASPECT;
    } else if (align === 'bottom') {
      return -CELL_SIZE / ASPECT;
    } else {
      return 0;
    }
  }, [align]);

  const images = useMemo(() => {
    const arr = new Array(LENGTH);

    for (let i = 0; i < LENGTH; i++) {
      arr[i] = (
        <Image
          aspectRatio={ASPECT}
          position={[-0.5 * LENGTH + i * CELL_SIZE, 0, 0]}
        />
      );
    }

    return arr;
  }, []);

  useFrame(({ clock }) => {
    ref.current.position.x =
      (Math.sin(clock.elapsedTime * 0.025) * direction * LENGTH) / 4;
  });

  return (
    <group ref={ref} position-y={verticalPos}>
      {React.Children.toArray(images)}
    </group>
  );
};

export default ImageRow;
