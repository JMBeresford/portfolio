import { animated } from '@react-spring/three';
import { Text as TextImpl } from '@react-three/drei';
import font2 from '@/assets/fonts/Montserrat-Regular.ttf';
import font from '@/assets/fonts/MrsEavesRomanSmallCaps.ttf';
import { Suspense, useRef } from 'react';
import { useControls } from 'leva';
import { FrontSide } from 'three';
import { LinkedIn } from '../constellations/LinkedIn';

const Text = animated(TextImpl);

const para1 = `
If you are interested in my professional endeavors, or if you have business inquiries \
please reach out to me via LinkedIn or email. You can also follow me on other social \
media for occasional updates on projects and experiments I may be working on!
`;

const Socials = ({ angle }) => {
  const { color } = useControls('text', {
    color: '#fff',
  });

  return (
    <Suspense fallback={null}>
      <group rotation-x={angle * Math.PI * 2}>
        <group position={[0.125, 0, 1.625]}>
          <Text
            position={[-0.25, 0.075, 0]}
            text='Where I Can Be Found'
            font={font}
            color={color}
            fontSize={0.075}
            anchorX='left'
            lineHeight={1}
            maxWidth={0.5}
            outlineColor='black'
            outlineWidth={0}
            outlineBlur={0.05}
          >
            <meshBasicMaterial color={color} side={FrontSide} />
          </Text>

          <mesh position={[0, 0.005, 0.01]}>
            <planeGeometry args={[0.5, 0.00125]} />
            <meshBasicMaterial color={'white'} transparent={true} />
          </mesh>

          <group position={[-0.25, -0.0125, 0]}>
            <Text
              text={para1}
              outlineColor='black'
              outlineWidth={'5%'}
              outlineBlur={0.025}
              font={font2}
              fontSize={0.015}
              anchorY='top'
              anchorX='left'
              maxWidth={0.5}
            >
              <meshBasicMaterial color={color} side={FrontSide} />
            </Text>
          </group>
        </group>
      </group>
    </Suspense>
  );
};

export default Socials;
