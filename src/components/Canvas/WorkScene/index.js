import { useHomeStore, useStore, useWorksStore } from '@/store';
import { PerspectiveCamera, Text as TextImpl } from '@react-three/drei';
import font2 from '@/assets/fonts/Montserrat-Regular.ttf';
import font from '@/assets/fonts/MrsEavesRomanSmallCaps.ttf';
import { useEffect, useRef, useMemo } from 'react';
import Environment from '../Environment';
import PostProcessing from '../PostProcessing';
import { FrontSide } from 'three';
import { animated } from '@react-spring/three';
import { useFrame, useThree } from '@react-three/fiber';
import { damp } from 'three/src/math/MathUtils';
import Buttons from './Buttons';
import Gallery from './Gallery';

const Text = animated(TextImpl);

const WorkScene = ({ work }) => {
  const camRef = useRef();
  const size = useThree((s) => s.size);
  const viewport = useThree((s) => s.viewport);

  const isMobile = useMemo(() => size.width < 768, [size]);
  const maxWidth = useMemo(
    () => (isMobile ? viewport.width * 0.165 : 0.5),
    [viewport, isMobile]
  );

  useEffect(() => {
    useHomeStore.setState({ converged: false });
    useStore.setState({ transitioning: false });
  }, []);

  useFrame(({ mouse }, delta) => {
    if (isMobile) return;

    camRef.current.rotation.x = damp(
      camRef.current.rotation.x,
      mouse.y * 0.05,
      8,
      delta
    );

    camRef.current.rotation.y = damp(
      camRef.current.rotation.y,
      -mouse.x * 0.05,
      8,
      delta
    );
  });

  return (
    <group>
      <PerspectiveCamera
        ref={camRef}
        makeDefault={true}
        near={0.001}
        far={50}
        fov={65}
        position={[0, 0, 2]}
      />

      <group position={[0, 0, 1.625]}>
        <Text
          position={[0, 0.065, 0]}
          text={work.displayName}
          maxWidth={isMobile ? viewport.width * 0.165 : 1}
          textAlign='center'
          font={font}
          fontSize={isMobile ? 0.0375 : 0.055}
          lineHeight={1}
          anchorY='bottom'
          outlineColor='black'
          outlineWidth={0}
          outlineBlur={'50%'}
        >
          <meshBasicMaterial side={FrontSide} />
        </Text>

        <animated.mesh position={[0, 0.06, 0]} scale-x={isMobile ? 0.3 : 1}>
          <planeGeometry args={[0.02 * work.displayName.length, 0.0015]} />
          <meshBasicMaterial color={'white'} transparent={true} />
        </animated.mesh>

        <Buttons work={work} />

        <Text
          position={[0, -0.045, 0]}
          font={font2}
          text={work.description}
          fontSize={isMobile ? 0.0125 : 0.013}
          maxWidth={maxWidth}
          anchorY='top'
          textAlign='center'
          lineHeight={1.3}
          outlineColor='black'
          outlineWidth={0}
          outlineBlur={'100%'}
        >
          <meshBasicMaterial side={FrontSide} />
        </Text>

        <Gallery images={work.images} />
      </group>

      <Environment />
      <PostProcessing />
    </group>
  );
};

export default WorkScene;
