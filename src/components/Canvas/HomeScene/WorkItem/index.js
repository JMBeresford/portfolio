import { animated, useSpring } from '@react-spring/three';
import {
  Image as ImageImpl,
  Text as TextImpl,
  useTexture,
} from '@react-three/drei';
import font2 from '@/assets/fonts/Montserrat-Regular.ttf';
import font from '@/assets/fonts/MrsEavesRomanSmallCaps.ttf';
import fontBold from '@/assets/fonts/MrsEavesRomanBold.ttf';
import { CustomBlending, FrontSide, MaxEquation } from 'three';
import { useState, useCallback, useMemo, useRef } from 'react';
import { useHomeStore, useStore } from '@/store';
import Button from '../../Button';
import { Box, Flex } from '@react-three/flex';
import { useThree } from '@react-three/fiber';
import Info from './Info';
import Layer from '../../Layer';
import Buttons from './Buttons';

const Text = animated(TextImpl);
const Image = animated(ImageImpl);

const WorkItem = ({
  work,
  width = 0.75,
  height = 0.25,
  idx,
  offset,
  ...props
}) => {
  const size = useThree((s) => s.size);
  const router = useStore((s) => s.router);
  const even = useMemo(() => idx % 2 === 0, [idx]);
  const aspect = useMemo(() => size.width / size.height, [size]);
  const isMobile = useMemo(
    () => size.width < 768 || aspect < 1,
    [size, aspect]
  );

  const map = useTexture(work.images[0]);

  const handleClick = useCallback(() => {
    useStore.setState({ transitioning: true });

    setTimeout(() => router.push(`/works/${work.name}`), 350);
  }, [router, work]);

  return (
    <group position={[0, 0, 1.625]}>
      <group position-y={height / 2}>
        <Flex
          size={[width, height, 0]}
          flexDirection={isMobile ? 'column' : even ? 'row-reverse' : 'row'}
          paddingTop={isMobile ? height * 0.05 : height * 0.1}
          paddingBottom={isMobile ? height * 0.05 : height * 0.1}
          alignItems='center'
          justify={isMobile ? 'space-around' : 'space-between'}
        >
          <Box
            width={isMobile ? '100%' : '30%'}
            height={isMobile ? '10%' : '100%'}
            marginRight={isMobile ? 0 : width * 0.025}
          >
            <Info work={work} contentWidth={width} even={even} />
            {isMobile ? null : <Buttons work={work} contentWidth={width} />}
          </Box>
          <Box
            width={isMobile ? '100%' : '62.5%'}
            height={isMobile ? '50%' : '100%'}
            centerAnchor
          >
            {(boxWidth, boxHeight) => (
              <Layer layer={100}>
                <Image
                  alt='screenshot'
                  texture={map}
                  scale={[boxWidth, boxHeight, 0]}
                  toneMapped={false}
                />
              </Layer>
            )}
          </Box>
          {isMobile ? (
            <Box width='100%' height='20%'>
              <Buttons work={work} contentWidth={width} />
            </Box>
          ) : null}
        </Flex>

        <animated.group>
          <animated.mesh position={[width / 2, 0, 0]}>
            <planeGeometry args={[width + 0.00075 / 2, 0.00075]} />
            <animated.meshBasicMaterial transparent opacity={0.05} />
          </animated.mesh>
        </animated.group>
        {/* {isMobile ? null : (
          <Text
            text={work.year}
            position={[even ? 0 : width, -0.01, 0]}
            fontSize={0.0245 * width}
            font={font}
            anchorX={even ? 'left' : 'right'}
            anchorY='top'
            outlineColor='black'
            outlineWidth={0}
            outlineBlur={'20%'}
            outlineOpacity={0.5}
          >
            <animated.meshBasicMaterial side={FrontSide} transparent={true} />
          </Text>
        )} */}
      </group>
    </group>
  );
};

export default WorkItem;
