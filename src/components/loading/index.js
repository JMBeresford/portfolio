import useStore from '@/store';
import { useProgress } from '@react-three/drei';
import React, { useMemo } from 'react';
import { useEffect } from 'react';

const Loading = () => {
  const { progress } = useProgress();

  const { experienceStarted, sceneLoaded, actions, router } = useStore();

  const doneLoading = useMemo(
    () => progress >= 100 && sceneLoaded,
    [sceneLoaded, progress]
  );

  return (
    <div id='loading' className={experienceStarted ? 'out' : ''}>
      <h1>Loading</h1>

      <div className='wrapper'>
        <button
          onClick={actions.startExperience}
          className={doneLoading ? '' : 'out'}
        >
          enter
        </button>
        <p>{Math.floor(progress)}%</p>
      </div>
    </div>
  );
};

export default Loading;
