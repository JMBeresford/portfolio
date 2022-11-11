import { animated, useSpring } from '@react-spring/three';
import { Text as TextImpl, useCursor, useTexture } from '@react-three/drei';
import font from '@/assets/fonts/MrsEavesRomanSmallCaps.ttf';
import { Suspense, useRef, useState, useMemo } from 'react';
import { useControls } from 'leva';
import { FrontSide } from 'three';
import twitterIcon from '@/assets/img/icons/twitter.png';
import linkedinIcon from '@/assets/img/icons/linkedin.png';
import instagramIcon from '@/assets/img/icons/instagram.png';
import { useFrame, useThree } from '@react-three/fiber';

const Text = animated(TextImpl);

const Socials = ({ angle }) => {
  const twitterRef = useRef();
  const linkedinRef = useRef();
  const instagramRef = useRef();
  const size = useThree((s) => s.size);

  const isMobile = useMemo(() => size.width < 768, [size]);

  const [twitterHovered, setTwitterHovered] = useState(false);
  const [linkedinHovered, setLinkedinHovered] = useState(false);
  const [instagramHovered, setInstagramHovered] = useState(false);

  useCursor(twitterHovered || linkedinHovered || instagramHovered);

  const { color } = useControls('text', {
    color: '#fff',
  });

  const [twitterTexture, linkedinTexture, instagramTexture] = useTexture([
    twitterIcon.src,
    linkedinIcon.src,
    instagramIcon.src,
  ]);

  const { twitterOpacity, linkedinOpacity, instagramOpacity } = useSpring({
    twitterOpacity: twitterHovered ? 1 : 0.35,
    linkedinOpacity: linkedinHovered ? 1 : 0.35,
    instagramOpacity: instagramHovered ? 1 : 0.35,
  });

  const { twitterScale, linkedinScale, instagramScale } = useSpring({
    twitterScale: twitterHovered ? 1 : 0.9,
    linkedinScale: linkedinHovered ? 1 : 0.9,
    instagramScale: instagramHovered ? 1 : 0.9,
  });

  useFrame(({ clock }) => {
    if (!twitterRef.current || !linkedinRef.current || !instagramRef.current)
      return;

    twitterRef.current.position.x =
      Math.sin((clock.elapsedTime + 100) * 0.5) * 0.0075;

    twitterRef.current.position.y =
      Math.cos((clock.elapsedTime + 105) * 0.5) * 0.005;

    linkedinRef.current.position.x =
      Math.cos((clock.elapsedTime + 110) * 0.5) * 0.0075;

    linkedinRef.current.position.y =
      Math.sin((clock.elapsedTime + 115) * 0.5) * 0.005;

    instagramRef.current.position.x =
      Math.cos((clock.elapsedTime + 132) * 0.5) * 0.0075;

    instagramRef.current.position.y =
      Math.sin((clock.elapsedTime + 141) * 0.5) * 0.005;
  });

  return (
    <Suspense fallback={null}>
      <group rotation-x={angle * Math.PI * 2}>
        <group position={[0, 0, 1.625]}>
          <Text
            position={[0, 0.075, 0]}
            text='Follow Me'
            font={font}
            color={color}
            fontSize={isMobile ? 0.075 : 0.095}
            lineHeight={1}
            outlineColor='black'
            outlineWidth={0}
            outlineBlur={0.05}
          >
            <meshBasicMaterial color={color} side={FrontSide} />
          </Text>

          <group scale={isMobile ? 0.75 : 1}>
            <group position={[0, -0.1, 0]}>
              <animated.mesh
                ref={twitterRef}
                onPointerEnter={() => setTwitterHovered(true)}
                onPointerLeave={() => setTwitterHovered(false)}
                onClick={() =>
                  window.open('https://twitter.com/__jberesford__', '_blank')
                }
                scale={twitterScale}
              >
                <planeGeometry args={[0.15, 0.15]} />
                <animated.meshBasicMaterial
                  map={twitterTexture}
                  transparent
                  opacity={twitterOpacity}
                />
              </animated.mesh>
            </group>

            <group position={[-0.2, -0.1, 0]}>
              <animated.mesh
                ref={linkedinRef}
                onPointerEnter={() => setLinkedinHovered(true)}
                onPointerLeave={() => setLinkedinHovered(false)}
                onClick={() =>
                  window.open(
                    'https://www.linkedin.com/in/jmberesford/',
                    '_blank'
                  )
                }
                scale={linkedinScale}
              >
                <planeGeometry args={[0.15, 0.15]} />
                <animated.meshBasicMaterial
                  map={linkedinTexture}
                  transparent
                  opacity={linkedinOpacity}
                />
              </animated.mesh>
            </group>

            <group position={[0.2, -0.1, 0]}>
              <animated.mesh
                ref={instagramRef}
                onPointerEnter={() => setInstagramHovered(true)}
                onPointerLeave={() => setInstagramHovered(false)}
                onClick={() =>
                  window.open(
                    'https://www.instagram.com/beresforddesign/',
                    '_blank'
                  )
                }
                scale={instagramScale}
              >
                <planeGeometry args={[0.15, 0.15]} />
                <animated.meshBasicMaterial
                  map={instagramTexture}
                  transparent
                  opacity={instagramOpacity}
                />
              </animated.mesh>
            </group>
          </group>
        </group>
      </group>
    </Suspense>
  );
};

export default Socials;
