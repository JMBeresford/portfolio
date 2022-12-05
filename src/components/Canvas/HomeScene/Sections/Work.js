import { animated } from '@react-spring/three';
import { Text as TextImpl } from '@react-three/drei';
import font from '@/assets/fonts/MrsEavesRomanSmallCaps.ttf';
import font2 from '@/assets/fonts/MrsEavesRomanBold.ttf';
import { Suspense, useCallback, useMemo, useRef, useLayoutEffect } from 'react';
import { useControls } from 'leva';
import { useWorksStore } from '@/store';
import { FrontSide } from 'three';
import WorkItem from '@/components/Canvas/HomeScene/WorkItem';
import { useThree } from '@react-three/fiber';
import Layer from '../../Layer';
import useFullWidth from '@/hooks/useFullWidth';
import { clamp } from 'three/src/math/MathUtils';

const Text = animated(TextImpl);

const Work = ({ angle = 1 }) => {
  const works = useWorksStore((s) => s.works);
  const fullWidth = useFullWidth();
  const size = useThree((s) => s.size);

  const aspect = useMemo(() => size.width / size.height, [size]);
  const isMobile = useMemo(
    () => size.width < 768 || aspect < 1,
    [size, aspect]
  );

  // const { nPlanes } = useControls('workList', {
  //   nPlanes: { value: 25, min: 0, max: 100, step: 1 },
  // });

  // parameters of n-gons stolen from:
  // https://calcresource.com/geom-ngon.html
  const nPlanes = useMemo(() => {
    if (isMobile) return 25;

    if (aspect > 2.5) {
      if (size.width > 1920) {
        return 33;
      } else {
        return 27;
      }
    } else if (aspect > 2.3) {
      return 30;
    } else if (aspect > 2) {
      return 36;
    } else if (aspect > 1.7) {
      return 40;
    } else if (aspect > 1.2) {
      return 50;
    } else {
      return 55;
    }
  }, [aspect, size, isMobile]);

  const rotOffset = useMemo(() => (Math.PI * 2) / nPlanes, [nPlanes]);
  const initialRotation = useMemo(
    () => angle * Math.PI * 2 + rotOffset / 2,
    [rotOffset, angle]
  );

  const width = useMemo(() => {
    if (size.width > 1920) {
      return fullWidth * 0.5;
    } else if (size.width > 1280) {
      return fullWidth * 0.7;
    } else if (size.width > 768) {
      return fullWidth * 0.8;
    } else {
      return fullWidth * 0.9;
    }
  }, [fullWidth, size]);

  const height = useMemo(() => {
    let r = 1.625;

    return r * 2 * Math.tan(Math.PI / nPlanes);
  }, [nPlanes]);

  const { color } = useControls('text', {
    color: '#fff',
  });

  return (
    <Suspense fallback={null}>
      <group rotation-x={angle * Math.PI * 2}>
        <group position={[0, 0, 1.625]}>
          <Layer layer={100}>
            <Text
              position={[-width / 2, 0.05, 0]}
              text='Featured Work'
              lineHeight={0.9}
              maxWidth={width}
              textAlign={isMobile ? 'center' : 'left'}
              font={font2}
              fontSize={clamp(width * 0.235, 0.0, 0.1)}
              anchorX='left'
              anchorY='bottom'
              outlineColor='black'
              outlineWidth={0}
              outlineBlur={'20%'}
              outlineOpacity={0.5}
            >
              <meshBasicMaterial color={color} side={FrontSide} transparent />
            </Text>
          </Layer>
        </group>
      </group>

      <group position={[-width / 2, 0, 0]} rotation-x={initialRotation}>
        {works.map((work, idx) => (
          <group key={idx} rotation-x={rotOffset * idx}>
            <WorkItem work={work} idx={idx} width={width} height={height} />
          </group>
        ))}
      </group>
    </Suspense>
  );
};

export default Work;
