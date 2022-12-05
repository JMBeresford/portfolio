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
import useVW from '@/hooks/useVW';
import { clamp } from 'three/src/math/MathUtils';
import Layer from '../../Layer';
import useFullWidth from '@/hooks/useFullWidth';

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
  const timeline = useRef(gsap.timeline());
  const [desc, setDesc] = useState(0);
  const vw = useVW();
  const fullWidth = useFullWidth();

  const { color } = useControls('text', {
    color: '#fff',
  });

  const introDone = useHomeStore((s) => s.introDone);

  const { opacity } = useSpring({
    opacity: introDone ? 1 : 0,
  });

  const { width } = useSpring({
    width: introDone ? 1 : 0,
    config: config.molasses,
  });

  const headerSize = useMemo(() => clamp(2 * vw + 0.02, 0.05, 0.09), [vw]);
  const descSize = useMemo(() => clamp(0.4 * vw + 0.01, 0.018, 0.022), [vw]);
  const barSize = useMemo(
    () => clamp(1.65 * vw + 0.02, 0.04, 0.09) * 5.75,
    [vw]
  );

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
      <Layer layer={100}>
        <group position={[0, 0, 1.625]}>
          <Text
            text='John Beresford'
            font={font}
            outlineColor='black'
            outlineWidth={0}
            outlineBlur={'20%'}
            maxWidth={fullWidth * 0.9}
            textAlign='center'
            fontSize={headerSize}
            anchorY='bottom'
            outlineOpacity={0.5}
          >
            <animated.meshBasicMaterial
              color={color}
              side={FrontSide}
              transparent
              opacity={opacity}
            />
          </Text>

          <animated.mesh position={[0, 0.005, 0.01]} scale-x={width}>
            <planeGeometry args={[barSize, 0.00125]} />
            <meshBasicMaterial color={'white'} transparent={true} />
          </animated.mesh>

          <Text
            ref={descRef}
            text={DESCRIPTIONS[desc]}
            font={font2}
            fontSize={descSize}
            anchorY='top'
            outlineColor='black'
            outlineWidth={0}
            outlineBlur={'20%'}
            color={color}
            fillOpacity={opacity}
            outlineOpacity={opacity}
          >
            <meshBasicMaterial color={color} side={FrontSide} />
          </Text>
        </group>
      </Layer>
    </Suspense>
  );
};

export default Introduction;
