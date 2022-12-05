import { useStore } from '@/store';
import { Image, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import { damp } from 'three/src/math/MathUtils';

const ASPECT = 1; //1368 / 1069;

const WorkImage = ({ imgPath, visible, size, ...props }) => {
  const ref = useRef();
  const transitioning = useStore((s) => s.transitioning);

  useFrame(({ mouse }, delta) => {
    let opacity = visible && !transitioning ? 1 : 0;
    let offsetZ = visible ? -0.1 : -0.05;

    ref.current.material.opacity = damp(
      ref.current.material.opacity,
      opacity,
      10,
      delta
    );
    // ref.current.position.z = damp(ref.current.position.z, offsetZ, 4, delta);
  });

  return (
    <Suspense fallback={null}>
      <group {...props} scale={size}>
        <Image
          ref={ref}
          url={imgPath}
          alt='screenshot of work'
          transparent
          toneMapped={false}
          customDepthMaterial={{ depthTest: false }}
        />
      </group>
    </Suspense>
  );
};

export default WorkImage;
