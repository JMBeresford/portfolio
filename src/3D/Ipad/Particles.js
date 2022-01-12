import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import useStore from '../../store';
import React, { useMemo, useEffect } from 'react';
import { Color } from 'three';
import vertexShader from '../../shaders/backgroundparticles/vert.glsl';
import fragmentShader from '../../shaders/backgroundparticles/frag.glsl';
import { gsap, Linear } from 'gsap';

const ParticleMaterial = shaderMaterial(
  { uTime: 0, uColor: new Color(), uScale: 1, uDpr: 1, opacity: 1 },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.transparent = true;
    mat.depthTest = false;
    mat.depthWrite = false;
  }
);

extend({ ParticleMaterial });

const Particles = React.forwardRef((props, ref) => {
  const works = useStore((state) => state.works);
  const currentWork = useStore((state) => state.currentWork);
  const count = useStore((state) => state.backgroundParticleCount);

  const dpr = useThree((state) => state.viewport.dpr);
  const size = useThree((state) => state.size);
  const camera = useThree((state) => state.camera);

  const rands = useMemo(() => new Float32Array(count), [count]);
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const color = useMemo(() => new Color(), []);
  const spring = useMemo(() => ({ value: 0 }), []);

  useEffect(() => {
    if (color && spring) {
      color.set(useStore.getState().works[currentWork].color);

      gsap.killTweensOf(spring);

      gsap.to(spring, {
        value: 1,

        duration: 0.75,
        onUpdate: () => {
          ref.current.material.uniforms.uColor.value.lerp(color, spring.value);
        },
        onComplete: () => {
          spring.value = 0;
        },
        ease: Linear.easeInOut,
      });
    }
  }, [currentWork, color, spring, ref]);

  useEffect(() => {
    camera.add(ref.current);
  }, [camera, ref]);

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      rands[i] = Math.random() * 0.8 + 0.2;

      positions[i * 3] = Math.random() - 0.5;
      positions[i * 3 + 1] = Math.random() - 0.5;
      positions[i * 3 + 2] = -1;
    }
  }, [rands, positions, count]);

  useFrame(({ clock }) => {
    ref.current.material.uTime = clock.elapsedTime + 100;
  });

  return (
    <points ref={ref} raycast={null} position={[0, 0, -5.5]}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          array={positions}
          itemSize={3}
          count={positions ? positions.length / 3 : 0}
        />
        <bufferAttribute
          attachObject={['attributes', 'aRandom']}
          array={rands}
          count={rands ? rands.length : 0}
          itemSize={1}
        />
      </bufferGeometry>
      <particleMaterial
        uDpr={dpr}
        uColor={works[currentWork].color}
        uScale={Math.min(size.width / 650, size.height / 650)}
      />
    </points>
  );
});

export default Particles;
