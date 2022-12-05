import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const Layer = ({ layer = 1, children }) => {
  const ref = useRef();

  useFrame(({ gl, camera }) => {
    gl.autoClear = false;
    gl.clearDepth();
    ref.current.visible = true;
    gl.render(ref.current, camera);
    ref.current.visible = false;
  }, layer);

  return (
    <scene visible={true} ref={ref}>
      {children}
    </scene>
  );
};

export default Layer;
