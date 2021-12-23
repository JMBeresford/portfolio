import React, { useRef, useEffect } from 'react';
import useStore from '../store';

const Work = () => {
  const ref = useRef();
  const currentWork = useStore((state) => state.currentWork);
  const viewingWork = useStore((state) => state.viewingWork);
  const view = useStore((state) => state.view);

  useEffect(() => {
    if (view !== 'worksEntered') {
      return;
    }

    if (viewingWork) {
      ref.current.classList.add('in');
    } else {
      ref.current.classList.remove('in');
    }
  }, [viewingWork, view]);

  return (
    <div ref={ref} id='workPage'>
      <div className='header'>
        <h1>{currentWork.name}</h1>
      </div>

      <div className='content'>
        <div className='desc'>{currentWork.description}</div>
        <div className='links'>
          {currentWork.live && <a href={currentWork.live}>Live Project</a>}

          {currentWork.source && <a href={currentWork.source}>Source Code</a>}
        </div>
      </div>
    </div>
  );
};

export default Work;
