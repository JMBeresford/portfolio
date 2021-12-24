import React, { useRef, useEffect, Suspense } from 'react';
import useStore from '../store';
import { Canvas } from '@react-three/fiber';
import WorkBackground from '../3D/WorkBackground';
import { ACESFilmicToneMapping } from 'three';

const Work = () => {
  const ref = useRef();
  const canvasRef = useRef();
  const currentWork = useStore((state) => state.currentWork);
  const viewingWork = useStore((state) => state.viewingWork);
  const view = useStore((state) => state.view);

  useEffect(() => {
    if (view !== 'worksEntered') {
      return;
    }

    if (viewingWork) {
      ref.current.classList.add('in');
    } else {
      ref.current.classList.remove('in');
    }
  }, [viewingWork, view]);

  return (
    <div
      ref={ref}
      id='workPage'
      style={{
        background: `linear-gradient(180deg, rgba(255,255,255,1) 0%, ${currentWork.color} 100%)`,
      }}
    >
      <div className='content'>
        <div className='text'>
          <h1>
            {currentWork.name}
            <div
              className='underline'
              style={{ backgroundColor: currentWork.color }}
            />
          </h1>
          <p className='desc'>{currentWork.description}</p>
        </div>
        <div className='links'>
          {currentWork.live && (
            <a href={currentWork.live} rel='noreferrer' target='_blank'>
              Live Project
            </a>
          )}

          {currentWork.source && (
            <a href={currentWork.source} rel='noreferrer' target='_blank'>
              Source Code
            </a>
          )}
        </div>
      </div>
      {view === 'worksEntered' && (
        <div className='workCanvasWrapper'>
          <Canvas
            dpr={[1, 2]}
            ref={canvasRef}
            linear={false}
            camera={{ fov: 65 }}
            onCreated={({ camera, gl }) => {
              camera.position.set(0, 0, 1);
            }}
            className='workCanvas'
          >
            <Suspense fallback={null}>
              <WorkBackground
                images={currentWork.images}
                color={currentWork.color}
              />
            </Suspense>
          </Canvas>
        </div>
      )}
    </div>
  );
};

export default Work;
