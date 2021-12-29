import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import useStore from '../store';
import Model from './Beresford_design';
import Camera from '../components/Camera';
import Controls from '../components/Controls';
import { Stats } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';
import Cursor from '../components/Cursor';
import { ACESFilmicToneMapping } from 'three';

const DisableRender = () => useFrame(() => null, 1000);

const Experience = React.memo(() => {
  const ref = useRef();
  const init = useStore((state) => state.actions.init);
  const debugging = useStore((state) => state.debug.active);
  const viewingWork = useStore((state) => state.viewingWork);
  const viewingAbout = useStore((state) => state.viewingAbout);
  const isPortrait = useMediaQuery({
    maxAspectRatio: '1200/820',
  });

  const isSmallScreen = useMediaQuery({
    maxWidth: '1200px',
  });

  useEffect(() => {
    if (isSmallScreen || isPortrait) {
      useStore.setState({ mobile: true });
    } else {
      useStore.setState({ mobile: false });
    }
  }, [isPortrait, isSmallScreen]);

  useEffect(() => {
    init(ref.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div id='webGL-wrapper'>
        <Cursor />
        <Canvas
          mode='concurrent'
          dpr={[1, 2]}
          ref={ref}
          gl={{ toneMapping: ACESFilmicToneMapping }}
        >
          {(viewingWork || viewingAbout) && <DisableRender />}
          <Camera near={0.001} />
          <Controls />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          {debugging && <Stats className='stats' />}
        </Canvas>
      </div>
    </>
  );
});

export default Experience;
