import { animated } from '@react-spring/three';
import { Text as TextImpl } from '@react-three/drei';
import font2 from '@/assets/fonts/MrsEavesRomanBold.ttf';
import font from '@/assets/fonts/Montserrat-Regular.ttf';
import { FrontSide } from 'three';
import { clamp } from 'three/src/math/MathUtils';
import Layer from '../../Layer';
import { Form, Input, Textarea } from 'r3f-form';
import { useMemo } from 'react';
import Button from '../../Button';
import { useControls } from 'leva';

const Text = animated(TextImpl);

const Contact = ({ angle = 1, width, height, isMobile }) => {
  const headerSize = useMemo(() => clamp(width * 0.235, 0.0, 0.1), [width]);

  const fontSize = useMemo(() => clamp(width * 0.023, 0.015, 0.025), [width]);
  const gap = isMobile ? 0 : 0.025 * width;
  const inputWidth = isMobile ? width : width * 0.5 - gap;

  const { baseColor, hoverColor } = useControls('contactBtn', {
    baseColor: '#00bcff',
    hoverColor: '#9c78ff',
  });

  return (
    <group rotation-x={angle + headerSize}>
      <group position={[0, height / 2, 1.625]}>
        <Layer layer={100}>
          <Text
            text='Contact Me'
            font={font2}
            position={[-width / 2 - 0.0125, 0, 0]}
            lineHeight={0.9}
            maxWidth={width}
            textAlign={isMobile ? 'center' : 'left'}
            fontSize={headerSize}
            anchorX='left'
            anchorY='bottom'
            outlineColor='black'
            outlineWidth={0}
            outlineBlur={'20%'}
            outlineOpacity={0.5}
          >
            <meshBasicMaterial color='white' side={FrontSide} transparent />
          </Text>

          <group>
            <mesh position={[0, -0.035, 0]}>
              <planeGeometry args={[width + 0.00075 / 2, 0.00075]} />
              <meshBasicMaterial transparent opacity={0.5} />
            </mesh>
          </group>

          <group position-y={-0.125}>
            <Form action='https://formspree.io/f/myyazelp' method='POST'>
              <Input
                label='Name'
                name='name'
                position-x={isMobile ? 0 : -inputWidth / 2 - gap}
                width={inputWidth}
                padding={[0.01, 0.01]}
                backgroundOpacity={0.1}
                cursorWidth={0.001}
                textProps={{ fontSize: fontSize, font: font, color: 'white' }}
                labelProps={{
                  color: 'white',
                  font: font2,
                  fontSize: fontSize * 1.5,
                  position: [0, 0.015, 0],
                  outlineColor: 'black',
                  outlineWidth: 0,
                  outlineBlur: '20%',
                }}
              />
              <Input
                label='Email'
                name='email'
                width={inputWidth}
                position={[
                  isMobile ? 0 : -inputWidth / 2 - gap,
                  -fontSize * 5,
                  0,
                ]}
                padding={[0.01, 0.01]}
                backgroundOpacity={0.1}
                cursorWidth={0.001}
                textProps={{ fontSize: fontSize, font: font, color: 'white' }}
                labelProps={{
                  color: 'white',
                  font: font2,
                  fontSize: fontSize * 1.5,
                  position: [0, 0.015, 0],
                  outlineColor: 'black',
                  outlineWidth: 0,
                  outlineBlur: '20%',
                }}
              />

              <Textarea
                label='Message'
                name='message'
                position-x={isMobile ? 0 : inputWidth / 2 + gap}
                width={inputWidth}
                padding={[0.01, 0.01]}
                rows={5}
                backgroundOpacity={0.1}
                cursorWidth={0.001}
                textProps={{ fontSize: fontSize, font: font, color: 'white' }}
                labelProps={{
                  color: 'white',
                  font: font2,
                  fontSize: fontSize * 1.5,
                  position: [0, 0.015, 0],
                  outlineColor: 'black',
                  outlineWidth: 0,
                  outlineBlur: '20%',
                }}
              />

              <Input
                type='submit'
                value='submit'
                position={[-width / 2 + 0.15 / 2, -fontSize * 10, 0]}
              >
                <Button
                  text='Send'
                  size={[0.15, 0.05]}
                  baseOpacity={1}
                  baseColor={baseColor}
                  hoverColor={hoverColor}
                />
              </Input>
            </Form>
          </group>
        </Layer>
      </group>
    </group>
  );
};

export default Contact;
