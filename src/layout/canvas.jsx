import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import useStore from '@/store';
import { useEffect, useRef } from 'react';

const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom);

  return (
    <Canvas
      mode='concurrent'
      style={{
        position: 'absolute',
        top: 0,
      }}
      // onCreated={(state) => state.events.connect(dom.current)}
    >
      <Preload all />
      {children}
    </Canvas>
  );
};

export default LCanvas;
