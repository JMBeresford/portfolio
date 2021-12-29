import React, { useRef, useEffect } from 'react';
import useStore from '../store';

const WorkList = React.memo(() => {
  const ref = useRef();
  const listRef = useRef();
  const worksData = useStore((state) => state.works);
  const view = useStore((state) => state.view);
  const viewingWork = useStore((state) => state.viewingWork);
  const viewWork = useStore((state) => state.actions.viewWork);

  const destination = useStore((state) => state.destination);

  useEffect(() => {
    if (destination === 'worksEntered') {
      ref.current.classList.add('in');
    } else if (destination) {
      ref.current.classList.remove('in');
    }
  }, [destination]);

  useEffect(() => {
    if (view !== 'worksEntered') {
      return;
    }

    if (viewingWork) {
      ref.current.classList.remove('in');
    } else {
      ref.current.classList.add('in');
    }
  }, [viewingWork, view]);

  return (
    <div ref={ref} id='workList'>
      <div className='header'>
        <h1>My Work</h1>
      </div>
      <div ref={listRef} className='list'>
        {worksData.map((work, idx) => (
          <div key={idx} className='work' onClick={() => viewWork(work)}>
            <h2>{idx}</h2>
            <h3>{work.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
});

export default WorkList;
