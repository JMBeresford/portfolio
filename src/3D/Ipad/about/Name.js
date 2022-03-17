import React, { useRef } from 'react';
import { Text } from '@react-three/drei';
import font from '../../../fonts/EBGaramond-Bold.ttf';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import useStore from '../../../store';

const AnimText = animated(Text);

const Name = (props) => {
  const ref1 = useRef();
  const ref2 = useRef();

  const view = useStore((state) => state.view);
  const destination = useStore((state) => state.destination);
  const animating = useStore((state) => state.animating);
  const leavingIpad = useStore((state) => state.leavingIpad);

  const { opacity } = useSpring({
    opacity:
      view === 'aboutEntered' && !destination && !animating && !leavingIpad
        ? 0.075
        : 0,
  });

  useFrame(({ clock }) => {
    ref1.current.position.x = -0.55 + Math.cos(clock.elapsedTime * 0.12) * 0.2;
    ref1.current.position.y = 0.9 + Math.sin(clock.elapsedTime * -0.24) * 0.2;

    ref2.current.position.x = -0.85 + Math.cos(clock.elapsedTime * -0.14) * 0.2;
    ref2.current.position.y = 0.9 + Math.sin(clock.elapsedTime * 0.21) * 0.2;
  });

  return (
    <group {...props}>
      <AnimText
        ref={ref1}
        text='John'
        anchorX={'right'}
        font={font}
        color={[0.8, 0.8, 0.8]}
        fontSize={0.65}
        fillOpacity={opacity}
        position={[-0.55, 0.9, -3]}
      />
      <AnimText
        ref={ref2}
        text='Beresford'
        anchorX={'left'}
        font={font}
        color={[0.8, 0.8, 0.8]}
        fontSize={0.65}
        fillOpacity={opacity}
        position={[-0.85, 0.9, -3]}
      />
    </group>
  );
};

export default Name;