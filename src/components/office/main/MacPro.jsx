import model from '@/assets/models/office.glb';
import useStore from '@/store';
import { useGLTF, useTexture } from '@react-three/drei';
import { OfficeMaterial } from '../shaders/office';

const MacPro = () => {
  const { nodes } = useGLTF(model);

  const maps = useTexture(useStore.getState().maps, (textures) => {
    for (let tex of Object.values(textures)) {
      tex.flipY = false;
    }
  });

  return (
    <group>
      <mesh position={nodes.MacPro.position} geometry={nodes.MacPro.geometry}>
        <OfficeMaterial
          uAlbedo={maps.albedo1}
          uLightmap1={maps.lm11}
          uLightmap2={maps.lm21}
          uLightmap3={maps.lm31}
          uLightmap4={maps.lm41}
        />
      </mesh>

      <mesh
        position={nodes.Mac_Pro_Emissive.position}
        geometry={nodes.Mac_Pro_Emissive.geometry}
      >
        <meshBasicMaterial color={'white'} />
      </mesh>
    </group>
  );
};

export default MacPro;
