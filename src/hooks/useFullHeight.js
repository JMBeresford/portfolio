import { useThree } from '@react-three/fiber';

const useFullHeight = (distance = 0.375) => {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  let fov = (camera.fov * Math.PI) / 180;
  let h = 2 * Math.tan(fov / 2) * distance;

  return h;
};

export default useFullHeight;
