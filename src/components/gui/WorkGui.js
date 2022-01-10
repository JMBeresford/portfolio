import React, { useEffect, useLayoutEffect, useRef } from 'react';
import useStore from '../../store';

const WorkGui = () => {
  const ref = useRef();

  const works = useStore((state) => state.works);
  const currentWork = useStore((state) => state.currentWork);
  const viewingWork = useStore((state) => state.viewingWork);

  useLayoutEffect(() => {
    useStore.setState({ domElement: ref.current });
  }, []);

  useEffect(() => {
    if (viewingWork !== null) {
      ref.current.classList.add('in');
    } else {
      ref.current.classList.remove('in');
    }
  }, [viewingWork]);

  return (
    <div ref={ref} id='workGui'>
      <h3>{works[currentWork].description}</h3>

      <div className='buttons'>
        {works[currentWork].live && (
          <a href={works[currentWork].live} target='_blank' rel='noreferrer'>
            Visit Project
          </a>
        )}
        {works[currentWork].source && (
          <a href={works[currentWork].source} target='_blank' rel='noreferrer'>
            Source Code
          </a>
        )}
      </div>
    </div>
  );
};

export default WorkGui;
