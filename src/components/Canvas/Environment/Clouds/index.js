import { useDetectGPU } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import React from 'react';
import { useRef, useMemo } from 'react';
import { Color } from 'three';
import CloudsMaterial from './shaders/clouds';

const Clouds = ({ color, pointCount = 2000, ...props }) => {
  const cloudsRef = useRef();
  const { viewport } = useThree();
  const { tier, isMobile } = useDetectGPU();

  useFrame(({ clock }) => {
    cloudsRef.current.material.uTime = clock.elapsedTime + 100.0;
  });

  const { color1, color2, color3, color4 } = useControls('clouds', {
    color1: '#1f5b6f',
    color2: '#0e2c79',
    color3: '#4d006c',
    color4: '#6b0044',
  });

  const colors = useMemo(() => {
    let cs = [color1, color2, color3, color4];

    return cs.map((c) => new Color(c));
  }, [color1, color2, color3, color4]);

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={cloudsRef} {...props}>
        <sphereGeometry args={[3, 16, 16]} />
        <CloudsMaterial
          uAspect={viewport.aspect}
          uColors={colors}
          uOctaves={isMobile ? 1 : tier >= 2 ? 4 : 3}
        />
      </mesh>
    </group>
  );
};

Clouds.displayName = 'Clouds';

export { Clouds };
