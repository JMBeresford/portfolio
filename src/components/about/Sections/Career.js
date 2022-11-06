import { animated, useSpring } from '@react-spring/three';
import { Text as TextImpl, useCursor } from '@react-three/drei';
import font2 from '@/assets/fonts/Montserrat-Regular.ttf';
import font from '@/assets/fonts/MrsEavesRomanSmallCaps.ttf';
import { Suspense, useState } from 'react';
import { useControls } from 'leva';
import { useAboutStore, useWorksStore } from '@/store';
import { FrontSide } from 'three';
import WorkItem from '../components/WorkItem';

const Text = animated(TextImpl);

const WIDTH = 0.06;

const Career = ({ angle = 1 }) => {
  const { color } = useControls('text', {
    color: '#fff',
  });
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  const { opacity } = useSpring({
    opacity: hovered ? 1 : 0.35,
  });

  const works = useWorksStore((s) => s.works);

  return (
    <Suspense fallback={null}>
      <group rotation-x={angle * Math.PI * 2}>
        <group position={[-0.125, 0, 1.625]}>
          <Text
            position={[-0.25, 0.075, 0]}
            text='My Work'
            font={font}
            fontSize={0.095}
            anchorX='left'
            lineHeight={1}
            maxWidth={0.5}
            outlineColor='black'
            outlineWidth={0}
            outlineBlur={0.05}
          >
            <meshBasicMaterial color={color} side={FrontSide} />
          </Text>

          <group position={[-0.25, -0.0125, 0]}>
            {works.slice(0, 3).map((work, idx) => (
              <WorkItem key={idx} work={work} idx={idx} offset={WIDTH * idx} />
            ))}

            <Text
              text='see the rest' // →'
              position={[0.005, -WIDTH * 3, 0]}
              fontSize={0.0175}
              font={font2}
              anchorX='left'
              outlineColor='black'
              outlineWidth={'5%'}
              outlineBlur={0.0125}
              onPointerEnter={() => setHovered(true)}
              onPointerLeave={() => setHovered(false)}
            >
              <animated.meshBasicMaterial
                side={FrontSide}
                opacity={opacity}
                transparent={true}
              />
            </Text>
          </group>
        </group>
      </group>
    </Suspense>
  );
};

export default Career;
