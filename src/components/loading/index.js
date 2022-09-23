import useStore from '@/store';
import { useProgress } from '@react-three/drei';
import React, { useMemo } from 'react';
import { useEffect } from 'react';

const Loading = () => {
  const { progress } = useProgress();

  const { experienceStarted, sceneLoaded, actions, router } = useStore();

  return (
    <div id='loading' className={experienceStarted ? 'out' : ''}>
      <h1>Loading</h1>

      <div className='wrapper'>
        <button
          onClick={actions.startExperience}
          className={progress >= 100 ? '' : 'out'}
        >
          enter
        </button>
        <p>{Math.floor(progress)}%</p>
      </div>
    </div>
  );
};

export default Loading;
