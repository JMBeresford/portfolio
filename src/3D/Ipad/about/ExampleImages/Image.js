import { useTexture, shaderMaterial } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { animated, useSpring } from '@react-spring/three';
import useStore from '../../../../store';
import vertexShader from '../../../../shaders/aboutImages/vert.glsl';
import fragmentShader from '../../../../shaders/aboutImages/frag.glsl';
import { extend, useThree } from '@react-three/fiber';
import { Vector2 } from 'three';

const ImageMaterial = shaderMaterial(
  {
    map: null,
    opacity: 1,
    uAspect: new Vector2(1, 1),
  },
  vertexShader,
  fragmentShader,
  (mat) => {
    mat.transparent = true;
  }
);

extend({ ImageMaterial });

const AnimImageMaterial = animated('imageMaterial');

const Image = ({ size, url, position, opacity }) => {
  const ref = useRef();
  const { viewport } = useThree();

  const view = useStore((state) => state.view);
  const leavingIpad = useStore((state) => state.leavingIpad);

  const texture = useTexture(url);

  const { scale } = useSpring({
    scale: view === 'aboutEntered' && !leavingIpad ? [1, 1, 1] : [0, 0, 0],
  });

  useEffect(() => {
    ref.current.material.uniforms.map.value = texture;
  }, [texture]);

  useEffect(() => {
    let aspect =
      viewport.aspect >= 1 ? [viewport.aspect, 1] : [1, 1 / viewport.aspect];

    ref.current.material.uniforms.uAspect.value = aspect;
  }, [viewport]);

  return (
    <animated.mesh ref={ref} position={position} scale={scale}>
      <planeGeometry args={[size.width * 0.85, size.height * 0.85]} />
      <AnimImageMaterial
        transparent={true}
        opacity={opacity}
        uAspect={[1, 1]}
      />
    </animated.mesh>
  );
};

export default Image;
