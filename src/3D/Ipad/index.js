import React, { useEffect, useRef, useMemo } from 'react';
import useStore from '../../store';
import IpadBackground from './IpadBackground';
import Works from './works';
import { gsap, Linear } from 'gsap';
import Particles from './Particles';
import About from './about';

const Ipad = (props) => {
  const ref = useRef();
  const view = useStore((state) => state.view);
  const ipadRef = useRef();
  const particlesRef = useRef();
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
  const aboutActive = useMemo(
    () => view === 'aboutEntered' || destination === 'aboutEntered',
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
        if (particlesRef.current) {
          particlesRef.current.material.opacity = spring.value;
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
  }, [destination, active]);

  useEffect(() => {
    if (ref.current && opacityTl.current) {
      if (active && leavingIpad) {
        opacityTl.current.reverse();
      }
    }
  }, [leavingIpad, active]);

  return (
    <group ref={ref}>
      {active && (
        <group>
          <IpadBackground ref={ipadRef} />
          <Particles ref={particlesRef} />
        </group>
      )}
      <Works visible={worksActive} />
      <About visible={aboutActive} />
    </group>
  );
};

export default Ipad;
