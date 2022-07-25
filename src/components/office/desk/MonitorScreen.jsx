import model from '@/assets/models/office.glb';
import useStore from '@/store';
import { useSpring } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import MonitorMaterial from '../shaders/monitor';

const MonitorScreen = () => {
  const ref = useRef();
  const { nodes } = useGLTF(model);

  const { experienceStarted } = useStore();

  const { mixFactor } = useSpring({
    mixFactor: experienceStarted ? 1 : -2,
    config: { duration: 3000 },
  });

  useFrame(({ clock }) => {
    ref.current.material.uTime = clock.elapsedTime;
  });

  return (
    <mesh
      ref={ref}
      position={nodes.Monitor_Emissive.position}
      geometry={nodes.Monitor_Emissive.geometry}
      onClick={() => {
        console.log(ref.current.material);
      }}
    >
      <MonitorMaterial uEntered={mixFactor} />
    </mesh>
  );
};

export default MonitorScreen;
