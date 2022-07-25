import model from '@/assets/models/office.glb';
import useStore from '@/store';
import { useSpring } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import useTextureMaps from '../hooks/useTextureMaps';
import { OfficeMaterial } from '../shaders/office';

const Partition2 = () => {
  const ref = useRef();
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
        uAlbedo={maps.albedo2}
        uEmailStr={emailStr}
        uInstaStr={instaStr}
        uLinkedinStr={linkedinStr}
        uGithubStr={githubStr}
        uShelfTopStr={aboutStr}
        uShelfMidStr={worksStr}
        uShelfBottomStr={labStr}
        uLampStr={0.5}
        uLightMap5Intensity={0.25}
        uLightmap1={maps.lm12}
        uLightmap2={maps.lm22}
        uLightmap3={maps.lm32}
        uLightmap4={maps.lm42}
        uLightmap5={maps.lm52}
      />
    </mesh>
  );
};

export default Partition2;
