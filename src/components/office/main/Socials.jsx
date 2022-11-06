import model from '@/assets/models/office.glb';
import { useControls } from 'leva';
import { useSpring, animated as a } from '@react-spring/three';
import { OfficeMaterial } from '../shaders/office';
import { useHomeStore } from '@/store';
import { useCursor, useGLTF, useTexture } from '@react-three/drei';
import albedo1 from '@/assets/img/bakes/albedo1.jpg';
import lightMapImage1_1 from '@/assets/img/bakes/lightmap1_1.jpg';
import lightMapImage2_1 from '@/assets/img/bakes/lightmap2_1.jpg';
import lightMapImage3_1 from '@/assets/img/bakes/lightmap3_1.jpg';
import lightMapImage4_1 from '@/assets/img/bakes/lightmap4_1.jpg';
import lightMapImage5_1 from '@/assets/img/bakes/lightmap5_1.jpg';
import shallow from 'zustand/shallow';

const Socials = ({ maps }) => {
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

  const [emailHovered, instaHovered, linkedinHovered, githubHovered] =
    useHomeStore(
      (s) => [
        s.emailHovered,
        s.instaHovered,
        s.linkedinHovered,
        s.githubHovered,
      ],
      shallow
    );

  useCursor(emailHovered || instaHovered || linkedinHovered || githubHovered);

  const { emailStr, instaStr, linkedinStr, githubStr } = useSpring({
    emailStr: emailHovered ? 1.5 : 1,
    instaStr: instaHovered ? 1.5 : 1,
    linkedinStr: linkedinHovered ? 1.5 : 1,
    githubStr: githubHovered ? 1.5 : 1,
  });

  const { emailEmissive, instaEmissive, linkedinEmissive, githubEmissive } =
    useSpring({
      emailEmissive: emailHovered ? '#fff' : '#999',
      instaEmissive: instaHovered ? '#fff' : '#999',
      linkedinEmissive: linkedinHovered ? '#fff' : '#999',
      githubEmissive: githubHovered ? '#fff' : '#999',
    });

  const { ambientLight, emailColor } = useControls(
    'Socials',
    {
      ambientLight: { value: 0.05, min: 0, max: 1, step: 0.01 },
      emailColor: '#4998ff',
    },
    { collapsed: true }
  );

  const { baseLightColor } = useControls('lights', {
    baseLightColor: '#d59c6e',
  });

  return (
    <group>
      <group>
        <mesh position={nodes.Email.position} geometry={nodes.Email.geometry}>
          <OfficeMaterial
            uBaseLightColor={baseLightColor}
            uAlbedo={albedo}
            uEmailColor={emailColor}
            uAmbientLight={ambientLight}
            uEmailStr={emailStr}
            uInstaStr={instaStr}
            uLinkedinStr={linkedinStr}
            uGithubStr={githubStr}
            uLightmap1={lm1}
            uLightmap2={lm2}
            uLightmap3={lm3}
            uLightmap4={lm4}
            uLightmap5={lm5}
          />
        </mesh>
        <mesh
          position={nodes.Email_Emissive.position}
          geometry={nodes.Email_Emissive.geometry}
          onPointerEnter={() => useHomeStore.setState({ emailHovered: true })}
          onPointerLeave={() => useHomeStore.setState({ emailHovered: false })}
          onClick={() =>
            window.open('mailto:john@beresford-design.com', '_blank')
          }
        >
          <a.meshBasicMaterial color={emailEmissive} />
        </mesh>
      </group>

      <group>
        <mesh
          position={nodes.Instagram.position}
          geometry={nodes.Instagram.geometry}
        >
          <OfficeMaterial
            uBaseLightColor={baseLightColor}
            uAlbedo={albedo}
            uAmbientLight={ambientLight}
            uEmailStr={emailStr}
            uInstaStr={instaStr}
            uLinkedinStr={linkedinStr}
            uGithubStr={githubStr}
            uLightmap1={lm1}
            uLightmap2={lm2}
            uLightmap3={lm3}
            uLightmap4={lm4}
            uLightmap5={lm5}
          />
        </mesh>
        <mesh
          position={nodes.Insta_Emissive.position}
          geometry={nodes.Insta_Emissive.geometry}
          onPointerEnter={() => useHomeStore.setState({ instaHovered: true })}
          onPointerLeave={() => useHomeStore.setState({ instaHovered: false })}
          onClick={() =>
            window.open('https://www.instagram.com/beresforddesign/', '_blank')
          }
        >
          <a.meshBasicMaterial color={instaEmissive} />
        </mesh>
      </group>

      <group>
        <mesh
          position={nodes.LinkedIn.position}
          geometry={nodes.LinkedIn.geometry}
        >
          <OfficeMaterial
            uBaseLightColor={baseLightColor}
            uAlbedo={albedo}
            uAmbientLight={ambientLight}
            uEmailStr={emailStr}
            uInstaStr={instaStr}
            uLinkedinStr={linkedinStr}
            uGithubStr={githubStr}
            uLightmap1={lm1}
            uLightmap2={lm2}
            uLightmap3={lm3}
            uLightmap4={lm4}
            uLightmap5={lm5}
          />
        </mesh>
        <mesh
          position={nodes.Linkedin_Emissive.position}
          geometry={nodes.Linkedin_Emissive.geometry}
          onPointerEnter={() =>
            useHomeStore.setState({ linkedinHovered: true })
          }
          onPointerLeave={() =>
            useHomeStore.setState({ linkedinHovered: false })
          }
          onClick={() =>
            window.open('https://www.linkedin.com/in/JMBeresford', '_blank')
          }
        >
          <a.meshBasicMaterial color={linkedinEmissive} />
        </mesh>
      </group>

      <group>
        <mesh position={nodes.Github.position} geometry={nodes.Github.geometry}>
          <OfficeMaterial
            uBaseLightColor={baseLightColor}
            uAlbedo={albedo}
            uAmbientLight={ambientLight}
            uEmailStr={emailStr}
            uInstaStr={instaStr}
            uLinkedinStr={linkedinStr}
            uGithubStr={githubStr}
            uLightmap1={lm1}
            uLightmap2={lm2}
            uLightmap3={lm3}
            uLightmap4={lm4}
            uLightmap5={lm5}
          />
        </mesh>
        <mesh
          position={nodes.Github_Emissive.position}
          geometry={nodes.Github_Emissive.geometry}
          onPointerEnter={() => useHomeStore.setState({ githubHovered: true })}
          onPointerLeave={() => useHomeStore.setState({ githubHovered: false })}
          onClick={() =>
            window.open('https://github.com/JMBeresford', '_blank')
          }
        >
          <a.meshBasicMaterial color={githubEmissive} />
        </mesh>
      </group>
    </group>
  );
};

export default Socials;
