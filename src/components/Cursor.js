import React, { useEffect, useRef } from 'react';
import useStore from '../store';

const Cursor = React.memo(() => {
  const ref = useRef();
  const intersecting = useStore((state) => state.intersecting);
  const pointerType = useStore((state) => state.pointerType);

  const handleMouseMove = (e) => {
    ref.current.style.top = `${e.clientY}px`;
    ref.current.style.left = `${e.clientX}px`;
  };

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
});

export default Cursor;
