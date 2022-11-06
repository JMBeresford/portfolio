import { animated, useSpring } from '@react-spring/three';
import { extend } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useRef } from 'react';
import {
  LineMaterial,
  LineGeometry,
  Line2,
  LineSegmentsGeometry,
  LineSegments2,
} from 'three-stdlib';

extend({
  Line2,
  LineMaterial,
  LineSegmentsGeometry,
  LineGeometry,
  LineSegments2,
});

const AnimLineMaterial = animated('lineMaterial');

const Lines = ({ positions, width, visible }) => {
  const ref = useRef();

  const { opacity } = useSpring({
    opacity: visible ? 1 : 0,
  });

  const { lineColor } = useControls('constellations', {
    lineColor: '#fff',
  });

  useEffect(() => {
    ref.current.geometry.setPositions(positions);
  }, [positions]);

  useEffect(() => {
    ref.current.material.uniforms.linewidth.value = width;
  }, [width]);

  return (
    <line2 ref={ref}>
      <lineGeometry />
      <AnimLineMaterial transparent color={lineColor} opacity={opacity} />
    </line2>
  );
};

export default Lines;
