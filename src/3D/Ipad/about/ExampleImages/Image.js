import { useTexture } from '@react-three/drei';
import { useRef } from 'react';
import { animated, useSpring } from '@react-spring/three';
import useStore from '../../../../store';

const Image = ({ size, url, position, opacity }) => {
  const ref = useRef();

  const view = useStore((state) => state.view);
  const leavingIpad = useStore((state) => state.leavingIpad);

  const texture = useTexture(url);

  const { scale } = useSpring({
    scale: view === 'aboutEntered' && !leavingIpad ? [1, 1, 1] : [0, 0, 0],
  });

  return (
    <animated.mesh ref={ref} position={position} scale={scale}>
      <planeGeometry args={[size.width * 0.85, size.height * 0.85]} />
      <animated.meshBasicMaterial
        transparent={true}
        map={texture}
        opacity={opacity}
      />
    </animated.mesh>
  );
};

export default Image;
