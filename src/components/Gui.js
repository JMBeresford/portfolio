import React, { useEffect, useRef } from 'react';
import useStore from '../store';
import { IoArrowBack } from 'react-icons/io5';

const Gui = () => {
  // refs
  const backRef = useRef();
  // const tooltipRef = useRef();

  // store
  const destination = useStore((state) => state.destination);
  const view = useStore((state) => state.view);
  const cursorRef = useRef(useStore.getState().cursor);
  const back = useStore((state) => state.actions.back);

  useEffect(
    () => useStore.subscribe((state) => (cursorRef.current = state.cursor)),
    []
  );

  useEffect(() => {
    if (['aboutEntered', 'worksEntered', 'labEntered'].includes(view)) {
      backRef.current.style.color = 'black';
      backRef.current.style.cursor = 'pointer';
    } else {
      backRef.current.style.color = 'white';
      backRef.current.style.cursor = 'none';
    }
  }, [view]);

  useEffect(() => {
    if (destination) {
      if (!['main', 'start'].includes(destination)) {
        backRef.current.classList.add('in');
      } else {
        backRef.current.classList.remove('in');
      }
    }
  }, [destination]);

  const handlePointerEnter = (e) => {
    cursorRef.current.classList.add('hoveringGui');
  };

  const handlePointerExit = (e) => {
    cursorRef.current.classList.remove('hoveringGui');
  };

  return (
    <div id='gui'>
      <div
        ref={backRef}
        className='back'
        onClick={(e) => back(e)}
        onPointerEnter={(e) => handlePointerEnter(e)}
        onPointerLeave={(e) => handlePointerExit(e)}
      >
        <IoArrowBack />
      </div>
      {/* <h3 ref={tooltipRef} className='tooltip' /> */}
    </div>
  );
};

export default Gui;
