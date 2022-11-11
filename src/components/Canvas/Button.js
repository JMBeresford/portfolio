import React, { Suspense, useState, useMemo } from 'react';
import { Text as TextImpl, useCursor } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import font from '@/assets/fonts/MrsEavesRomanSmallCaps.ttf';
import { useThree } from '@react-three/fiber';

const Text = animated(TextImpl);

const Button = ({
  size = [0.15, 0.05],
  position = [0, 0, 0],
  fontSize = 0.02,
  text,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);
  const windowSize = useThree((s) => s.size);

  const isMobile = useMemo(() => windowSize.width < 768, [windowSize]);

  useCursor(hovered);

  const { opacity } = useSpring({
    opacity: hovered ? 1 : 0.5,
  });

  return (
    <Suspense fallback={null}>
      <group position={position}>
        <mesh
          renderOrder={1}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={onClick}
        >
          <planeGeometry args={size} />
          <animated.meshBasicMaterial transparent opacity={opacity} />
        </mesh>

        <Text
          renderOrder={2}
          text={text}
          position={[0, -0.005, 0.0001]}
          color='black'
          fontSize={fontSize}
          font={font}
          textAlign='center'
          anchorY='bottom'
          anchorX='center'
          lineHeight={isMobile ? 0.016 : 0.02}
        />
      </group>
    </Suspense>
  );
};

export default Button;
