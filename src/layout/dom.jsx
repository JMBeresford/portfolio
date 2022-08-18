import useStore from '@/store';
import { useEffect, useRef } from 'react';
import { Leva } from 'leva';

const Dom = ({ children }) => {
  const ref = useRef(null);
  const { debug } = useStore();

  useEffect(() => {
    useStore.setState({ dom: ref });
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 100,
        overflow: 'hidden',
      }}
      ref={ref}
    >
      {children}

      <Leva hidden={!debug} />
    </div>
  );
};

export default Dom;
