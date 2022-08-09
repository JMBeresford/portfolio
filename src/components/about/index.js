import useStore from '@/store';
import { Suspense, useEffect, useRef } from 'react';
import IpadBackground from '../IpadBackground';
import ExampleImages from './exampleImages';

const About = () => {
  const bgRef = useRef();

  useEffect(() => {
    useStore.setState({ enteringAbout: false });
  }, []);

  return (
    <group>
      <Suspense fallback={null}>
        <ExampleImages position={[0, 0, -1.25]} />
      </Suspense>
      <IpadBackground ref={bgRef} color={[1.0, 0.5098, 0.4745]} />
    </group>
  );
};

export default About;
