import React, { useRef } from 'react';
import useStore from '../store';
import { useProgress } from '@react-three/drei';

const Loading = () => {
  const ready = useStore((state) => state.ready);
  const transitionView = useStore((state) => state.actions.transitionView);
  const ref = useRef();
  const { progress } = useProgress();

  const handleClick = (e) => {
    ref.current.classList.add('out');

    useStore.setState({ pointerType: e.nativeEvent.pointerType });

    setTimeout(() => transitionView('main'), 500);
  };

  return (
    <div id='loading' className={ready ? 'ready' : ''} ref={ref}>
      <div className='text'>
        <h1>john beresford</h1>
        <h2>creative developer</h2>
      </div>
      {progress >= 100 && (
        <button onClick={(e) => handleClick(e)}>Enter</button>
      )}
      <div className='loadBar'>
        <p>loading</p>
        <div
          className='rule'
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
    </div>
  );
};

export default Loading;
