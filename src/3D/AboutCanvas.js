import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ACESFilmicToneMapping } from 'three';
import AboutImage from './AboutImage';

const AboutCanvas = React.memo(() => {
  const ref = useRef();

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
        <Suspense fallback={null}>
          <AboutImage />
        </Suspense>
      </Canvas>
    </div>
  );
});

export default AboutCanvas;
