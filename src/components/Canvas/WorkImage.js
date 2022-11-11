import { useStore } from '@/store';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useLayoutEffect } from 'react';
import { useRef, Suspense } from 'react';
import { damp } from 'three/src/math/MathUtils';

const ASPECT = 1368 / 1069;

const WorkImage = ({ imagePath, currentImage, hovered, ...props }) => {
  const ref = useRef();
  const transitioning = useStore((s) => s.transitioning);

  const texture = useTexture(imagePath);

  useLayoutEffect(() => {
    ref.current.material.depthWrite = false;
  }, []);

  useFrame(({ mouse }, delta) => {
    let opacity = hovered && currentImage && !transitioning ? 1 : 0;
    let offsetZ = hovered && currentImage ? -0.1 : -0.05;

    ref.current.material.opacity = damp(
      ref.current.material.opacity,
      opacity,
      10,
      delta
    );

    ref.current.position.x = damp(
      ref.current.position.x,
      mouse.x + 1.5,
      4,
      delta
    );
    ref.current.position.y = damp(
      ref.current.position.y,
      mouse.y * 0.1,
      4,
      delta
    );
    ref.current.position.z = damp(ref.current.position.z, offsetZ, 20, delta);
  });

  return (
    <Suspense fallback={null}>
      <group {...props} scale={[0.35, 0.35, 0.35]} renderOrder={100}>
        <mesh ref={ref}>
          <planeGeometry args={[ASPECT, 1]} />
          <meshBasicMaterial
            map={texture}
            opacity={0}
            transparent
            toneMapped={false}
          />
        </mesh>
      </group>
    </Suspense>
  );
};

export default WorkImage;
