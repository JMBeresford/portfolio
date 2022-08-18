import useStore from '@/store';
import React, { useCallback } from 'react';
import { useMemo, useRef } from 'react';
import WorkItem from './WorkItem';

const WorksList = () => {
  const ref = useRef();

  const { works, selectedWork } = useStore();

  const color = useMemo(() => {
    return works[selectedWork].color;
  }, [selectedWork, works]);

  // const handleScroll = useCallback((e) => {
  //   let dy = e.deltaY;

  //   let curY = parseInt(
  //     ref.current.style.transform.split("(")[1].split(")")[0]
  //   );

  //   let y = curY + dy;
  //   y = Math.min(ref.current.offsetHeight, y);
  //   y = Math.max(0, y);

  //   ref.current.style.transform = `translateY(${y}px)`;
  // }, []);

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
