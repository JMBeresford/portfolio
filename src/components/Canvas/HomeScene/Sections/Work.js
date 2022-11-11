import { animated } from '@react-spring/three';
import { Text as TextImpl } from '@react-three/drei';
import font2 from '@/assets/fonts/Montserrat-Regular.ttf';
import font from '@/assets/fonts/MrsEavesRomanSmallCaps.ttf';
import { Suspense, useCallback, useMemo } from 'react';
import { useControls } from 'leva';
import { useStore, useWorksStore } from '@/store';
import { FrontSide } from 'three';
import WorkItem from '@/components/Canvas/WorkItem';
import { useThree } from '@react-three/fiber';
import { Box, Flex } from '@react-three/flex';
import Button from '../../Button';

const Text = animated(TextImpl);

const HEIGHT = 0.06;

const Work = ({ angle = 1 }) => {
  const router = useStore((s) => s.router);
  const works = useWorksStore((s) => s.works);
  const size = useThree((s) => s.size);

  const isMobile = useMemo(() => size.width < 768, [size]);
  const width = useMemo(() => (isMobile ? 0.4 : 0.55), [isMobile]);

  const { color } = useControls('text', {
    color: '#fff',
  });

  const handleNavigate = useCallback(
    (route) => {
      useStore.setState({ transitioning: true });

      setTimeout(() => router.push(route), 350);
    },
    [router]
  );

  return (
    <Suspense fallback={null}>
      <group rotation-x={angle * Math.PI * 2}>
        <group position={[-width / 2, 0, 1.625]}>
          <Text
            position={[0, 0.075, 0]}
            text='Recent Work'
            font={font}
            fontSize={isMobile ? 0.06 : 0.095}
            anchorX='left'
            lineHeight={1}
            outlineColor='black'
            outlineWidth={0}
            outlineBlur={0.05}
          >
            <meshBasicMaterial color={color} side={FrontSide} />
          </Text>

          <group position={[0, -0.0125, 0]}>
            {works.slice(0, 3).map((work, idx) => (
              <WorkItem
                key={idx}
                work={work}
                idx={idx}
                offset={HEIGHT * idx}
                width={width}
              />
            ))}

            <Flex
              position-y={-HEIGHT * 3}
              size={[width, 0.0, 0]}
              flexDirection='row'
              justify='space-between'
            >
              <Box centerAnchor>
                <Button
                  text='see the rest'
                  onClick={() => handleNavigate('/works')}
                />
              </Box>
              <Box centerAnchor>
                <Button
                  text='visit my lab'
                  onClick={() =>
                    window.open('https://lab.john-beresford.com', '_blank')
                  }
                />
              </Box>
            </Flex>
          </group>
        </group>
      </group>
    </Suspense>
  );
};

export default Work;
