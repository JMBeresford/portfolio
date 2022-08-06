import model from '@/assets/models/office.glb';
import { useControls } from 'leva';
import { useSpring } from '@react-spring/three';
import { OfficeMaterial } from '../shaders/office';
import useStore from '@/store';
import { useCursor, useGLTF, useTexture } from '@react-three/drei';
import { useMemo } from 'react';
import useTextureMaps from '../../../hooks/useTextureMaps';

const Socials = () => {
  const { nodes } = useGLTF(model);

  const maps = useTextureMaps();

  const { emailHovered, instaHovered, linkedinHovered, githubHovered } =
    useStore();

  const hovered = useMemo(
    () => emailHovered || instaHovered || linkedinHovered || githubHovered,
    [emailHovered, instaHovered, linkedinHovered, githubHovered]
  );

  useCursor(hovered);

  const { emailStr, instaStr, linkedinStr, githubStr } = useSpring({
    emailStr: emailHovered ? 1.5 : 1,
    instaStr: instaHovered ? 1.5 : 1,
    linkedinStr: linkedinHovered ? 1.5 : 1,
    githubStr: githubHovered ? 1.5 : 1,
  });

  const { ambientLight } = useControls(
    'Socials',
    {
      ambientLight: { value: 0.07, min: 0, max: 1, step: 0.01 },
    },
    { collapsed: true }
  );

  return (
    <group>
      <group>
        <mesh position={nodes.Email.position} geometry={nodes.Email.geometry}>
          <OfficeMaterial
            uAlbedo={maps.albedo1}
            uAmbientLight={ambientLight}
            uEmailStr={emailStr}
            uInstaStr={instaStr}
            uLinkedinStr={linkedinStr}
            uGithubStr={githubStr}
            uLightmap1={maps.lm11}
            uLightmap2={maps.lm21}
            uLightmap3={maps.lm31}
            uLightmap4={maps.lm41}
            uLightmap5={maps.lm51}
          />
        </mesh>
        <mesh
          position={nodes.Email_Emissive.position}
          geometry={nodes.Email_Emissive.geometry}
          onPointerEnter={() => useStore.setState({ emailHovered: true })}
          onPointerLeave={() => useStore.setState({ emailHovered: false })}
        >
          <meshBasicMaterial />
        </mesh>
      </group>

      <group>
        <mesh
          position={nodes.Instagram.position}
          geometry={nodes.Instagram.geometry}
        >
          <OfficeMaterial
            uAlbedo={maps.albedo1}
            uAmbientLight={ambientLight}
            uEmailStr={emailStr}
            uInstaStr={instaStr}
            uLinkedinStr={linkedinStr}
            uGithubStr={githubStr}
            uLightmap1={maps.lm11}
            uLightmap2={maps.lm21}
            uLightmap3={maps.lm31}
            uLightmap4={maps.lm41}
          />
        </mesh>
        <mesh
          position={nodes.Insta_Emissive.position}
          geometry={nodes.Insta_Emissive.geometry}
          onPointerEnter={() => useStore.setState({ instaHovered: true })}
          onPointerLeave={() => useStore.setState({ instaHovered: false })}
        >
          <meshBasicMaterial />
        </mesh>
      </group>

      <group>
        <mesh
          position={nodes.LinkedIn.position}
          geometry={nodes.LinkedIn.geometry}
        >
          <OfficeMaterial
            uAlbedo={maps.albedo1}
            uAmbientLight={ambientLight}
            uEmailStr={emailStr}
            uInstaStr={instaStr}
            uLinkedinStr={linkedinStr}
            uGithubStr={githubStr}
            uLightmap1={maps.lm11}
            uLightmap2={maps.lm21}
            uLightmap3={maps.lm31}
            uLightmap4={maps.lm41}
          />
        </mesh>
        <mesh
          position={nodes.Linkedin_Emissive.position}
          geometry={nodes.Linkedin_Emissive.geometry}
          onPointerEnter={() => useStore.setState({ linkedinHovered: true })}
          onPointerLeave={() => useStore.setState({ linkedinHovered: false })}
        >
          <meshBasicMaterial />
        </mesh>
      </group>

      <group>
        <mesh position={nodes.Github.position} geometry={nodes.Github.geometry}>
          <OfficeMaterial
            uAlbedo={maps.albedo1}
            uAmbientLight={ambientLight}
            uEmailStr={emailStr}
            uInstaStr={instaStr}
            uLinkedinStr={linkedinStr}
            uGithubStr={githubStr}
            uLightmap1={maps.lm11}
            uLightmap2={maps.lm21}
            uLightmap3={maps.lm31}
            uLightmap4={maps.lm41}
          />
        </mesh>
        <mesh
          position={nodes.Github_Emissive.position}
          geometry={nodes.Github_Emissive.geometry}
          onPointerEnter={() => useStore.setState({ githubHovered: true })}
          onPointerLeave={() => useStore.setState({ githubHovered: false })}
        >
          <meshBasicMaterial />
        </mesh>
      </group>
    </group>
  );
};

export default Socials;
