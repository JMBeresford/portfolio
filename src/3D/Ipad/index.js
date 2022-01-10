import React, { useEffect, useRef, useMemo } from 'react';
import useStore from '../../store';
import IpadBackground from './IpadBackground';
import Works from './works';
import { gsap, Linear } from 'gsap';

const Ipad = React.forwardRef((props, ref) => {
  const view = useStore((state) => state.view);
  const ipadRef = useRef();
  const destination = useStore((state) => state.destination);
  const leavingIpad = useStore((state) => state.leavingIpad);
  const opacityTl = useRef();

  const active = useMemo(
    () => ['aboutEntered', 'worksEntered', 'labEntered'].includes(view),
    [view]
  );
  const worksActive = useMemo(
    () => view === 'worksEntered' || destination === 'worksEntered',
    [view, destination]
  );
  const spring = useMemo(() => ({ value: 0 }), []);

  useEffect(() => {
    opacityTl.current = gsap.timeline({ paused: true }).to(spring, {
      value: 1,

      duration: 0.5,
      onUpdate: () => {
        if (ipadRef.current) {
          ipadRef.current.material.opacity = spring.value;
        }
      },
      ease: Linear.easeInOut,
    });

    return () => {
      if (opacityTl.current) {
        opacityTl.current.kill();
      }
    };
  }, [spring]);

  useEffect(() => {
    if (ref.current && opacityTl.current) {
      if (active && !destination) {
        opacityTl.current.play();
      }
    }
  }, [destination, ref, active]);

  useEffect(() => {
    if (ref.current && opacityTl.current) {
      if (active && leavingIpad) {
        opacityTl.current.reverse();
      }
    }
  }, [ref, leavingIpad, active]);

  return (
    <group ref={ref}>
      {active && <IpadBackground ref={ipadRef} />}
      <Works visible={worksActive} />
    </group>
  );
});

export default Ipad;
