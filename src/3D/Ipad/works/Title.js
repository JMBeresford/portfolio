import { Text } from '@react-three/drei';
import React, { useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import useStore from '../../../store';
import font from '../../../fonts/EBGaramond-Bold.ttf';
import { Vector3 } from 'three';
import { useSpring, animated } from '@react-spring/three';

const AnimText = animated(Text);

const Title = React.forwardRef((props, ref) => {
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
  const leavingIpad = useStore((state) => state.leavingIpad);

  const v1 = useMemo(() => new Vector3(), []);
  const size = useMemo(
    () => Math.min(Math.max(0.09, sizes.width / 5000), 0.275),
    [sizes]
  );
  const strokeSize = useMemo(() => (size < 1.2 ? 0.0015 : 0.003), [size]);

  const { opacity, strokeSizeSpring, sizeSpring, textHeight } = useSpring({
    opacity:
      view === 'worksEntered' &&
      !destination &&
      !animating &&
      !scrolled &&
      !leavingIpad
        ? viewingWork !== null || titleHovered || mobile
          ? 1.0
          : 0.5
        : 0,
    strokeSizeSpring: viewingWork === null ? strokeSize : strokeSize * 0.5,
    sizeSpring: viewingWork === null ? size : Math.max(size * 0.5, 0.08),
    textHeight: viewingWork === null ? 0 : 0.75,
    config: { duration: view === 'worksEntered' && animating ? 200 : 500 },
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
    v1.set(mouse.x * -1, mouse.y * -1, ref.current.position.z);

    let d = Math.min(1.0, v1.distanceTo(ref.current.position)) * 10000;

    d = Math.pow(d, 2);

    ref.current.position.lerp(v1, Math.max(1.0 - d, 0.0));
  });

  return (
    <AnimText
      ref={ref}
      position-y={textHeight}
      text={works[currentWork].name}
      color='white'
      position={[0, 0, -2]}
      fontSize={sizeSpring}
      font={font}
      fillOpacity={opacity}
      strokeOpacity={opacity}
      strokeColor='black'
      strokeWidth={strokeSizeSpring}
      maxWidth={sizes.width / 500}
      textAlign='center'
      onPointerEnter={(e) => handleEnterAndMove(e)}
      onPointerMove={(e) => handleEnterAndMove(e)}
      onPointerLeave={(e) => handleLeave(e)}
      onClick={(e) => handleClick(e)}
      {...props}
    />
  );
});

export default Title;
