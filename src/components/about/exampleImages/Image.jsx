import { useRef, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import ImageMaterial from './shaders';
import useRandomImage from '@/hooks/useRandomImage';
import { useControls } from 'leva';

const Image = ({ position, aspectRatio }) => {
  const ref = useRef();
  const { viewport } = useThree();

  const texture = useRandomImage();

  const { opacity } = useControls('Images', {
    opacity: { value: 0.5, min: 0, max: 1, step: 0.01 },
  });

  const viewportAspect = useMemo(() => {
    return viewport.aspect >= 1
      ? [viewport.aspect, 1]
      : [1, 1 / viewport.aspect];
  }, [viewport]);

  return (
    <mesh ref={ref} position={position} scale={[0.9, 0.9 / aspectRatio, 0.9]}>
      <planeGeometry args={[1, 1]} />
      <ImageMaterial map={texture} uAspect={viewportAspect} opacity={opacity} />
    </mesh>
  );
};

export default Image;
