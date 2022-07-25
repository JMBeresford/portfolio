import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, Stats } from '@react-three/drei';
import useStore from '@/store';
import { Perf } from 'r3f-perf';
import Camera from '@/components/Camera';
import { Leva } from 'leva';

const LCanvas = ({ children }) => {
  const { debug } = useStore();

  return (
    <Canvas
      mode='concurrent'
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 5,
      }}
      onCreated={({ gl }) => gl.setClearColor('#000005', 1)}
    >
      {/* <Preload all /> */}
      {children}
      <Camera />

      {debug && <OrbitControls />}
      {debug && <Perf position='bottom-left' />}
      {debug && <Stats />}
      <Leva hidden={!debug} />
    </Canvas>
  );
};

export default LCanvas;
