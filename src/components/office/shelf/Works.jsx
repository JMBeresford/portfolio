import model from '@/assets/models/office.glb';
import useStore from '@/store';
import { useGLTF, useCursor } from '@react-three/drei';
import { useControls } from 'leva';
import { OfficeMaterial } from '../shaders/office';
import { useSpring, animated } from '@react-spring/three';
import useTextureMaps from '../hooks/useTextureMaps';

const Works = () => {
  const { nodes } = useGLTF(model);

  const { worksHovered } = useStore();

  useCursor(worksHovered);

  const maps = useTextureMaps();

  const { shelfLightIntensity, shelfLightColor } = useControls(
    'Works',
    {
      shelfLightIntensity: { value: 1, min: 0, max: 2, step: 0.05 },
      shelfLightColor: '#fff4da',
    },
    { collapsed: true }
  );

  const { lightIntensity, ambientLight, emissiveColor, screenColor } =
    useSpring({
      lightIntensity: worksHovered ? 1 : 0.5,
      ambientLight: worksHovered ? 0.16 : 0.16 * 0.35,
      emissiveColor: worksHovered ? '#ffffff' : '#837c6c',
      screenColor: worksHovered ? '#ffffff' : '#999999',
    });

  return (
    <group
      onPointerEnter={() => useStore.setState({ worksHovered: true })}
      onPointerLeave={() => useStore.setState({ worksHovered: false })}
    >
      <mesh
        position={nodes.Shelf_Emissive_Middle.position}
        geometry={nodes.Shelf_Emissive_Middle.geometry}
      >
        <animated.meshBasicMaterial color={emissiveColor} />
      </mesh>

      <group>
        <mesh position={nodes.Works.position} geometry={nodes.Works.geometry}>
          <OfficeMaterial
            uAlbedo={maps.albedo1}
            uAmbientLight={ambientLight}
            uLightMap2Intensity={shelfLightIntensity}
            uShelfLightColor={shelfLightColor}
            uShelfMidStr={lightIntensity}
            uLightmap1={maps.lm11}
            uLightmap2={maps.lm21}
            uLightmap3={maps.lm31}
            uLightmap4={maps.lm41}
            uLightmap5={maps.lm51}
          />
        </mesh>

        <mesh
          position={nodes.Work_Ipad_Emissive.position}
          geometry={nodes.Work_Ipad_Emissive.geometry}
        >
          <animated.meshBasicMaterial color={screenColor} />
        </mesh>
      </group>
    </group>
  );
};

export default Works;
