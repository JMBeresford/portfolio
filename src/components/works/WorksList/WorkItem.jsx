import useStore, { useWorksStore } from '@/store';
import { useMemo } from 'react';
import shallow from 'zustand/shallow';

const WorkItem = ({ work, idx, ...props }) => {
  const [selectedWork, actions] = useWorksStore(
    (s) => [s.selectedWork, s.actions],
    shallow
  );

  const selected = useMemo(() => selectedWork === idx, [selectedWork, idx]);

  return (
    <div
      className={selected ? 'workItem selected' : 'workItem'}
      onClick={() => actions.transitionToWork(idx)}
      style={{
        animationDelay: `${1 + idx * 0.35}s`,
        color: selected ? work.color : 'white',
      }}
    >
      <p className='idx'>{idx < 10 ? '0' + idx : idx}</p>

      <p className={'name'}>{work.displayName}</p>
    </div>
  );
};

export default WorkItem;
