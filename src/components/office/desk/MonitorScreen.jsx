import model from '@/assets/models/office.glb';
import { useHomeStore } from '@/store';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap, { Power2 } from 'gsap';
import { useEffect } from 'react';
import { useRef } from 'react';
import MonitorMaterial from '../shaders/monitor';

const MonitorScreen = () => {
  const ref = useRef();
  const timeline = useRef(gsap.timeline());
  const experienceStarted = useHomeStore((s) => s.experienceStarted);
  const { nodes } = useGLTF(model);

  useEffect(() => {
    if (experienceStarted) {
      timeline.current.to(ref.current.material.uniforms.uEntered, {
        value: 1,
        duration: 0.75,
        delay: 3,
        ease: Power2.easeOut,
      });
    }
  }, [experienceStarted]);

  useFrame(({ clock }) => {
    ref.current.material.uTime = clock.elapsedTime;
  });

  return (
    <mesh
      ref={ref}
      position={nodes.Monitor_Emissive.position}
      geometry={nodes.Monitor_Emissive.geometry}
    >
      <MonitorMaterial />
    </mesh>
  );
};

export default MonitorScreen;
