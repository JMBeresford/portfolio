import React, { useRef } from 'react';
import useStore from '../../store';

const WorkIndicator = () => {
  const ref = useRef();

  const { works, currentWork, viewingWork } = useStore();

  return (
    <div
      ref={ref}
      id='workIndicator'
      className={viewingWork === null ? 'in' : ''}
    >
      <div
        style={{
          left: `${(currentWork / works.length) * 100}%`,
          width: `${(1 / works.length) * 100}%`,
        }}
        className='position'
      />
    </div>
  );
};

export default WorkIndicator;
