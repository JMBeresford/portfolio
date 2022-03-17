import React, { useEffect, useRef } from 'react';
import useStore from '../store';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';

let _v = new Vector3();
let _v2 = new Vector3();

const Controls = () => {
  const animatingRef = useRef(useStore.getState().animatingView);
  const viewRef = useRef(useStore.getState().view);
  const pointerRef = useRef(useStore.getState().pointerType);
  const getView = useStore((state) => state.actions.getView);
  const prevMouse = useStore((state) => state.mouse);
  const mobile = useStore((state) => state.mobile);

  useEffect(
    () =>
      useStore.subscribe(
        (state) => (animatingRef.current = state.animatingView)
      ),
    []
  );
  useEffect(
    () => useStore.subscribe((state) => (viewRef.current = state.view)),
    []
  );
  useEffect(
    () =>
      useStore.subscribe((state) => (pointerRef.current = state.pointerType)),
    []
  );

  useFrame(({ camera, mouse }) => {
    if (
      animatingRef.current ||
      viewRef.current === 'start' ||
      viewRef.current === 'aboutEntered' ||
      viewRef.current === 'worksEntered' ||
      viewRef.current === 'labEntered' ||
      mobile
    ) {
      return;
    }
    const { position, rotation } = getView(viewRef.current);

    if (pointerRef.current === 'touch') {
      let dx = mouse.x - prevMouse.x;
      let dy = mouse.y - prevMouse.y;

      camera.rotation.toVector3(_v);
      _v.y += dx;
      _v.x -= dy;

      camera.rotation.toVector3(_v2);

      let d = Math.min(1.0, _v.distanceTo(_v2) * 100);

      if (_v.y > rotation[1] + 0.1) {
        _v.y = rotation[1] + 0.1;
      }

      if (_v.y < rotation[1] - 0.1) {
        _v.y = rotation[1] - 0.1;
      }

      if (_v.x > rotation[0] + 0.1) {
        _v.x = rotation[0] + 0.1;
      }

      if (_v.x < rotation[0] - 0.1) {
        _v.x = rotation[0] - 0.1;
      }

      _v2.lerp(_v, 1.2 - d);

      camera.rotation.setFromVector3(_v2);

      prevMouse.copy(mouse);
    } else {
      // target to converge on
      _v.set(...position);
      _v.x += mouse.x * 0.1;
      _v.y += mouse.y * 0.1;
      _v.z = camera.position.z;

      camera.position.lerp(_v, 0.1);
    }
  });

  return <></>;
};

export default Controls;
