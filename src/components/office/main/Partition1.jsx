import model from '@/assets/models/office.glb';
import useStore from '@/store';
import { useSpring } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';
import useTextureMaps from '../../../hooks/useTextureMaps';
import { OfficeMaterial } from '../shaders/office';

const Partition1 = () => {
  const { nodes } = useGLTF(model);

  const maps = useTextureMaps();

  const {
    emailHovered,
    instaHovered,
    linkedinHovered,
    githubHovered,
    aboutHovered,
    worksHovered,
    labHovered,
  } = useStore();

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
        uAlbedo={maps.albedo1}
        uEmailStr={emailStr}
        uInstaStr={instaStr}
        uLinkedinStr={linkedinStr}
        uGithubStr={githubStr}
        uShelfTopStr={aboutStr}
        uShelfMidStr={worksStr}
        uShelfBottomStr={labStr}
        uLightmap1={maps.lm11}
        uLightmap2={maps.lm21}
        uLightmap3={maps.lm31}
        uLightmap4={maps.lm41}
        uLightmap5={maps.lm51}
      />
    </mesh>
  );
};

export default Partition1;
