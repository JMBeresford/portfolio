import { useThree } from '@react-three/fiber';
import { useMemo } from 'react';

const useVW = () => {
  const size = useThree((s) => s.size);

  const vw = useMemo(() => {
    return size.width / 50000;
  }, [size]);

  return vw;
};

export default useVW;
