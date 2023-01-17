import { animated } from '@react-spring/three';
import { Text as TextImpl } from '@react-three/drei';
import font from '@/assets/fonts/MrsEavesRomanSmallCaps.ttf';
import font2 from '@/assets/fonts/MrsEavesRomanBold.ttf';
import { Suspense, useMemo } from 'react';
import { useControls } from 'leva';
import { useWorksStore } from '@/store';
import { FrontSide } from 'three';
import WorkItem from '@/components/Canvas/HomeScene/WorkItem';
import { useThree } from '@react-three/fiber';
import Layer from '../../Layer';
import { clamp } from 'three/src/math/MathUtils';

const Text = animated(TextImpl);

const Work = ({ angle = 1, rotOffset, width, height, isMobile }) => {
  const works = useWorksStore((s) => s.works);
  const size = useThree((s) => s.size);

  const aspect = useMemo(() => size.width / size.height, [size]);

  const initialRotation = useMemo(
    () => angle * Math.PI * 2 + rotOffset / 2,
    [rotOffset, angle]
  );

  const { color } = useControls('text', {
    color: '#fff',
  });

  return (
    <Suspense fallback={null}>
      <group rotation-x={angle * Math.PI * 2}>
        <group position={[0, 0, 1.625]}>
          <Layer layer={100}>
            <Text
              text='Featured Work'
              position={[isMobile ? 0 : -width / 2 - 0.02, 0.05, 0]}
              lineHeight={0.9}
              maxWidth={width}
              textAlign={isMobile ? 'center' : 'left'}
              font={font2}
              fontSize={clamp(width * 0.235, 0.0, 0.1)}
              anchorX={isMobile ? 'center' : 'left'}
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
