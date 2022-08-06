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
        top: 0,
        left: 0,
        zIndex: 10,
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
