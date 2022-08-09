import { Text as BaseText, useCursor } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import font from '@/assets/fonts/ProximaNovaBold.otf';
import useStore from '@/store';
import { useRef, forwardRef, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import gsap, { Power2 } from 'gsap';

const Text = animated(BaseText);

const PrevButton = forwardRef((props, avatarRef) => {
  const ref = useRef();
  const tl = useRef(gsap.timeline());

  const { prevHovered, actions, transitioningWork } = useStore();

  const { fillOpacity, strokeOpacity, fontSize } = useSpring({
    fillOpacity: prevHovered && !transitioningWork ? 0.1 : 0,
    strokeOpacity: prevHovered && !transitioningWork ? 0.85 : 0.45,
    fontSize: prevHovered && !transitioningWork ? 0.0155 : 0.015,
  });

  useCursor(prevHovered && !transitioningWork);

  const handleClick = useCallback(() => {
    if (transitioningWork) return;

    tl.current
      .to(avatarRef.current.material.uniforms.uTransitionPrev, {
        value: 2,

        duration: 1,
        ease: Power2.easeOut,
        onStart: () => {
          useStore.setState({ transitioningWork: true });
        },
        onComplete: () => {
          avatarRef.current.material.uTransitionPrev = 0;
          avatarRef.current.material.uTransitionNext = 2;
          actions.prevWork();
        },
      })
      .to(avatarRef.current.material.uniforms.uTransitionNext, {
        value: 0,

        duration: 1,
        ease: Power2.easeIn,
        onComplete: () => {
          useStore.setState({ transitioningWork: false });
        },
      });
  }, [transitioningWork]);

  useFrame(({ clock }) => {
    ref.current.position.x = Math.cos(clock.elapsedTime * 0.5) * 0.0025;
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.0025;
  });

  return (
    <group ref={ref}>
      <Text
        onPointerEnter={() => useStore.setState({ prevHovered: true })}
        onPointerLeave={() => useStore.setState({ prevHovered: false })}
        onClick={handleClick}
        font={font}
        position={[-0.0425, -0.0325, 0]}
        rotation-y={Math.PI / 4}
        anchorX={'right'}
        fontSize={fontSize}
        fillOpacity={fillOpacity}
        strokeColor='#fff'
        strokeWidth='3%'
        strokeOpacity={strokeOpacity}
      >
        PREV
      </Text>
    </group>
  );
});

PrevButton.displayName = 'PrevButton';

export default PrevButton;
