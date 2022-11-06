import { useHomeStore, useStore } from '@/store';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap, { Power2 } from 'gsap';
import { useEffect, useRef, useLayoutEffect } from 'react';
import { damp } from 'three/src/math/MathUtils';
import shallow from 'zustand/shallow';

let lambda = 1.5;
let homePosition = useHomeStore.getState().views['home']['position'];
let homeRotation = useHomeStore.getState().views['home']['rotation'];

const Camera = () => {
  const ref = useRef();
  const introTimeline = useRef(gsap.timeline());
  const router = useStore((s) => s.router);
  const [viewManaged, currentView, prevView, experienceStarted] = useHomeStore(
    (s) => [s.viewManaged, s.currentView, s.prevView, s.experienceStarted],
    shallow
  );

  useLayoutEffect(() => {
    useHomeStore.setState({ camera: ref.current });
  }, [ref]);

  useEffect(() => {
    if (!experienceStarted || !viewManaged) return;

    let startPos = useHomeStore.getState().views[currentView].position;
    let startRot = useHomeStore.getState().views[currentView].rotation;

    let dur = prevView === 'start' ? 4 : 1;
    let delay = prevView === 'start' ? 1 : 0;

    console.log(`dur=${dur} delay=${delay}`);

    introTimeline.current
      .to(ref.current.position, {
        x: startPos.x,
        y: startPos.y,
        z: startPos.z,

        duration: dur,
        ease: Power2.easeOut,
        delay: delay,
      })
      .to(ref.current.rotation, {
        x: startRot.x,
        y: startRot.y,
        z: startRot.z,

        duration: dur,
        ease: Power2.easeOut,
        delay: -dur,
        onComplete: () => {
          useHomeStore.setState({ viewManaged: false });

          if (['about', 'works'].includes(currentView)) {
            router.push(`/${currentView}`);
          }
        },
      });
  }, [currentView, experienceStarted, viewManaged, prevView, router]);

  useFrame(({ mouse }, delta) => {
    let cam = ref.current;

    if (viewManaged || currentView !== 'home') return;

    let newPos = {
      x: homePosition.x + mouse.x * 0.25,
      y: homePosition.y + mouse.y * 0.25,
      z: homePosition.z,
    };

    // smooth animate camera position per-frame independant of frame rate
    cam.position.x = damp(cam.position.x, newPos.x, lambda, delta);
    cam.position.y = damp(cam.position.y, newPos.y, lambda, delta);
    cam.position.z = damp(cam.position.z, newPos.z, lambda, delta);

    // smooth animate camera rotation per-frame independant of frame rate
    cam.rotation.x = damp(cam.rotation.x, homeRotation.x, lambda, delta);
    cam.rotation.y = damp(cam.rotation.y, homeRotation.y, lambda, delta);
    cam.rotation.z = damp(cam.rotation.z, homeRotation.z, lambda, delta);
  });

  return (
    <>
      <PerspectiveCamera
        ref={ref}
        makeDefault={true}
        near={0.001}
        far={50}
        fov={65}
      />
    </>
  );
};

export default Camera;
