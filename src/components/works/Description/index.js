import { useWorksStore } from '@/store';
import { useEffect, useMemo, useState } from 'react';
import { animated as a, useSpring } from '@react-spring/web';
import shallow from 'zustand/shallow';

const Description = () => {
  const [works, selectedWork, transitioningWork] = useWorksStore(
    (s) => [s.works, s.selectedWork, s.transitioningWork],
    shallow
  );
  const [workId, setWorkId] = useState(selectedWork || 0);

  const curWork = useMemo(() => works[workId], [works, workId]);

  useEffect(() => {
    if (transitioningWork) return;

    setWorkId(selectedWork);
  }, [transitioningWork, selectedWork]);

  const styles = useSpring({
    opacity: transitioningWork ? 0 : 1,
  });

  return (
    <a.div className='description' style={styles}>
      <div className='head'>
        <h2>About {curWork.displayName}</h2>
        <hr />
      </div>

      {curWork.description.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}

      <div className='buttons'>
        {curWork.live && (
          <a
            target='_blank'
            rel='noreferrer'
            href={curWork.live}
            style={{ color: curWork.color }}
          >
            Visit Site
          </a>
        )}
        {curWork.source && (
          <a
            target='_blank'
            rel='noreferrer'
            href={curWork.source}
            style={{ color: curWork.color }}
          >
            Source Code
          </a>
        )}
      </div>
    </a.div>
  );
};

export default Description;
