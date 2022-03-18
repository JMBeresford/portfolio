import React, { useEffect, useRef } from 'react';
import Para from './Para';
import Name from './Name';
import FloatingItems from './FloatingItems';
import { useThree } from '@react-three/fiber';

const About = (props) => {
  const ref = useRef();
  const camera = useThree((state) => state.camera);

  useEffect(() => {
    camera.add(ref.current);
  }, [camera]);

  return (
    <group ref={ref}>
      <Para visible={props.visible} />
      <Name visible={props.visible} />
      <FloatingItems visible={props.visible} position={[0, 0, -3.5]} />
    </group>
  );
};

export default About;
