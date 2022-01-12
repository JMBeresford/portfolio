import React, { useRef, useEffect, useMemo } from 'react';
import { Text } from '@react-three/drei';
// import useStore from '../../../store';
import { useFrame, useThree } from '@react-three/fiber';
import { lerp } from 'three/src/math/MathUtils';
import font from '../../../fonts/EBGaramond-Bold.ttf';

const paras =
  "I'm a multi-disciplinary designer and developer that feels most at home in the intersection of computer graphics and web design/development. This portfolio synthesizes the elements of that intersection that I find most appealing and fun!";

const About = (props) => {
  const ref = useRef();
  const paraRef = useRef();

  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  const fontSize = useMemo(
    () => Math.min(0.13, (0.13 * size.width) / 1200),
    [size]
  );

  const maxWidth = useMemo(
    () => Math.min(2.75, size.width / size.height) * 1.5,
    [size]
  );

  useEffect(() => {
    camera.add(ref.current);
  }, [camera]);

  useFrame(({ mouse }) => {
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
    <group {...props} ref={ref} position={[0, 0, -3]}>
      <Text
        ref={paraRef}
        font={font}
        text={paras}
        maxWidth={maxWidth}
        fontSize={fontSize}
        curveRadius={2}
        textAlign='center'
        lineHeight={1.5}
        outlineBlur='10%'
        outlineColor='black'
      />
    </group>
  );
};

export default About;
