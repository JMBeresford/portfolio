import model from '@/assets/models/office.glb';
import { useControls } from 'leva';
import { OfficeMaterial } from '../shaders/office';
import { useHomeStore, useStore } from '@/store';
import { useCursor, useGLTF, useTexture } from '@react-three/drei';
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

const About = () => {
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

  const [aboutHovered, actions] = useHomeStore(
    (s) => [s.aboutHovered, s.actions],
    shallow
  );

  useCursor(aboutHovered);

  const { shelfLightIntensity, shelfLightColor } = useControls(
    'About',
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
      lightIntensity: aboutHovered ? 1.2 : 0.65,
      ambientLight: aboutHovered ? 0.125 : 0.16 * 0.3,
      emissiveColor: aboutHovered ? '#ffffff' : '#837c6c',
      hoverFactor: aboutHovered ? 0 : 1,
    });

  useFrame(({ clock }) => {
    screenRef.current.material.uTime = clock.elapsedTime + 1000.0;
  });

  return (
    <group
      onPointerEnter={() => useHomeStore.setState({ aboutHovered: true })}
      onClick={() => {
        actions.transitionView('about');
        useStore.setState({ transitioning: true });
      }}
      onPointerLeave={() => useHomeStore.setState({ aboutHovered: false })}
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
            uBaseLightColor={baseLightColor}
            uAlbedo={albedo}
            uAmbientLight={ambientLight}
            uLightMap2Intensity={shelfLightIntensity}
            uShelfLightColor={shelfLightColor}
            uShelfTopStr={lightIntensity}
            uLightmap1={lm1}
            uLightmap2={lm2}
            uLightmap3={lm3}
            uLightmap4={lm4}
            uLightmap5={lm5}
          />
        </mesh>

        <mesh
          ref={screenRef}
          position={nodes.About_Ipad_Emissive.position}
          geometry={nodes.About_Ipad_Emissive.geometry}
        >
          <IpadMaterial
            uColor={[1.0, 0.5098, 0.4745]}
            uLightningMap={lightning}
            uHovered={hoverFactor}
          />
        </mesh>
      </group>
    </group>
  );
};

export default About;
