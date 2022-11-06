import model from '@/assets/models/office.glb';
import useStore, { useHomeStore } from '@/store';
import { useSpring } from '@react-spring/three';
import { useGLTF, useTexture } from '@react-three/drei';
import { OfficeMaterial } from '../shaders/office';
import albedo1 from '@/assets/img/bakes/albedo1.jpg';
import lightMapImage1_1 from '@/assets/img/bakes/lightmap1_1.jpg';
import lightMapImage2_1 from '@/assets/img/bakes/lightmap2_1.jpg';
import lightMapImage3_1 from '@/assets/img/bakes/lightmap3_1.jpg';
import lightMapImage4_1 from '@/assets/img/bakes/lightmap4_1.jpg';
import lightMapImage5_1 from '@/assets/img/bakes/lightmap5_1.jpg';
import shallow from 'zustand/shallow';
import { useControls } from 'leva';

const Partition1 = () => {
  const { nodes } = useGLTF(model);

  const { baseLightColor } = useControls('lights', {
    baseLightColor: '#d59c6e',
  });

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

  const [
    emailHovered,
    instaHovered,
    linkedinHovered,
    githubHovered,
    aboutHovered,
    worksHovered,
    labHovered,
  ] = useHomeStore(
    (s) => [
      s.emailHovered,
      s.instaHovered,
      s.linkedinHovered,
      s.githubHovered,
      s.aboutHovered,
      s.worksHovered,
      s.labHovered,
    ],
    shallow
  );

  const {
    emailStr,
    instaStr,
    linkedinStr,
    githubStr,
    aboutStr,
    worksStr,
    labStr,
  } = useSpring({
    emailStr: emailHovered ? 5 : 1,
    instaStr: instaHovered ? 5 : 1,
    linkedinStr: linkedinHovered ? 3.5 : 1,
    githubStr: githubHovered ? 2 : 1,

    aboutStr: aboutHovered ? 1 : 0.5,
    worksStr: worksHovered ? 1 : 0.5,
    labStr: labHovered ? 1 : 0.35,
  });

  return (
    <mesh position={nodes.Merged1.position} geometry={nodes.Merged1.geometry}>
      <OfficeMaterial
        uAlbedo={albedo}
        uEmailStr={emailStr}
        uInstaStr={instaStr}
        uLinkedinStr={linkedinStr}
        uGithubStr={githubStr}
        uShelfTopStr={aboutStr}
        uShelfMidStr={worksStr}
        uShelfBottomStr={labStr}
        uBaseLightColor={baseLightColor}
        uLightmap1={lm1}
        uLightmap2={lm2}
        uLightmap3={lm3}
        uLightmap4={lm4}
        uLightmap5={lm5}
      />
    </mesh>
  );
};

export default Partition1;
