import model from '@/assets/models/office.glb';
import useStore from '@/store';
import { useCursor, useGLTF, useTexture } from '@react-three/drei';
import { useControls } from 'leva';
import { OfficeMaterial } from '../shaders/office';
import { useSpring, animated } from '@react-spring/three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import IpadMaterial from '../shaders/ipads';
import albedo1 from '@/assets/img/bakes/albedo1.jpg';
import lightMapImage1_1 from '@/assets/img/bakes/lightmap1_1.jpg';
import lightMapImage2_1 from '@/assets/img/bakes/lightmap2_1.jpg';
import lightMapImage3_1 from '@/assets/img/bakes/lightmap3_1.jpg';
import lightMapImage4_1 from '@/assets/img/bakes/lightmap4_1.jpg';
import lightMapImage5_1 from '@/assets/img/bakes/lightmap5_1.jpg';
import lightningImage from '@/assets/img/lightning.jpg';

const Lab = ({ maps }) => {
  const screenRef = useRef();
  const { nodes } = useGLTF(model);

  const [albedo, lm1, lm2, lm3, lm4, lm5, lightning] = useTexture(
    [
      albedo1.src,
      lightMapImage1_1.src,
      lightMapImage2_1.src,
      lightMapImage3_1.src,
      lightMapImage4_1.src,
      lightMapImage5_1.src,
      lightningImage.src,
    ],
    (textures) => {
      for (let tex of textures) {
        tex.flipY = false;
      }
    }
  );

  const { labHovered } = useStore();

  useCursor(labHovered);

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
            uAlbedo={albedo}
            uAmbientLight={ambientLight}
            uLightMap2Intensity={shelfLightIntensity}
            uShelfLightColor={shelfLightColor}
            uShelfBottomStr={lightIntensity}
            uLightmap1={lm1}
            uLightmap2={lm2}
            uLightmap3={lm3}
            uLightmap4={lm4}
            uLightmap5={lm5}
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
            uLightningMap={lightning}
          />
        </mesh>
      </group>
    </group>
  );
};

export default Lab;
