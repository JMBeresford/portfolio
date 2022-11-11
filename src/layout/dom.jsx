import { useStore } from '@/store';
import { useEffect, useRef } from 'react';
import { Leva } from 'leva';
import Loading from '@/components/DOM/loading';
import Navigation from '@/components/DOM/Navigation';

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
