import React, { useEffect, useRef } from 'react';
import { useDetectGPU } from '@react-three/drei';
import useStore from '../store';

const Cursor = () => {
  const wrapperRef = useRef();
  const ref = useRef();
  const intersecting = useStore((state) => state.intersecting);
  const pointerType = useStore((state) => state.pointerType);
  const view = useStore((state) => state.view);
  const GPU = useDetectGPU();

  const handleMouseMove = (e) => {
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    }

    if (e.pointerType) {
      useStore.setState({ pointerType: e.pointerType });
    }
  };

  useEffect(() => {
    if (intersecting) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = null;
    }
  }, [intersecting]);

  useEffect(() => {
    if (GPU.isMobile) {
      useStore.setState({ pointerType: 'touch' });
    }
  }, [GPU]);

  useEffect(() => {
    useStore.setState({ cursor: ref.current });
    window.addEventListener('pointermove', handleMouseMove);

    return () => window.removeEventListener('pointermove', handleMouseMove);
  }, []);

  return (
    <div ref={wrapperRef} id='cursorWrapper'>
      <div
        ref={ref}
        id='cursor'
        hidden={pointerType === 'touch'}
        className={`${intersecting ? 'intersecting' : ''} ${
          view === 'main' ? 'in' : ''
        }`}
      >
        <div className='ripple'></div>
      </div>
    </div>
  );
};

export default Cursor;
