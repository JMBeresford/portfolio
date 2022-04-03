import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import useStore from '../store';
import Camera from './Camera';
import Controls from './Controls';
import { Stats, useDetectGPU } from '@react-three/drei';
import { ACESFilmicToneMapping } from 'three';
import { useMediaQuery } from 'react-responsive';

const Ipad = React.lazy(() => import('../3D/Ipad'));
const OfficeModel = React.lazy(() => import('../3D/OfficeModel'));

const Experience = () => {
  const ref = useRef();
  const init = useStore((state) => state.actions.init);
  const debugging = useStore((state) => state.debug.active);
  const GPUInfo = useDetectGPU();

  useEffect(() => {
    if (GPUInfo.isMobile) {
      useStore.setState({ mobile: true });
    }
  }, [GPUInfo]);

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
      <div
        id='webGL-wrapper'
        onPointerDown={(e) => {
          let x = (e.clientX / window.innerWidth) * 2.0 - 1.0;
          useStore.setState({
            touchStartX: x,
            dragging: true,
          });
        }}
        onPointerUp={(e) => {
          useStore.setState({ dragging: false });
        }}
      >
        <Canvas
          dpr={[1, 2]}
          mode='concurrent'
          ref={ref}
          style={{ touchAction: 'none' }}
          gl={{ toneMapping: ACESFilmicToneMapping }}
        >
          <Suspense fallback={null}>
            <Ipad />
          </Suspense>
          <Controls />
          <Camera near={0.0005} />
          <Suspense fallback={null}>
            <OfficeModel />
          </Suspense>
          {debugging && <Stats className='stats' />}
        </Canvas>
      </div>
    </>
  );
};

export default Experience;
