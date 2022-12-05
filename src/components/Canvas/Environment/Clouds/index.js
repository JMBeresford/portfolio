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
    color1: '#153d52',
    color2: '#100e78',
    color3: '#2e006b',
    color4: '#62006b',
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
          uOctaves={isMobile ? 1 : tier + 2}
        />
      </mesh>
    </group>
  );
};

Clouds.displayName = 'Clouds';

export { Clouds };
