import useStore from '@/store';
import { useEffect, useRef } from 'react';

const Dom = ({ children }) => {
  const ref = useRef(null);
  useEffect(() => {
    useStore.setState({ dom: ref });
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
        overflow: 'hidden',
      }}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default Dom;
