import useStore from '@/store';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useLayoutEffect, useMemo } from 'react';
import { useRef } from 'react';
import { damp } from 'three/src/math/MathUtils';

const Camera = () => {
  const ref = useRef();
  const { views, currentView, viewHistory } = useStore();

  useLayoutEffect(() => {
    let initialView = views['start'];

    ref.current.position.set(
      initialView.position.x,
      initialView.position.y,
      initialView.position.z
    );
    ref.current.rotation.set(
      initialView.rotation.x,
      initialView.rotation.y,
      initialView.rotation.z
    );
  }, []);

  const viewPosition = useMemo(() => {
    const view = views[currentView];
    return view.position;
  }, [currentView, views]);

  const viewRotation = useMemo(() => {
    const view = views[currentView];
    return view.rotation;
  }, [currentView, views]);

  useFrame(({ mouse }, delta) => {
    let cam = ref.current;

    if (!cam) return;

    let lastView = viewHistory[viewHistory.length - 1];
    let lambda = lastView === 'start' ? 0.8 : 1.5;

    let newPos =
      currentView === 'home'
        ? {
            x: viewPosition.x + mouse.x * 0.25,
            y: viewPosition.y + mouse.y * 0.25,
            z: viewPosition.z,
          }
        : viewPosition;

    // smooth animate camera position per-frame independant of frame rate
    cam.position.x = damp(cam.position.x, newPos.x, lambda, delta);
    cam.position.y = damp(cam.position.y, newPos.y, lambda, delta);
    cam.position.z = damp(cam.position.z, newPos.z, lambda, delta);

    // smooth animate camera rotation per-frame independant of frame rate
    cam.rotation.x = damp(cam.rotation.x, viewRotation.x, lambda, delta);
    cam.rotation.y = damp(cam.rotation.y, viewRotation.y, lambda, delta);
    cam.rotation.z = damp(cam.rotation.z, viewRotation.z, lambda, delta);
  });

  return (
    <PerspectiveCamera
      ref={ref}
      makeDefault={true}
      near={0.001}
      far={5}
      fov={65}
    />
  );
};

export default Camera;
