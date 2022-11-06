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
import { useHomeStore, useStore } from '@/store';
import Camera from './Camera';
import { useEffect } from 'react';

const Office = () => {
  const actions = useHomeStore((s) => s.actions);
  const router = useStore((s) => s.router);
  const prevRoute = useStore((s) => s.prevRoute);

  useEffect(() => {
    if (router) {
      let from;

      switch (prevRoute) {
        case '/about':
          from = 'about';
          break;
        case '/works':
          from = 'works';
          break;
        default:
          from = 'start';
          break;
      }

      actions.init(from);
    }
  }, [router, actions, prevRoute]);

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
