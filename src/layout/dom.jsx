import { useStore } from '@/store';
import { useEffect, useRef } from 'react';
import { Leva } from 'leva';
import Loading from '@/components/loading';

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
        right: 0,
        minHeight: '100vh',
        zIndex: 10,
        overflow: 'auto',
      }}
      id={'dom'}
      ref={ref}
    >
      <Loading />
      {children}

      <Leva hidden={!debug} />
    </div>
  );
};

export default Dom;
