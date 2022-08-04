import model from '@/assets/models/office.glb';
import { useControls } from 'leva';
import { OfficeMaterial } from '../shaders/office';
import useStore from '@/store';
import { useCursor, useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import useTextureMaps from '../hooks/useTextureMaps';
import IpadMaterial from '../shaders/ipads';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const About = () => {
  const screenRef = useRef();
  const { nodes } = useGLTF(model);

  const { aboutHovered, actions } = useStore();

  useCursor(aboutHovered);

  const maps = useTextureMaps();

  const { shelfLightIntensity, shelfLightColor } = useControls(
    'About',
    {
      shelfLightIntensity: { value: 1, min: 0, max: 2, step: 0.05 },
      shelfLightColor: '#ffffff',
    },
    { collapsed: true }
  );

  const { lightIntensity, ambientLight, emissiveColor, hoverFactor } =
    useSpring({
      lightIntensity: aboutHovered ? 1.2 : 0.65,
      ambientLight: aboutHovered ? 0.16 : 0.16 * 0.35,
      emissiveColor: aboutHovered ? '#ffffff' : '#837c6c',
      hoverFactor: aboutHovered ? 0 : 1,
    });

  useFrame(({ clock }) => {
    screenRef.current.material.uTime = clock.elapsedTime + 1000.0;
  });

  return (
    <group
      onPointerEnter={() => useStore.setState({ aboutHovered: true })}
      onClick={() => actions.setView('about')}
      onPointerLeave={() => useStore.setState({ aboutHovered: false })}
    >
      <mesh
        position={nodes.Shelf_Emissive_Top.position}
        geometry={nodes.Shelf_Emissive_Top.geometry}
      >
        <animated.meshBasicMaterial color={emissiveColor} />
      </mesh>

      <group>
        <mesh position={nodes.About.position} geometry={nodes.About.geometry}>
          <OfficeMaterial
            uAlbedo={maps.albedo1}
            uAmbientLight={ambientLight}
            uLightMap2Intensity={shelfLightIntensity}
            uShelfLightColor={shelfLightColor}
            uShelfTopStr={lightIntensity}
            uLightmap1={maps.lm11}
            uLightmap2={maps.lm21}
            uLightmap3={maps.lm31}
            uLightmap4={maps.lm41}
            uLightmap5={maps.lm51}
          />
        </mesh>

        <mesh
          ref={screenRef}
          position={nodes.About_Ipad_Emissive.position}
          geometry={nodes.About_Ipad_Emissive.geometry}
        >
          <IpadMaterial
            uColor={[1.0, 0.5098, 0.4745]}
            uLightningMap={maps.lightning}
            uHovered={hoverFactor}
          />
        </mesh>
      </group>
    </group>
  );
};

export default About;
