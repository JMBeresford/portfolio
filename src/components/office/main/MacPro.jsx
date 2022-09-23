import model from '@/assets/models/office.glb';
import { useGLTF, useTexture } from '@react-three/drei';
import { OfficeMaterial } from '../shaders/office';
import albedo1 from '@/assets/img/bakes/albedo1.jpg';
import lightMapImage1_1 from '@/assets/img/bakes/lightmap1_1.jpg';
import lightMapImage2_1 from '@/assets/img/bakes/lightmap2_1.jpg';
import lightMapImage3_1 from '@/assets/img/bakes/lightmap3_1.jpg';
import lightMapImage4_1 from '@/assets/img/bakes/lightmap4_1.jpg';
import lightMapImage5_1 from '@/assets/img/bakes/lightmap5_1.jpg';

const MacPro = ({ maps }) => {
  const { nodes } = useGLTF(model);

  const [albedo, lm1, lm2, lm3, lm4, lm5] = useTexture(
    [
      albedo1.src,
      lightMapImage1_1.src,
      lightMapImage2_1.src,
      lightMapImage3_1.src,
      lightMapImage4_1.src,
      lightMapImage5_1.src,
    ],
    (textures) => {
      for (let tex of textures) {
        tex.flipY = false;
      }
    }
  );

  return (
    <group>
      <mesh position={nodes.MacPro.position} geometry={nodes.MacPro.geometry}>
        <OfficeMaterial
          uAlbedo={albedo}
          uLightmap1={lm1}
          uLightmap2={lm2}
          uLightmap3={lm3}
          uLightmap4={lm4}
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
