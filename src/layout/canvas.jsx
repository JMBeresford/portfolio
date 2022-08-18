import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Preload, Stats } from '@react-three/drei';
import useStore from '@/store';
import { Perf } from 'r3f-perf';
import Camera from '@/components/Camera';

const LCanvas = ({ children }) => {
  const { debug, dom } = useStore();

  return (
    <Canvas
      mode='concurrent'
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 5,
      }}
      camera={{ near: 0.01 }}
      onCreated={({ gl,events }) => {
        events.connect(dom.current)
        gl.setClearColor('#000005', 1)}}
    >
      <Preload all />
      {children}
      <Camera />

      {/* <OrbitControls /> */}
      {debug && <Perf position='bottom-left' />}
      {debug && <Stats />}
    </Canvas>
  );
};

export default LCanvas;
