import model from '@/assets/models/office.glb';
import useStore from '@/store';
import { useSpring } from '@react-spring/three';
import { useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { OfficeMaterial } from '../shaders/office';
import albedo2 from '@/assets/img/bakes/albedo2.jpg';
import lightMapImage1_2 from '@/assets/img/bakes/lightmap1_2.jpg';
import lightMapImage2_2 from '@/assets/img/bakes/lightmap2_2.jpg';
import lightMapImage3_2 from '@/assets/img/bakes/lightmap3_2.jpg';
import lightMapImage4_2 from '@/assets/img/bakes/lightmap4_2.jpg';
import lightMapImage5_2 from '@/assets/img/bakes/lightmap5_2.jpg';

const Partition2 = ({ maps }) => {
  const ref = useRef();
  const { nodes } = useGLTF(model);

  const [albedo, lm1, lm2, lm3, lm4, lm5] = useTexture(
    [
      albedo2.src,
      lightMapImage1_2.src,
      lightMapImage2_2.src,
      lightMapImage3_2.src,
      lightMapImage4_2.src,
      lightMapImage5_2.src,
    ],
    (textures) => {
      for (let tex of textures) {
        tex.flipY = false;
      }
    }
  );

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

  useFrame(({ clock }) => {
    ref.current.material.uTime = clock.elapsedTime * 0.75;
  });

  return (
    <mesh
      ref={ref}
      position={nodes.Merged2.position}
      geometry={nodes.Merged2.geometry}
    >
      <OfficeMaterial
        uAlbedo={albedo}
        uEmailStr={emailStr}
        uInstaStr={instaStr}
        uLinkedinStr={linkedinStr}
        uGithubStr={githubStr}
        uShelfTopStr={aboutStr}
        uShelfMidStr={worksStr}
        uShelfBottomStr={labStr}
        uLampStr={0.5}
        uLightMap5Intensity={0.25}
        uLightmap1={lm1}
        uLightmap2={lm2}
        uLightmap3={lm3}
        uLightmap4={lm4}
        uLightmap5={lm5}
      />
    </mesh>
  );
};

export default Partition2;
