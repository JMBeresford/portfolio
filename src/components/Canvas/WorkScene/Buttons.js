import { useThree } from '@react-three/fiber';
import { Box, Flex } from '@react-three/flex';
import { useMemo } from 'react';
import Button from '../Button';

const Buttons = ({ work }) => {
  const size = useThree((s) => s.size);
  const viewport = useThree((s) => s.viewport);

  const isMobile = useMemo(() => size.width < 768, [size]);
  const width = useMemo(() => (isMobile ? 0.12 : 0.17), [isMobile]);
  const height = useMemo(() => (isMobile ? 0.035 : 0.05), [isMobile]);
  const containerWidth = useMemo(
    () => Math.min(viewport.width * 0.17, width * 3.1),
    [width, viewport]
  );

  return (
    <Flex
      size={[containerWidth, 0.1, 0]}
      position={[-containerWidth / 2, 0.0525, 0.01]}
      flexDirection='row'
      alignItems='center'
      justifyContent='center'
      wrap='wrap'
    >
      {work.live && (
        <Box width={width} centerAnchor marginBottom={0.015}>
          <Button
            size={[width * 0.9, height * 0.9]}
            text='Visit Site'
            onClick={() => window.open(work.live, '_blank')}
            fontSize={isMobile ? 0.016 : 0.02}
          />
        </Box>
      )}
      {work.source && (
        <Box width={width} centerAnchor marginBottom={0.015}>
          <Button
            size={[width * 0.9, height * 0.9]}
            text='View Code'
            onClick={() => window.open(work.source, '_blank')}
            fontSize={isMobile ? 0.016 : 0.02}
          />
        </Box>
      )}
      {work.case && (
        <Box width={width} centerAnchor marginBottom={0.015}>
          <Button
            size={[width * 0.9, height * 0.9]}
            text='Case Study'
            onClick={() => window.open(work.case, '_blank')}
            fontSize={isMobile ? 0.016 : 0.02}
          />
        </Box>
      )}
    </Flex>
  );
};

export default Buttons;
