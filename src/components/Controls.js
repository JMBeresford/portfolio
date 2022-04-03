import React, { useMemo } from 'react';
import useStore from '../store';
import { useFrame } from '@react-three/fiber';
import { lerp } from 'three/src/math/MathUtils';

const Controls = () => {
  const { view, animatingView, pointerType, mobile } = useStore();
  const getView = useStore((state) => state.actions.getView);

  const position = useMemo(() => {
    return getView(view).position;
  }, [view, getView]);

  useFrame(({ camera, mouse }) => {
    if (
      animatingView ||
      ['start', 'aboutEntered', 'worksEntered', 'labEntered'].includes(view) ||
      mobile
    ) {
      return;
    }

    if (pointerType !== 'touch') {
      camera.position.x = lerp(
        camera.position.x,
        position[0] + mouse.x * 0.1,
        0.1
      );

      camera.position.y = lerp(
        camera.position.y,
        position[1] + mouse.y * 0.1,
        0.1
      );
    }
  });

  return <></>;
};

export default Controls;
