import { Text as TextImpl } from '@react-three/drei';
import font2 from '@/assets/fonts/Montserrat-Regular.ttf';
import font from '@/assets/fonts/MrsEavesRomanSmallCaps.ttf';
import fontBold from '@/assets/fonts/MrsEavesRomanBold.ttf';
import { animated } from '@react-spring/three';
import { Box, Flex, useFlexSize } from '@react-three/flex';
import Button from '../../Button';
import { useRef, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { FrontSide } from 'three';
import Layer from '../../Layer';
import { clamp } from 'three/src/math/MathUtils';
import useFullWidth from '@/hooks/useFullWidth';

const Text = animated(TextImpl);

const Info = ({ work, contentWidth, ...props }) => {
  const descRef = useRef();
  const [width, height] = useFlexSize();
  const fullWidth = useFullWidth();
  const size = useThree((s) => s.size);

  const aspect = useMemo(() => size.width / size.height, [size]);
  const isMobile = useMemo(
    () => size.width < 768 || aspect < 1,
    [size, aspect]
  );

  return (
    <group position={[0, 0, 0]}>
      <Layer layer={100}>
        <Text
          text={work.displayName}
          fontSize={clamp(fullWidth * 0.035, isMobile ? 0.03 : 0.02, 0.039)}
          position-y={isMobile ? -height : 0.0075}
          position-x={isMobile ? width * 0.5 : 0}
          lineHeight={0.9}
          font={fontBold}
          maxWidth={width}
          anchorX={isMobile ? 'center' : 'left'}
          anchorY={isMobile ? 'bottom' : 'top'}
          textAlign={isMobile ? 'center' : 'left'}
          outlineColor='black'
          outlineWidth={0}
          outlineBlur={'20%'}
          outlineOpacity={0.5}
          onSync={(text) => {
            if (descRef.current) {
              descRef.current.position.y =
                text.geometry.boundingBox.min.y - height * 0.05;
            }
          }}
        >
          <animated.meshBasicMaterial side={FrontSide} transparent={true} />
        </Text>

        {isMobile ? null : (
          <Text
            ref={descRef}
            text={work.description}
            fontSize={clamp(contentWidth * 0.0153, 0.011, 0.013)}
            lineHeight={1.2}
            font={font2}
            maxWidth={width}
            anchorX='left'
            anchorY='top'
            position-y={-0.1}
          >
            <animated.meshBasicMaterial side={FrontSide} transparent={true} />
          </Text>
        )}
      </Layer>
    </group>
  );
};

export default Info;
