import { useStore } from '@/store';
import { useThree } from '@react-three/fiber';
import { Box, Flex, useFlexSize } from '@react-three/flex';
import { useCallback, useMemo } from 'react';
import { clamp } from 'three/src/math/MathUtils';
import Button from '../../Button';
import Layer from '../../Layer';

const Buttons = ({ work, contentWidth, ...props }) => {
  const [width, height] = useFlexSize();
  const size = useThree((s) => s.size);
  const router = useStore((s) => s.router);

  const aspect = useMemo(() => size.width / size.height, [size]);
  const isMobile = useMemo(
    () => size.width < 768 || aspect < 1,
    [size, aspect]
  );

  const buttonSize = useMemo(
    () => [
      aspect > 1 ? (width / 2) * 0.9 : width,
      (height / (isMobile ? 2 : 6)) * 0.9,
    ],
    [aspect, width, height, isMobile]
  );

  const handleClick = useCallback(() => {
    useStore.setState({ transitioning: true });

    setTimeout(() => router.push(`/works/${work.name}`), 350);
  }, [router, work]);

  return (
    <Flex
      position={[0, 0, 0]}
      flexDirection={aspect > 1 ? 'row' : 'column'}
      size={[width, height, 0]}
      justify={'space-between'}
      align={isMobile ? 'center' : 'flex-end'}
    >
      <Box centerAnchor>
        <Button
          text={'See More'}
          size={buttonSize}
          fontSize={clamp(0.02 * contentWidth, 0.01125, 0.018)}
          baseOpacity={1}
          onClick={() => handleClick()}
        />
      </Box>
      {work.live ? (
        <Box centerAnchor>
          <Layer layer={100}>
            <Button
              text={'Visit Site'}
              size={buttonSize}
              fontSize={clamp(0.02 * contentWidth, 0.01125, 0.018)}
              onClick={() => window.open(work.live, '_blank')}
            />
          </Layer>
        </Box>
      ) : null}
    </Flex>
  );
};

export default Buttons;
