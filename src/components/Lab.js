import React, { useEffect, useRef } from 'react';
import useStore from '../store';
import LabCanvas from '../3D/LabCanvas';

const Lab = () => {
  const ref = useRef();
  const destination = useStore((state) => state.destination);

  useEffect(() => {
    if (destination === 'labEntered') {
      ref.current.classList.add('in');
    } else if (destination) {
      ref.current.classList.remove('in');
    }
  }, [destination]);

  return (
    <div ref={ref} id='lab'>
      <div className='desc'>
        <h1>
          The Lab Is Currently Under Construction
          <div className='underline' />
        </h1>
      </div>
      <LabCanvas />
    </div>
  );
};

export default Lab;
