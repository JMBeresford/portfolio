import React, { useRef, useEffect } from 'react';
import WorksCanvas from '../3D/WorksCanvas';
import useStore from '../store';

const Works = () => {
  const ref = useRef();
  const view = useStore((state) => state.view);
  const destination = useStore((state) => state.destination);

  useEffect(() => {
    if (view === 'worksEntered') {
      ref.current.classList.add('in');
      if (destination === 'main') {
        ref.current.classList.remove('in');
      }
    }
  }, [view, destination]);

  return (
    <div ref={ref} id='works'>
      <WorksCanvas />
    </div>
  );
};

export default Works;
