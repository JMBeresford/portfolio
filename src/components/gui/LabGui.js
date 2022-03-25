import { useRef, useLayoutEffect } from 'react';
import useStore from '../../store';

const LabGui = () => {
  const ref = useRef();

  const view = useStore((state) => state.view);
  const leavingIpad = useStore((state) => state.leavingIpad);

  useLayoutEffect(() => {
    useStore.setState({ domElement: ref.current });
  }, []);

  return (
    <div
      ref={ref}
      id='lab'
      className={view === 'labEntered' && !leavingIpad ? 'in' : ''}
    >
      <a href='https://lab.john-beresford.com'>Enter The Lab</a>
    </div>
  );
};

export default LabGui;
