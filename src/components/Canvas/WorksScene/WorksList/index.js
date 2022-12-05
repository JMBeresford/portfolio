import WorkItem from '@/components/Canvas/HomeScene/WorkItem';
import { useWorksStore } from '@/store';
import { animated, useSpring } from '@react-spring/three';
import { Text as TextImpl } from '@react-three/drei';
import font2 from '@/assets/fonts/Montserrat-Regular.ttf';
import font from '@/assets/fonts/MrsEavesRomanSmallCaps.ttf';
import { FrontSide } from 'three';
import { useRef, useCallback } from 'react';
import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { damp } from 'three/src/math/MathUtils';
import { useMemo } from 'react';

const Text = animated(TextImpl);

const HEIGHT = 0.06;

const WorksList = () => {
  const ref = useRef();
  const scrollRef = useRef(0);
  const touchRef = useRef(0);
  const works = useWorksStore((s) => s.works);
  const size = useThree((s) => s.size);

  const isMobile = useMemo(() => size.width < 768, [size]);
  const width = useMemo(() => (isMobile ? 0.4 : 0.55), [isMobile]);

  useEffect(() => {
    const handleScroll = (e) => {
      scrollRef.current += e.deltaY * 0.00035;
      scrollRef.current = Math.max(0, scrollRef.current);
      scrollRef.current = Math.min(HEIGHT * works.length, scrollRef.current);
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [works]);

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
      scrollRef.current += dy * 0.00095;
      scrollRef.current = Math.max(0, scrollRef.current);
      scrollRef.current = Math.min(HEIGHT * works.length, scrollRef.current);
      touchRef.current = touch.clientY;
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [works]);

  useFrame(({ camera }, delta) => {
    camera.position.y = damp(camera.position.y, -scrollRef.current, 16, delta);
  });

  return (
    <group ref={ref} position={[-width / 2, isMobile ? 0.125 : 0, 1.625]}>
      <Text
        position={[0, 0.075, 0]}
        text='My Works'
        font={font}
        fontSize={0.095}
        anchorX='left'
        lineHeight={1}
        outlineColor='black'
        outlineWidth={0}
        outlineBlur={0.05}
      >
        <meshBasicMaterial side={FrontSide} />
      </Text>

      <group>
        {works.map((work, idx) => (
          <WorkItem
            key={idx}
            work={work}
            idx={idx}
            offset={HEIGHT * idx}
            width={width}
          />
        ))}
      </group>
    </group>
  );
};

export default WorksList;
