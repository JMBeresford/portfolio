import useTextureMaps from '@/hooks/useTextureMaps';
import { Points, useDetectGPU } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React from 'react';
import { useMemo, forwardRef, useRef } from 'react';
import CloudsMaterial from './shaders/clouds';
import ParticleMaterial from './shaders/particles';

const IpadBackground = forwardRef(
  ({ color, pointCount = 2000, noParticles }, cloudsRef) => {
    const pointsRef = useRef();
    const { viewport, size } = useThree();
    const { tier } = useDetectGPU();

    const maps = useTextureMaps();

    const positions = useMemo(() => {
      const positions = [];
      for (let i = 0; i < pointCount; i++) {
        let angle = Math.random() * Math.PI * 2;
        let radius = Math.random() * 2 + 3;

        let x = Math.cos(angle) * radius;
        let y = Math.sin(angle) * radius;
        let z = 0.5; // just behind camera

        positions.push(x, y, z);
      }
      return new Float32Array(positions);
    }, [pointCount]);

    useFrame(({ clock }) => {
      cloudsRef.current.material.uTime = clock.elapsedTime;

      if (pointsRef.current) {
        pointsRef.current.material.uTime = clock.elapsedTime + 1000;
      }
    });

    return (
      <group position={[0, 0, 0]}>
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[3, 16, 16]} />
          <CloudsMaterial
            uAspect={viewport.aspect}
            uColor={color || 'red'}
            uOctaves={tier > 1 ? 5 : 3}
          />
        </mesh>

        {!noParticles && (
          <Points
            ref={pointsRef}
            positions={positions}
            limit={pointCount}
            range={pointCount}
          >
            <ParticleMaterial
              uPointSize={size.height / 400}
              uParticleMap={maps.particle}
            />
          </Points>
        )}
      </group>
    );
  }
);

IpadBackground.displayName = 'IpadBackground';

export default IpadBackground;
