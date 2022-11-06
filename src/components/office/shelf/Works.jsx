import model from '@/assets/models/office.glb';
import { useStore, useHomeStore } from '@/store';
import { useGLTF, useCursor, useTexture } from '@react-three/drei';
import { useControls } from 'leva';
import { OfficeMaterial } from '../shaders/office';
import { useSpring, animated } from '@react-spring/three';
import IpadMaterial from '../shaders/ipads';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import albedo1 from '@/assets/img/bakes/albedo1.jpg';
import lightMapImage1_1 from '@/assets/img/bakes/lightmap1_1.jpg';
import lightMapImage2_1 from '@/assets/img/bakes/lightmap2_1.jpg';
import lightMapImage3_1 from '@/assets/img/bakes/lightmap3_1.jpg';
import lightMapImage4_1 from '@/assets/img/bakes/lightmap4_1.jpg';
import lightMapImage5_1 from '@/assets/img/bakes/lightmap5_1.jpg';
import lightningImage from '@/assets/img/lightning.jpg';
import shallow from 'zustand/shallow';

const Works = () => {
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

  const [worksHovered, actions] = useHomeStore(
    (s) => [s.worksHovered, s.actions],
    shallow
  );

  useCursor(worksHovered);

  const { shelfLightIntensity, shelfLightColor } = useControls(
    'Works',
    {
      shelfLightIntensity: { value: 1, min: 0, max: 2, step: 0.05 },
      shelfLightColor: '#fff4da',
    },
    { collapsed: true }
  );

  const { baseLightColor } = useControls('lights', {
    baseLightColor: '#d59c6e',
  });

  const { lightIntensity, ambientLight, emissiveColor, hoverFactor } =
    useSpring({
      lightIntensity: worksHovered ? 1 : 0.5,
      ambientLight: worksHovered ? 0.16 : 0.16 * 0.35,
      emissiveColor: worksHovered ? '#ffffff' : '#837c6c',
      hoverFactor: worksHovered ? 0 : 1,
    });

  useFrame(({ clock }) => {
    screenRef.current.material.uTime = clock.elapsedTime + 2000.0;
  });

  return (
    <group
      onPointerEnter={() => useHomeStore.setState({ worksHovered: true })}
      onClick={() => {
        actions.transitionView('works');
        useStore.setState({ transitioning: true });
      }}
      onPointerLeave={() => useHomeStore.setState({ worksHovered: false })}
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
            uAlbedo={albedo}
            uAmbientLight={ambientLight}
            uLightMap2Intensity={shelfLightIntensity}
            uShelfLightColor={shelfLightColor}
            uShelfMidStr={lightIntensity}
            uBaseLightColor={baseLightColor}
            uLightmap1={lm1}
            uLightmap2={lm2}
            uLightmap3={lm3}
            uLightmap4={lm4}
            uLightmap5={lm5}
          />
        </mesh>

        <mesh
          ref={screenRef}
          position={nodes.Work_Ipad_Emissive.position}
          geometry={nodes.Work_Ipad_Emissive.geometry}
        >
          <IpadMaterial
            uColor={[0.4745, 0.7451, 1.0]}
            uHovered={hoverFactor}
            uLightningMap={lightning}
          />
        </mesh>
      </group>
    </group>
  );
};

export default Works;
