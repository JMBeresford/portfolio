import { Canvas } from '@react-three/fiber';
import { Preload, Stats, OrbitControls } from '@react-three/drei';
import { useStore } from '@/store';
import { Perf } from 'r3f-perf';
import { ACESFilmicToneMapping, CineonToneMapping } from 'three';

const LCanvas = ({ children }) => {
  const { debug } = useStore();
  const dom = useStore((state) => state.dom);

  return (
    <Canvas
      mode='concurrent'
      style={{
        position: 'fixed',
        top: 0,
      }}
      // camera={{ fov: 50, near: 0.001, position: [0, 0, 1.125] }}
      gl={{ toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      onCreated={({ gl, events }) => {
        events.connect(dom.current);
        gl.setClearColor('#000005', 1);
      }}
    >
      {/* <Preload all /> */}
      {children}

      {/* <OrbitControls /> */}
      {debug && <Perf position='bottom-left' />}
      {debug && <Stats />}
    </Canvas>
  );
};

export default LCanvas;
