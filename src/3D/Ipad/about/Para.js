import React, { useRef, useMemo } from 'react';
import { Text } from '@react-three/drei';
import useStore from '../../../store';
import { useFrame, useThree } from '@react-three/fiber';
import { lerp } from 'three/src/math/MathUtils';
import font from '../../../fonts/EBGaramond-Bold.ttf';
import { useSpring, animated } from '@react-spring/three';

const paras =
  "I'm a multi-disciplinary designer and developer that feels most at home in the intersection of computer graphics and web design/development. This portfolio synthesizes the elements of that intersection that I find most appealing and fun!";

const AnimText = animated(Text);

const Para = (props) => {
  const ref = useRef();
  const paraRef = useRef();

  const size = useThree((state) => state.size);

  const view = useStore((state) => state.view);
  const destination = useStore((state) => state.destination);
  const animating = useStore((state) => state.animating);
  const leavingIpad = useStore((state) => state.leavingIpad);
  const mobile = useStore((state) => state.mobile);
  const pointerType = useStore((state) => state.pointerType);

  const fontSize = useMemo(
    () => Math.max(Math.min(0.13, (0.13 * size.width) / 1200), 0.08),
    [size]
  );

  const maxWidth = useMemo(
    () => Math.max(Math.min(2.75, size.width / size.height) * 1.5, 1.2),
    [size]
  );

  const { opacity, scale } = useSpring({
    opacity:
      view === 'aboutEntered' && !destination && !animating && !leavingIpad
        ? 1.0
        : 0,
    scale: view === 'aboutEntered' && !leavingIpad ? 1 : 0,
  });

  useFrame(({ mouse }) => {
    if (mobile || pointerType === 'touch') {
      return;
    }

    let x = mouse.x * 0.25;
    let y = mouse.y * 0.25;

    paraRef.current.position.x = lerp(paraRef.current.position.x, x, 0.1);
    paraRef.current.position.y = lerp(paraRef.current.position.y, y, 0.1);

    let vx = x - paraRef.current.position.x;
    let vy = y - paraRef.current.position.y;

    paraRef.current.scale.x = lerp(paraRef.current.scale.x, 1 + vx, 0.1);
    paraRef.current.scale.y = lerp(paraRef.current.scale.y, 1 + vy, 0.1);
  });

  return (
    <animated.group
      {...props}
      ref={ref}
      position={[0, 0, -3]}
      scale-x={scale}
      scale-y={scale}
    >
      <AnimText
        ref={paraRef}
        font={font}
        text={paras}
        maxWidth={maxWidth}
        fontSize={fontSize}
        fillOpacity={opacity}
        outlineOpacity={opacity}
        curveRadius={2}
        textAlign='center'
        lineHeight={1.5}
        outlineBlur='10%'
        outlineColor='black'
      />
    </animated.group>
  );
};

export default Para;
