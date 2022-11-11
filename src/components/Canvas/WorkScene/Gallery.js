import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Box, Flex } from '@react-three/flex';
import { useMemo, useRef, useState, useEffect } from 'react';
import { damp } from 'three/src/math/MathUtils';
import Layer from '../Layer';

const ASPECT = 1368 / 1069;

const Gallery = ({ images }) => {
  const scrollRef = useRef(0);
  const touchRef = useRef(0);
  const size = useThree((s) => s.size);
  const viewport = useThree((s) => s.viewport);
  const textures = useTexture(images);
  const [containerHeight, setContainerHeight] = useState(0);

  const containerWidth = useMemo(() => viewport.width * 0.15, [viewport]);
  const width = useMemo(() => Math.min(viewport.width * 0.16, 0.3), [viewport]);
  const height = useMemo(() => width / ASPECT, [width]);
  const isMobile = useMemo(() => size.width < 768, [size]);

  useEffect(() => {
    const handleScroll = (e) => {
      e.stopPropagation();

      scrollRef.current -= e.deltaY * 0.0005;
      scrollRef.current = Math.min(0, scrollRef.current);
      scrollRef.current = Math.max(-containerHeight, scrollRef.current);
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [containerHeight]);

  useEffect(() => {
    const handleTouchStart = (e) => {
      e.stopPropagation();
      let touch = e.touches[0];
      touchRef.current = touch.clientY;
    };

    const handleTouchMove = (e) => {
      e.stopPropagation();
      e.preventDefault();
      let touch = e.touches[0];
      let dy = touchRef.current - touch.clientY;
      scrollRef.current -= dy * 0.00125;
      scrollRef.current = Math.min(0, scrollRef.current);
      scrollRef.current = Math.max(-containerHeight, scrollRef.current);
      touchRef.current = touch.clientY;
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerHeight]);

  useFrame(({ camera }, delta) => {
    camera.position.y = damp(camera.position.y, scrollRef.current, 16, delta);
  });

  return (
    <Layer layer={100}>
      <Flex
        onReflow={(_, totalHeight) => setContainerHeight(totalHeight)}
        position={[-containerWidth / 2, isMobile ? -0.2 : -0.15, 0]}
        size={[containerWidth, 100, 0]}
        flexDirection='row'
        justifyContent='center'
        alignItems='flex-start'
        wrap='wrap'
      >
        {textures.map((t, idx) => (
          <Box
            width={width}
            height={height}
            margin={0.003}
            key={idx}
            centerAnchor
          >
            <mesh>
              <planeGeometry args={[width, height]} />
              <meshBasicMaterial transparent map={t} toneMapped={false} />
            </mesh>
          </Box>
        ))}
      </Flex>
    </Layer>
  );
};

export default Gallery;
