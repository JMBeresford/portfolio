import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import useStore from '../store';
import IpadBackground from './IpadBackground';

const DisableRender = () => useFrame(() => null, 1000);

const LabCanvas = () => {
  const ref = useRef();
  const view = useStore((state) => state.view);
  const destination = useStore((state) => state.destination);

  return (
    <div className='ipadWebGLWrapper'>
      <Canvas
        dpr={[1, 2]}
        mode='concurrent'
        ref={ref}
        camera={{ fov: 65 }}
        onCreated={({ camera, gl }) => {
          camera.position.set(0, 0, 2);
          gl.setClearColor('black');
        }}
      >
        {(view !== 'labEntered' || destination) && <DisableRender />}
        <Suspense fallback={null}>
          <IpadBackground />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default LabCanvas;
