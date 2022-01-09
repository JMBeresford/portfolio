import React, { useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import useStore from '../../../store';
import { useSpring, animated } from '@react-spring/three';
import { useFrame, useThree } from '@react-three/fiber';
import { lerp } from 'three/src/math/MathUtils';
import { useTexture } from '@react-three/drei';

// preload all textures
for (let work of useStore.getState().works) {
  useTexture.preload(work.images);
}

const WorkImages = React.forwardRef((props, ref) => {
  const works = useStore((state) => state.works);
  const currentWork = useStore((state) => state.currentWork);
  const viewingWork = useStore((state) => state.viewingWork);
  const animating = useStore((state) => state.animating);
  const dragging = useStore((state) => state.dragging);
  const domElement = useStore((state) => state.domElement);
  const view = useStore((state) => state.view);
  const destination = useStore((state) => state.destination);
  const scrolled = useStore((state) => state.scrolled);

  const { opacity } = useSpring({
    opacity: viewingWork !== null && !animating ? 1 : 0,
  });

  const size = useThree((state) => state.size);

  const textures = useTexture(works[currentWork].images);

  const scale = useMemo(() => Math.min(0.9, size.width / 1500), [size]);
  const scrollState = useMemo(() => ({ target: 0, lastTouch: 0 }), []);
  const scrollBounds = useMemo(
    () => ({
      bottom: 0,
      top: scale * 0.5 + scale * 0.9 * (textures.length - 0.5),
    }),
    [scale, textures]
  );

  useEffect(() => {
    scrollState.target = 0;

    useStore.setState({ scrolled: false });
  }, [viewingWork, scrollState, domElement]);

  useLayoutEffect(() => {
    domElement.classList.add('viewing');

    return () => {
      domElement.classList.remove('viewing');
    };
  }, [domElement]);

  const handleWheel = useCallback(
    (e) => {
      if (
        animating ||
        viewingWork === null ||
        view !== 'worksEntered' ||
        destination
      ) {
        return;
      }

      if (!animating && viewingWork !== null) {
        scrollState.target += +e.deltaY * 0.001;
      }
    },
    [scrollState, animating, viewingWork, view, destination]
  );

  const handleMove = useCallback(
    (e) => {
      if (
        dragging &&
        !animating &&
        viewingWork !== null &&
        view === 'worksEntered' &&
        !destination
      ) {
        scrollState.target += e.movementY * -0.0015;
      }
    },
    [dragging, animating, view, destination, viewingWork, scrollState]
  );

  useFrame(() => {
    if (view === 'worksEntered' && viewingWork !== null) {
      scrollState.target = Math.max(scrollState.target, scrollBounds.bottom);
      scrollState.target = Math.min(scrollState.target, scrollBounds.top);

      if (scrollState.target > 0.05) {
        domElement.classList.remove('in');
        if (!scrolled) {
          useStore.setState({ scrolled: true });
        }
      } else {
        domElement.classList.add('in');
        if (scrolled) {
          useStore.setState({ scrolled: false });
        }
      }

      ref.current.position.y = lerp(
        ref.current.position.y,
        scrollState.target,
        0.1
      );
    }
  });

  return (
    <>
      <mesh
        position={[0, 0, -0.3]}
        onWheel={(e) => handleWheel(e)}
        onPointerMove={(e) => handleMove(e)}
      >
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      <group ref={ref} position={[0, 0, -0.6]}>
        {React.Children.toArray(
          textures.map((img, idx) => (
            <animated.mesh
              position={[0, -scale * 0.35 - scale * idx * 0.9, 0]}
              scale={[scale, scale, 1]}
            >
              <planeGeometry args={[1, 1]} />
              <animated.meshBasicMaterial
                transparent={true}
                toneMapped={false}
                map={img}
                depthTest={false}
                depthWrite={false}
                opacity={opacity}
              />
            </animated.mesh>
          ))
        )}
      </group>
    </>
  );
});

export default WorkImages;
