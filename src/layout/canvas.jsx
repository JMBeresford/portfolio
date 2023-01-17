import { Canvas } from '@react-three/fiber';
import { Preload, Stats, OrbitControls } from '@react-three/drei';
import { useStore } from '@/store';
import { Perf } from 'r3f-perf';
import { ACESFilmicToneMapping, CineonToneMapping } from 'three';
import { useRef } from 'react';

const LCanvas = ({ children }) => {
  const { debug } = useStore();
  const dom = useStore((state) => state.dom);
  const ref = useRef();

  return (
    <div ref={ref}>
      <Canvas
        eventPrefix='client'
        mode='concurrent'
        style={{
          position: 'fixed',
          top: 0,
        }}
        gl={{ toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        onCreated={({ gl, events }) => {
          // events.connect(dom.current);
          gl.setClearColor('#000005', 1);
        }}
      >
        {/* <Preload all /> */}
        {children}

        {/* <OrbitControls /> */}
        {debug && <Perf position='bottom-left' />}
        {debug && <Stats />}
      </Canvas>
    </div>
  );
};

export default LCanvas;
