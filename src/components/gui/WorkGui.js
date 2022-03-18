import React, { useRef, useLayoutEffect } from 'react';
import useStore from '../../store';
import { useSpring, animated } from '@react-spring/web';

const WorkGui = () => {
  const ref = useRef();

  const works = useStore((state) => state.works);
  const currentWork = useStore((state) => state.currentWork);
  const viewingWork = useStore((state) => state.viewingWork);

  const { opacity } = useSpring({
    opacity: viewingWork === null ? -1 : 1,
    config: { duration: 500 },
  });

  useLayoutEffect(() => {
    useStore.setState({ domElement: ref.current });
  }, []);

  return (
    <animated.div
      ref={ref}
      id='workGui'
      className={viewingWork !== null ? 'in' : ''}
      style={{ opacity: opacity }}
    >
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

      <div className='images'>
        {React.Children.toArray(
          works[currentWork].images.map((img, idx) => (
            <img
              src={img}
              alt={`${works[currentWork].name} screenshot ${idx + 1}`}
            />
          ))
        )}
      </div>
    </animated.div>
  );
};

export default WorkGui;
