import { animated, config, useSpring } from '@react-spring/three';
import { Text as TextImpl } from '@react-three/drei';
import font2 from '@/assets/fonts/Montserrat-Regular.ttf';
import font from '@/assets/fonts/MrsEavesRomanSmallCaps.ttf';
import { Suspense, useRef, useState } from 'react';
import { useControls } from 'leva';
import { useHomeStore } from '@/store';
import { FrontSide } from 'three';
import { gsap, Power1 } from 'gsap';
import { useCallback } from 'react';
import { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';

const Text = animated(TextImpl);

const DESCRIPTIONS = [
  'creative developer',
  'software engineer',
  'multi-disciplinary designer',
  'digital artist',
  'definitely human',
  'based in california',
  'over 6 feet tall',
  'VFX enthusiast',
  'legendary pokemon',
  'played the piano once',
  'tweets semi-annually',
  'computer scientist',
  'not the footballer',
];

const Introduction = () => {
  const descRef = useRef();
  const size = useThree((s) => s.size);
  const viewport = useThree((s) => s.viewport);
  const timeline = useRef(gsap.timeline());
  const [desc, setDesc] = useState(0);

  const { color } = useControls('text', {
    color: '#fff',
  });

  const introDone = useHomeStore((s) => s.introDone);
  const isMobile = useMemo(() => size.width < 768, [size]);

  const { opacity } = useSpring({
    opacity: introDone ? 1 : 0,
  });

  const { width } = useSpring({
    width: introDone ? 1 : 0,
    config: config.molasses,
  });

  const nextDesc = useCallback(() => {
    if (!timeline.current) return;

    timeline.current.clear();
    timeline.current
      .to(descRef.current.material, {
        opacity: 0,

        duration: 0.5,
        ease: Power1.easeOut,
        onComplete: () => {
          setDesc((prev) => {
            return (prev + 1) % DESCRIPTIONS.length;
          });
        },
      })
      .to(descRef.current.material, {
        opacity: 1,
        duration: 0.5,
        delay: 0.2,
        ease: Power1.easeIn,
      });
  }, [setDesc]);

  useEffect(() => {
    const id = setInterval(nextDesc, 5200);

    return () => {
      clearInterval(id);
    };
  }, [nextDesc]);

  return (
    <Suspense fallback={null}>
      <group position={[0, 0, 1.625]}>
        <Text
          text='John Beresford'
          font={font}
          outlineColor='black'
          outlineWidth={0}
          outlineBlur={0.05}
          maxWidth={isMobile ? viewport.width * 0.2 : 1}
          textAlign='center'
          fontSize={isMobile ? 0.08 : 0.1}
          anchorY='bottom'
          fillOpacity={opacity}
          outlineOpacity={opacity}
        >
          <meshBasicMaterial color={color} side={FrontSide} />
        </Text>

        <animated.mesh position={[0, 0.005, 0.01]} scale-x={width}>
          <planeGeometry args={[isMobile ? 0.25 : 0.5, 0.00125]} />
          <meshBasicMaterial color={'white'} transparent={true} />
        </animated.mesh>

        <Text
          ref={descRef}
          text={DESCRIPTIONS[desc]}
          font={font2}
          fontSize={isMobile ? 0.03 : 0.035}
          anchorY='top'
          outlineColor='black'
          outlineWidth={'5%'}
          outlineBlur={0.025}
          color={color}
          fillOpacity={opacity}
          outlineOpacity={opacity}
        >
          <meshBasicMaterial color={color} side={FrontSide} />
        </Text>
      </group>
    </Suspense>
  );
};

export default Introduction;
