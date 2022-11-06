import { animated, useSpring } from '@react-spring/three';
import { Text as TextImpl, useCursor } from '@react-three/drei';
import font2 from '@/assets/fonts/Montserrat-Regular.ttf';
import font from '@/assets/fonts/MrsEavesRomanSmallCaps.ttf';
import { FrontSide } from 'three';
import { useState, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import WorkImage from './WorkImage';

const Text = animated(TextImpl);

const WorkItem = ({ work, width = 0.75, idx, offset, ...props }) => {
  const [hovered, setHovered] = useState(false);
  const [imageIdx, setImageIdx] = useState(
    Math.floor(Math.random() * (work.images.length - 1))
  );

  useCursor(hovered);

  const { opacity, scaleX } = useSpring({
    opacity: hovered ? 1 : 0.35,
    scaleX: hovered ? 1 : 0,
  });

  return (
    <group position={[0, -offset, 0]}>
      <Text
        text={work.displayName}
        fontSize={0.03}
        font={font2}
        anchorX='left'
        outlineColor='black'
        outlineWidth={'5%'}
        outlineBlur={0.025}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => {
          setHovered(false);
          setImageIdx((prev) => (prev + 1) % work.images.length);
        }}
      >
        <animated.meshBasicMaterial
          side={FrontSide}
          // color={color}
          opacity={opacity}
          transparent={true}
        />
      </Text>

      <animated.group scale-x={1}>
        <animated.mesh position={[width / 2, -0.025, 0]}>
          <planeGeometry args={[width, 0.00125]} />
          <animated.meshBasicMaterial opacity={opacity} transparent={true} />
        </animated.mesh>
      </animated.group>

      {work.images.map((image, idx) => (
        <WorkImage
          key={idx}
          currentImage={imageIdx === idx}
          hovered={hovered}
          imagePath={image}
        />
      ))}

      <Text
        text={idx}
        position-x={width}
        fontSize={0.02}
        font={font}
        anchorX='right'
        outlineColor='black'
        outlineWidth={'5%'}
        outlineBlur={0.025}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => {
          setHovered(false);
          setImageIdx((prev) => (prev + 1) % work.images.length);
        }}
      >
        <animated.meshBasicMaterial
          side={FrontSide}
          // color={color}
          opacity={opacity}
          transparent={true}
        />
      </Text>
    </group>
  );
};

export default WorkItem;
