import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store';
import { IoArrowBack, IoInformationCircleOutline } from 'react-icons/io5';

const Gui = React.memo(() => {
  // refs
  const backRef = useRef();
  const tooltipRef = useRef();

  // store
  const destination = useStore((state) => state.destination);
  const view = useStore((state) => state.view);
  const mobile = useStore((state) => state.mobile);
  const cursorRef = useRef(useStore.getState().cursor);
  const back = useStore((state) => state.actions.back);

  const [tip, setTip] = useState('');

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

    if (!mobile) {
      if (view === 'main') {
        setTip('Use your mouse to explore');
        tooltipRef.current.classList.add('in');
      } else if (view === 'about') {
        setTip('Click on the tablet to read about me');
        tooltipRef.current.classList.add('in');
      } else if (view === 'works') {
        setTip('Click on the tablet to see my work');
        tooltipRef.current.classList.add('in');
      } else if (view === 'lab') {
        setTip('Click on the tablet to see some of my experiments');
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
      <div ref={tooltipRef} id='tooltip'>
        <IoInformationCircleOutline className='icon' />
        <h3>{tip}</h3>
      </div>
    </div>
  );
});

export default Gui;
