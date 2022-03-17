import React, { useEffect, useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import useStore from '../store';
import { Vector3 } from 'three';
import { gsap, Power1 } from 'gsap';
import { useThree } from '@react-three/fiber';

let _v1 = new Vector3();
let _p = new Vector3();
let _r = new Vector3();

const Camera = (props) => {
  const ref = useRef();
  const destination = useStore((state) => state.destination);
  const mobile = useStore((state) => state.mobile);
  const view = useStore((state) => state.view);
  const getView = useStore((state) => state.actions.getView);
  const setView = useStore((state) => state.actions.setView);
  const { viewport } = useThree();

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

      let d = 1;

      if (view === 'start') {
        d *= 2;
      }

      var delay = 0;

      _r.set(...rotation);

      const cam = {
        px: ref.current.position.x,
        py: ref.current.position.y,
        pz: ref.current.position.z,
        rx: ref.current.rotation.x,
        ry: ref.current.rotation.y,
        rz: ref.current.rotation.z,
      };

      if (destination === 'main' && view === 'start' && mobile) {
        gsap
          .timeline()
          .to(ref.current.position, {
            y: _p.y,

            duration: d,
            delay: delay,
            ease: Power1.easeIn,
          })
          .to(cam, {
            px: _p.x,
            pz: _p.z,
            rx: _r.x,
            ry: _r.y,
            rz: _r.z,

            duration: d,
            delay: delay,
            ease: Power1.easeIn,
            onUpdate: () => {
              ref.current.position.x = cam.px;
              ref.current.position.z = cam.pz;

              ref.current.rotation.x = cam.rx;
              ref.current.rotation.y = cam.ry;
              ref.current.rotation.z = cam.rz;
            },
            onComplete: () => {
              setView(destination);
            },
          });
      } else {
        gsap.to(cam, {
          px: _p.x,
          py: _p.y,
          pz: _p.z,
          rx: _r.x,
          ry: _r.y,
          rz: _r.z,

          duration: d,
          delay: delay,
          ease: Power1.easeIn,
          onUpdate: () => {
            ref.current.position.x = cam.px;
            ref.current.position.y = cam.py;
            ref.current.position.z = cam.pz;

            ref.current.rotation.x = cam.rx;
            ref.current.rotation.y = cam.ry;
            ref.current.rotation.z = cam.rz;
          },
          onComplete: () => {
            setView(destination);
          },
        });
      }
    }
  }, [destination, getView, setView, viewport, view, mobile]);

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
