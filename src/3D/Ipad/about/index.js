import React, { useEffect, useRef } from 'react';
import Para from './Para';
import Name from './Name';
import { useThree } from '@react-three/fiber';
import ExampleImages from './ExampleImages';

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
      <ExampleImages position={[0, 0, -4]} visible={props.visible} />
    </group>
  );
};

export default About;
