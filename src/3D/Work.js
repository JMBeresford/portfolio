import React, { useRef, useEffect, Suspense } from 'react';
import useStore from '../store';
import { Canvas, useFrame } from '@react-three/fiber';
import WorkBackground from './WorkBackground';

const DisableRender = () => useFrame(() => null, 1000);

const Work = () => {
  const ref = useRef();
  const canvasRef = useRef();
  const currentWork = useStore((state) => state.currentWork);
  const viewingWork = useStore((state) => state.viewingWork);
  const view = useStore((state) => state.view);
  const mobile = useStore((state) => state.mobile);

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
        background: `radial-gradient(circle, ${currentWork.color} -10%, rgba(255,255,255,1) 100%)`,
      }}
    >
      <div className='content'>
        <h1>
          {currentWork.name}
          <div
            className='underline'
            style={{ backgroundColor: currentWork.color }}
          />
        </h1>
        <p className='desc'>{currentWork.description}</p>
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
            camera={{ fov: 65 }}
            onCreated={({ camera, gl }) => {
              camera.position.set(0, -0.15, mobile ? 1.2 : 0.9);
            }}
            className='workCanvas'
          >
            {!viewingWork && <DisableRender />}
            <Suspense fallback={null}>
              <WorkBackground
                images={currentWork.images}
                color={currentWork.accentColor}
              />
            </Suspense>
          </Canvas>
        </div>
      )}
    </div>
  );
};

export default Work;
