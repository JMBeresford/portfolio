import React, { useEffect, useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import useStore from '../store';
import { Vector3 } from 'three';
import { gsap, Linear } from 'gsap';
import { useThree } from '@react-three/fiber';

let _v1 = new Vector3();
let _v2 = new Vector3();
let _p = new Vector3();
let _r = new Vector3();

const Camera = (props) => {
  const ref = useRef();
  const destination = useStore((state) => state.destination);
  const view = useStore((state) => state.view);
  const getView = useStore((state) => state.actions.getView);
  const setView = useStore((state) => state.actions.setView);
  const { viewport } = useThree();
  const tl = gsap.timeline();

  const { position, rotation } = getView('start');

  // INIT
  useEffect(() => {
    useStore.setState({ camera: ref.current });

    ref.current.rotation.reorder('YXZ');

    if (useStore.getState().debug.active) {
      const CONFIG = {
        camera: {
          position: {
            x: ref.current.position.x,
            y: ref.current.position.y,
            z: ref.current.position.z,
          },
          rotation: {
            x: ref.current.rotation.x,
            y: ref.current.rotation.y,
            z: ref.current.rotation.z,
          },
        },
      };

      let pane = useStore.getState().debug.pane;

      let camFolder = pane.addFolder({ title: 'Camera', expanded: false });

      camFolder.addInput(CONFIG.camera, 'position').on('change', (e) => {
        let { x, y, z } = e.value;

        ref.current.position.set(x, y, z);
      });

      camFolder.addInput(CONFIG.camera, 'rotation').on('change', (e) => {
        let { x, y, z } = e.value;

        ref.current.rotation.set(x, y, z);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle view change request
  useEffect(() => {
    if (destination !== null && destination !== view) {
      let curView = getView(view);
      let { position, rotation } = getView(destination);

      _p.set(...position);

      // aspect correction for view
      if (!useStore.getState().mobile) {
        _p.z += 0.1 / (viewport.aspect * 0.1225);
      }

      _v1.set(...curView.position);

      let d = _v1.distanceTo(_p) * 2;

      if (view === 'start') {
        d *= 4;
      }

      var delay = 0;

      if (['aboutEntered', 'worksEntered', 'labEntered'].includes(view)) {
        delay = 0.5;
      }

      let spring = { value: 0 };
      _r.set(...rotation);
      ref.current.rotation.toVector3(_v2);

      tl.to(spring, {
        value: 1,

        duration: d,
        delay: delay,
        ease: Linear.easeIn,
        onUpdate: () => {
          if (ref.current.position.distanceTo(_p) > 0.0001) {
            ref.current.position.lerp(_p, spring.value);
            ref.current.rotation.setFromVector3(_v2.lerp(_r, spring.value));
          } else {
            setView(destination);
            tl.kill();
          }
        },
      });
    }
  }, [destination, getView, setView, viewport, tl, view]);

  return (
    <PerspectiveCamera
      ref={ref}
      makeDefault
      position={position}
      rotation={rotation}
      {...props}
    />
  );
};

export default Camera;
