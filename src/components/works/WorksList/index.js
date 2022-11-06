import { useWorksStore } from '@/store';

import { useMemo, useRef } from 'react';
import shallow from 'zustand/shallow';
import WorkItem from './WorkItem';

const WorksList = () => {
  const ref = useRef();

  const [works, selectedWork] = useWorksStore(
    (s) => [s.works, s.selectedWork],
    shallow
  );

  const color = useMemo(() => {
    return works[selectedWork].color;
  }, [selectedWork, works]);

  return (
    <div className='worksList'>
      <div className='header'>
        <h1>My Works</h1>
        <div className='fg' />
        <div className='bg' style={{ backgroundColor: color }} />
      </div>

      <div
        ref={ref}
        className='listWrapper'
        style={{ transform: 'translateY(0)' }}
      >
        {works.map((work, i) => (
          <WorkItem key={i} work={work} idx={i} />
        ))}
      </div>
    </div>
  );
};

export default WorksList;
