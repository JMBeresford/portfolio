import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store';
import { IoArrowBack, IoInformationCircleOutline } from 'react-icons/io5';

const Gui = () => {
  // refs
  const backRef = useRef();
  const tooltipRef = useRef();

  // store
  const destination = useStore((state) => state.destination);
  const view = useStore((state) => state.view);
  const mobile = useStore((state) => state.mobile);
  const cursor = useStore((state) => state.cursor);
  const back = useStore((state) => state.actions.back);

  const [tip, setTip] = useState('');

  useEffect(() => {
    if (!['main', 'start'].includes(view)) {
      backRef.current.classList.add('in');
    }

    if (!mobile) {
      if (view === 'main') {
        setTip('Use your mouse to explore');
        tooltipRef.current.classList.add('in');
      } else if (view === 'socials') {
        setTip('Click on a box to visit my social media');
        tooltipRef.current.classList.add('in');
      } else {
        tooltipRef.current.classList.remove('in');
      }
    } else {
      tooltipRef.current.classList.remove('in');
    }
  }, [view, mobile]);

  useEffect(() => {
    if (destination) {
      tooltipRef.current.classList.remove('in');
      backRef.current.classList.remove('in');
    }
  }, [destination]);

  const handlePointerEnter = (e) => {
    cursor.classList.add('hoveringGui');
  };

  const handlePointerExit = (e) => {
    cursor.classList.remove('hoveringGui');
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
      <div ref={tooltipRef} id='tooltip'>
        <IoInformationCircleOutline className='icon' />
        <h3>{tip}</h3>
      </div>
    </div>
  );
};

export default Gui;
