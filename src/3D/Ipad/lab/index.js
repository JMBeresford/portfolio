import { useRef, useLayoutEffect } from 'react';
import { Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import font from '../../../fonts/EBGaramond-Bold.ttf';
import { useSpring, animated } from '@react-spring/three';
import useStore from '../../../store';

const AnimText = animated(Text);

const Lab = (props) => {
  const ref = useRef();

  const camera = useThree((state) => state.camera);
  const viewport = useThree((state) => state.viewport);

  const view = useStore((state) => state.view);
  const destination = useStore((state) => state.destination);
  const animating = useStore((state) => state.animating);
  const leavingIpad = useStore((state) => state.leavingIpad);

  const { opacity, outlineOpacity } = useSpring({
    opacity:
      view === 'labEntered' && !destination && !animating && !leavingIpad
        ? 1
        : 0,
    outlineOpacity:
      view === 'labEntered' && !destination && !animating && !leavingIpad
        ? 0.5
        : 0,
    config: {
      duration: view === 'labEntered' && animating ? 200 : 500,
    },
  });

  useLayoutEffect(() => {
    camera.add(ref.current);
  }, [camera, ref]);

  return (
    <group ref={ref} {...props}>
      <AnimText
        font={font}
        textAlign='center'
        maxWidth={Math.min(0.2 * viewport.width, 2.3)}
        position={[0, 0.25, -2]}
        outlineColor='black'
        outlineBlur='12%'
        fillOpacity={opacity}
        outlineOpacity={outlineOpacity}
      >
        The Lab contains 'bite-sized' experiments rather than full, professional
        projects.
      </AnimText>
    </group>
  );
};

export default Lab;
