import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import useStore from '../store';
import Model from './Beresford_design';
import Camera from '../components/Camera';
import Controls from '../components/Controls';
import { Stats } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';
import { ACESFilmicToneMapping } from 'three';

const DisableRender = () => useFrame(() => null, 1000);

const Experience = () => {
  const ref = useRef();
  const init = useStore((state) => state.actions.init);
  const debugging = useStore((state) => state.debug.active);
  const view = useStore((state) => state.view);
  const destination = useStore((state) => state.destination);
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
        <Canvas
          dpr={[1, 2]}
          ref={ref}
          gl={{ toneMapping: ACESFilmicToneMapping }}
        >
          {['aboutEntered', 'worksEntered', 'labEntered'].includes(view) &&
            !destination && <DisableRender />}
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
};

export default Experience;
