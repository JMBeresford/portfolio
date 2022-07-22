import { Effects, useTexture } from '@react-three/drei';
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
import useStore from '@/store';
import MacPro from './main/MacPro';

useTexture.preload(useStore.getState().maps);

const Office = () => {
  return (
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
  );
};

export default Office;
