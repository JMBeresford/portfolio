import { Text } from '@react-three/drei';
import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import useStore from '../../../store';
import font from '../../../fonts/EBGaramond-Bold.ttf';
import { Vector3 } from 'three';
import { useSpring, animated } from '@react-spring/three';

const AnimText = animated(Text);

const Title = React.forwardRef((props, ref) => {
  const wrapperRef = useRef();

  const sizes = useThree((state) => state.size);

  const works = useStore((state) => state.works);
  const currentWork = useStore((state) => state.currentWork);
  const viewingWork = useStore((state) => state.viewingWork);
  const view = useStore((state) => state.view);
  const destination = useStore((state) => state.destination);
  const animating = useStore((state) => state.animating);
  const mobile = useStore((state) => state.mobile);
  const carousel = useStore((state) => state.carousel);
  const titleHovered = useStore((state) => state.titleHovered);
  const scrolled = useStore((state) => state.scrolled);
  const domElement = useStore((state) => state.domElement);
  const leavingIpad = useStore((state) => state.leavingIpad);

  const v1 = useMemo(() => new Vector3(), []);
  const size = useMemo(
    () => Math.min(Math.max(0.11, sizes.width / 5000), 0.275),
    [sizes]
  );
  const strokeSize = useMemo(() => (size < 1.2 ? 0.0015 : 0.003), [size]);

  const { opacity, outlineOpacity, sizeSpring, textHeight } = useSpring({
    opacity:
      view === 'worksEntered' &&
      !destination &&
      !animating &&
      !scrolled &&
      !leavingIpad
        ? viewingWork !== null || titleHovered || mobile
          ? 1.0
          : 0.75
        : 0,
    outlineOpacity:
      view === 'worksEntered' &&
      !destination &&
      !animating &&
      !scrolled &&
      !leavingIpad
        ? viewingWork !== null || titleHovered || mobile
          ? 0.5
          : 0.25
        : 0,
    strokeSizeSpring: viewingWork === null ? strokeSize : strokeSize * 0.5,
    sizeSpring:
      viewingWork === null
        ? titleHovered
          ? size * 1.1
          : size
        : Math.max(size * 0.5, 0.08),
    textHeight: viewingWork === null ? 0 : 0.75,
    config: {
      duration:
        view === 'worksEntered' && animating ? 200 : titleHovered ? 200 : 500,
    },
  });

  const handleEnterAndMove = (e) => {
    if (
      view !== 'worksEntered' ||
      destination ||
      mobile ||
      animating ||
      viewingWork !== null
    )
      return;

    useStore.setState({ intersecting: true, titleHovered: true });
  };

  const handleLeave = (e) => {
    if (
      view !== 'worksEntered' ||
      destination ||
      mobile ||
      animating ||
      viewingWork !== null
    )
      return;

    useStore.setState({ intersecting: false, titleHovered: false });
  };

  const handleClick = (e) => {
    if (view !== 'worksEntered' || destination || animating || !carousel)
      return;

    if (carousel.material.uLeft < 0.1 && carousel.material.uRight < 0.1) {
      useStore.setState({
        viewingWork: currentWork,
        intersecting: false,
      });
    }
  };

  useFrame(({ mouse }) => {
    if (domElement && domElement.scrollTop > 50) {
      if (!scrolled) {
        useStore.setState({ scrolled: true });
      }
    } else {
      if (scrolled) {
        useStore.setState({ scrolled: false });
      }
    }

    v1.set(mouse.x * -0.1, mouse.y * -0.1, wrapperRef.current.position.z);

    wrapperRef.current.position.lerp(v1, 0.035);
  });

  return (
    <group ref={wrapperRef}>
      <AnimText
        ref={ref}
        position-y={textHeight}
        text={works[currentWork].name}
        color='white'
        position={[0, 0, -2]}
        fontSize={sizeSpring}
        font={font}
        fillOpacity={opacity}
        outlineColor='black'
        outlineOpacity={outlineOpacity}
        outlineBlur='12%'
        maxWidth={sizes.width / 500}
        textAlign='center'
        onPointerEnter={(e) => handleEnterAndMove(e)}
        onPointerMove={(e) => handleEnterAndMove(e)}
        onPointerLeave={(e) => handleLeave(e)}
        onClick={(e) => handleClick(e)}
        {...props}
      />
    </group>
  );
});

export default Title;
