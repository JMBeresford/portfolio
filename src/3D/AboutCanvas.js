import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ACESFilmicToneMapping } from 'three';
import AboutImage from './AboutImage';
import useStore from '../store';

const DisableRender = () => useFrame(() => null, 1000);

const AboutCanvas = React.memo(() => {
  const ref = useRef();
  const viewingAbout = useStore((state) => state.viewingAbout);

  return (
    <div className='img'>
      <Canvas
        dpr={[1, 2]}
        ref={ref}
        gl={{ toneMapping: ACESFilmicToneMapping }}
        camera={{ fov: 65 }}
        onCreated={({ camera }) => {
          camera.position.set(0, 0, 2);
        }}
      >
        {!viewingAbout && <DisableRender />}
        <Suspense fallback={null}>
          <AboutImage />
        </Suspense>
      </Canvas>
    </div>
  );
});

export default AboutCanvas;
