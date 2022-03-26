import React, { useEffect, useRef, useState } from 'react';
import useStore from '../../store';
import { IoArrowBack, IoInformationCircleOutline } from 'react-icons/io5';
import WorkGui from './WorkGui';
import LabGui from './LabGui';

const Gui = React.memo(() => {
  // refs
  const backRef = useRef();
  const tooltipRef = useRef();

  // store
  const destination = useStore((state) => state.destination);
  const view = useStore((state) => state.view);
  const mobile = useStore((state) => state.mobile);
  const cursor = useStore((state) => state.cursor);
  const viewingWork = useStore((state) => state.viewingWork);
  const back = useStore((state) => state.actions.back);

  const [tip, setTip] = useState('');

  useEffect(() => {
    if (view === 'main') {
      if (mobile) {
        setTip('Tap to explore');
      } else {
        setTip('Use your mouse to explore');
      }
    } else if (view === 'socials') {
      if (mobile) {
        setTip('Tap on a box to visit my social media');
      } else {
        setTip('Click on a box to visit my social media');
      }
    } else if (view === 'worksEntered') {
      if (viewingWork === null) {
        if (mobile) {
          setTip('Swipe left or right, or click, to see more');
        } else {
          setTip('Swipe left or right, or tap, to see more');
        }
      }
    }
  }, [view, mobile, viewingWork]);

  const handlePointerEnter = (e) => {
    cursor.classList.add('hoveringGui');
  };

  const handlePointerExit = (e) => {
    cursor.classList.remove('hoveringGui');
  };

  return (
    <>
      <div id='gui'>
        <div
          ref={backRef}
          className={!['main', 'start'].includes(view) ? 'back in' : 'back'}
          onClick={(e) => back(e)}
          onPointerEnter={(e) => handlePointerEnter(e)}
          onPointerLeave={(e) => handlePointerExit(e)}
        >
          <IoArrowBack />
        </div>
        <div
          ref={tooltipRef}
          id='tooltip'
          className={
            !destination &&
            ['main', 'socials', 'worksEntered'].includes(view) &&
            viewingWork === null
              ? 'in'
              : ''
          }
        >
          <IoInformationCircleOutline
            className='icon'
            onClick={() => tooltipRef.current.classList.toggle('hovered')}
          />
          <h3>{tip}</h3>
        </div>
      </div>
      {view === 'worksEntered' && <WorkGui />}
      {view === 'labEntered' && <LabGui />}
    </>
  );
});

export default Gui;
