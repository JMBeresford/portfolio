import React, { Suspense, useState, useMemo } from 'react';
import { Text as TextImpl, useCursor } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import font from '@/assets/fonts/MrsEavesRomanSmallCaps.ttf';
import { useThree } from '@react-three/fiber';
import Layer from './Layer';

const Text = animated(TextImpl);

const Button = ({
  size = [0.15, 0.05],
  position = [0, 0, 0],
  fontSize = 0.02,
  text,
  baseOpacity = 0.5,
  hoverOpacity = 1,
  onClick,
  baseColor = '#ffffff',
  hoverColor = '#ffffff',
}) => {
  const [hovered, setHovered] = useState(false);
  const windowSize = useThree((s) => s.size);

  useCursor(hovered);

  const { opacity, scale, color } = useSpring({
    opacity: hovered ? hoverOpacity : baseOpacity,
    scale: hovered ? 1.1 : 1,
    color: hovered ? hoverColor : baseColor,
  });

  return (
    <Suspense fallback={null}>
      <animated.group position={position} scale={scale}>
        <mesh
          renderOrder={1}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={onClick}
        >
          <planeGeometry args={size} />
          <animated.meshBasicMaterial
            transparent
            opacity={opacity}
            color={color}
          />
        </mesh>

        <Layer layer={200}>
          <Text
            renderOrder={2}
            text={text}
            position={[0, -0.0025, 0.0001]}
            color='black'
            fontSize={fontSize}
            font={font}
            textAlign='center'
            anchorY='center'
            anchorX='center'
            lineHeight={fontSize}
          />
        </Layer>
      </animated.group>
    </Suspense>
  );
};

export default Button;
