import useStore from '@/store';
import { animated, useSpring } from '@react-spring/three';
import { Text as BaseText, useCursor } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import font from '@/assets/fonts/ProximaNovaBlack.otf';
import { useFrame } from '@react-three/fiber';

const Text = animated(BaseText);

const Title = () => {
  const ref = useRef();
  const {
    works,
    selectedWork,
    transitioningWork,
    workTitleHovered,
    workAvatarHovered,
    prevHovered,
    nextHovered,
  } = useStore();

  const workTitle = useMemo(() => {
    return works[selectedWork].displayName.toUpperCase();
  }, [works, selectedWork]);

  const hovered = useMemo(() => {
    return (
      (workTitleHovered || workAvatarHovered) && !(prevHovered || nextHovered)
    );
  }, [workTitleHovered, workAvatarHovered, prevHovered, nextHovered]);

  useCursor(hovered);

  const { fontSize, fillOpacity } = useSpring({
    fontSize: hovered ? 0.0265 : 0.025,
    fillOpacity: transitioningWork ? 0.0 : hovered ? 0.5 : 0.25,
  });

  useFrame(({ clock }) => {
    ref.current.position.x =
      Math.sin((clock.elapsedTime + 100.0) * 0.5) * 0.0025;
    ref.current.position.y =
      Math.cos((clock.elapsedTime + 100.0) * 0.5) * 0.0025;
  });

  return (
    <group ref={ref}>
      <Text
        onPointerEnter={() => {
          useStore.setState({ workTitleHovered: true });
        }}
        onPointerLeave={() => {
          useStore.setState({ workTitleHovered: false });
        }}
        position={[0.0, 0.0675, -0.025]}
        anchorY='top'
        textAlign='center'
        font={font}
        text={workTitle}
        fontSize={fontSize}
        // strokeColor='black'
        // strokeWidth='2.5%'
        // strokeOpacity={0.5}
        fillOpacity={fillOpacity}
        color='white'
        lineHeight={1}
      />
    </group>
  );
};

export default Title;
