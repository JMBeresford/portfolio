import React, { useEffect, useRef } from 'react';
import useStore from '../store';

const Lab = React.memo(() => {
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
      <div className='header'>
        <h1>Lab</h1>
      </div>

      <h2>The Lab Is Currently Under Construction</h2>
    </div>
  );
});

export default Lab;
