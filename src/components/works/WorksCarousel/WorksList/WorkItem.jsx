import useStore from '@/store';
import { useCallback, useMemo } from 'react';

const WorkItem = ({ work, idx, ...props }) => {
  const { selectedWork, works, actions } = useStore();

  const handleClick = useCallback(() => {
    if (selectedWork < idx) {
      actions.nextWork(idx);
    } else {
      actions.prevWork(idx);
    }
  }, [actions, idx, selectedWork]);

  return (
    <div
      className={selectedWork === idx ? 'workItem selected' : 'workItem'}
      onClick={handleClick}
    >
      <p className='idx'>{idx}</p>

      <p className={'name'}>{work.displayName}</p>
    </div>
  );
};

export default WorkItem;
