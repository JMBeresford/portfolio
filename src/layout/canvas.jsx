import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, Stats } from '@react-three/drei';
import useStore from '@/store';
import { Perf } from 'r3f-perf';

const LCanvas = ({ children }) => {
  const { debug } = useStore();

  return (
    <Canvas
      mode='concurrent'
      camera={{ fov: 65 }}
      style={{
        position: 'absolute',
        inset: 0,
      }}
      onCreated={({ gl }) => gl.setClearColor('#000005', 1)}
    >
      {/* <Preload all /> */}
      {children}

      <OrbitControls />
      {debug && <Perf position='bottom-left' />}
      {debug && <Stats />}
    </Canvas>
  );
};

export default LCanvas;
