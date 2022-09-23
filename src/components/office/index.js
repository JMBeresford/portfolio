import Socials from './main/Socials';
import About from './shelf/About';
import Works from './shelf/Works';
import Lab from './shelf/Lab';
import MonitorScreen from './desk/MonitorScreen';
import PhoneScreen from './desk/PhoneScreen';
import WallLight from './lights/WallLight';
import Lamp from './lights/Lamp';
import Partition1 from './main/Partition1';
import Partition2 from './main/Partition2';
import MacPro from './main/MacPro';
import { useThree } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import useStore from '@/store';
import Camera from './Camera';
import { useTexture } from '@react-three/drei';

const Office = () => {
  return (
    <>
      <Camera />
      <group>
        <Partition1 />
        <Partition2 />
        <MacPro />

        <Socials />
        <About />
        <Works />
        <Lab />

        <MonitorScreen />
        <PhoneScreen />

        <WallLight />
        <Lamp />
      </group>
    </>
  );
};

export default Office;
