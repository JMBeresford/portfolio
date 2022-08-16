import useStore from '@/store';
import { Text } from '@react-three/drei';
import React from 'react';
import { useMemo, useRef } from 'react';
import WorkItem from './WorkItem';

const RADIUS = 0.1;
const WIDTH = 0.1;

const WorksList = () => {
  const ref = useRef();

  const { works, selectedWork } = useStore();

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

      {works.map((work, i) => (
        <WorkItem key={work.name} work={work} idx={i} />
      ))}
    </div>
  );
};

export default WorksList;
