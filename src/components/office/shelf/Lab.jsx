import model from '@/assets/models/office.glb';
import useStore from '@/store';
import { useCursor, useGLTF } from '@react-three/drei';
import { useControls } from 'leva';
import { OfficeMaterial } from '../shaders/office';
import { useSpring, animated } from '@react-spring/three';
import useTextureMaps from '../../../hooks/useTextureMaps';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import IpadMaterial from '../shaders/ipads';

const Lab = () => {
  const screenRef = useRef();
  const { nodes } = useGLTF(model);

  const { labHovered } = useStore();

  useCursor(labHovered);

  const maps = useTextureMaps();

  const { shelfLightIntensity, shelfLightColor } = useControls(
    'Lab',
    {
      shelfLightIntensity: { value: 1, min: 0, max: 2, step: 0.05 },
      shelfLightColor: '#fff4da',
    },
    { collapsed: true }
  );

  const { lightIntensity, ambientLight, emissiveColor, hoverFactor } =
    useSpring({
      lightIntensity: labHovered ? 1 : 0.35,
      ambientLight: labHovered ? 0.16 : 0.16 * 0.35,
      emissiveColor: labHovered ? '#ffffff' : '#837c6c',
      hoverFactor: labHovered ? 0 : 1,
    });

  useFrame(({ clock }) => {
    screenRef.current.material.uTime = clock.elapsedTime + 3000.0;
  });

  return (
    <group
      onPointerEnter={() => useStore.setState({ labHovered: true })}
      onPointerLeave={() => useStore.setState({ labHovered: false })}
    >
      <mesh
        position={nodes.Shelf_Emissive_Bottom.position}
        geometry={nodes.Shelf_Emissive_Bottom.geometry}
      >
        <animated.meshBasicMaterial color={emissiveColor} />
      </mesh>

      <group>
        <mesh position={nodes.Lab.position} geometry={nodes.Lab.geometry}>
          <OfficeMaterial
            uAlbedo={maps.albedo1}
            uAmbientLight={ambientLight}
            uLightMap2Intensity={shelfLightIntensity}
            uShelfLightColor={shelfLightColor}
            uShelfBottomStr={lightIntensity}
            uLightmap1={maps.lm11}
            uLightmap2={maps.lm21}
            uLightmap3={maps.lm31}
            uLightmap4={maps.lm41}
            uLightmap5={maps.lm51}
          />
        </mesh>

        <mesh
          ref={screenRef}
          position={nodes.Lab_Ipad_Emissive.position}
          geometry={nodes.Lab_Ipad_Emissive.geometry}
        >
          <IpadMaterial
            uColor={[0.6706, 0.4196, 1.0]}
            uHovered={hoverFactor}
            uLightningMap={maps.lightning}
          />
        </mesh>
      </group>
    </group>
  );
};

export default Lab;
