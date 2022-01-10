import React, { useEffect, useRef } from 'react';
import { useDetectGPU } from '@react-three/drei';
import useStore from '../store';

const Cursor = () => {
  const ref = useRef();
  const intersecting = useStore((state) => state.intersecting);
  const pointerType = useStore((state) => state.pointerType);
  const GPU = useDetectGPU();

  const handleMouseMove = (e) => {
    if (ref.current) {
      ref.current.style.top = `${e.clientY}px`;
      ref.current.style.left = `${e.clientX}px`;
    }

    if (e.pointerType) {
      useStore.setState({ pointerType: e.pointerType });
    }
  };

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
    <div
      ref={ref}
      id='cursor'
      hidden={pointerType === 'touch'}
      className={intersecting ? 'hovering' : ''}
    >
      <div className='ripple'></div>
    </div>
  );
};

export default Cursor;
