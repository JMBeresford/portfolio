import useStore from '@/store';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import { useRef } from 'react';
import { damp } from 'three/src/math/MathUtils';

const DELTA = 0.025;

const Camera = () => {
  const ref = useRef();
  const { views, currentView, actions, router, debug } = useStore();
  const { enteringAbout, enteringWorks, enteringLab } = useStore();

  // initial camera position on page load
  useEffect(() => {
    let initialView =
      router.asPath === '/' ? views[actions.getLastView()] : views['origin'];

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
  }, [router.asPath, views, actions]);

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

    if (!cam || debug) return;

    // longer animation for first view
    let lastView = actions.getLastView();
    let lambda = lastView === 'start' ? 0.8 : currentView === 'home' ? 1.5 : 4;

    let newPos =
      currentView === 'home'
        ? {
            x: viewPosition.x + mouse.x * 0.25,
            y: viewPosition.y + mouse.y * 0.25,
            z: viewPosition.z,
          }
        : viewPosition;

    if (router.asPath !== '/') {
      return;
    }

    // smooth animate camera position per-frame independant of frame rate
    cam.position.x = damp(cam.position.x, newPos.x, lambda, delta);
    cam.position.y = damp(cam.position.y, newPos.y, lambda, delta);
    cam.position.z = damp(cam.position.z, newPos.z, lambda, delta);

    // smooth animate camera rotation per-frame independant of frame rate
    cam.rotation.x = damp(cam.rotation.x, viewRotation.x, lambda, delta);
    cam.rotation.y = damp(cam.rotation.y, viewRotation.y, lambda, delta);
    cam.rotation.z = damp(cam.rotation.z, viewRotation.z, lambda, delta);

    if (
      currentView === 'about' &&
      !enteringAbout &&
      cam.position.distanceTo(views.about.position) < DELTA
    ) {
      useStore.setState({ enteringAbout: true });
    }

    if (
      currentView === 'works' &&
      !enteringWorks &&
      cam.position.distanceTo(views.works.position) < DELTA
    ) {
      useStore.setState({ enteringWorks: true });
    }
  });

  return (
    <>
      <PerspectiveCamera ref={ref} makeDefault near={0.001} far={50} fov={65} />
    </>
  );
};

export default Camera;
