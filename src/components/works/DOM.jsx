import { useRef } from 'react';
import Description from './Description';
import WorksList from './WorksList';
import { IoArrowBack } from 'react-icons/io5';
import Link from 'next/link';
import { useWorksStore } from '@/store';
import shallow from 'zustand/shallow';

const DOM = () => {
  const ref = useRef();

  const [works, selectedWork] = useWorksStore(
    (s) => [s.works, s.selectedWork],
    shallow
  );

  return (
    <div ref={ref} id='worksDom'>
      <div className='content'>
        <div className='left'>
          <div className='back'>
            <Link href='/'>
              <a>
                <IoArrowBack />
                return home
                <div
                  className='bg'
                  style={{ backgroundColor: works[selectedWork].color }}
                />
              </a>
            </Link>
          </div>
          <WorksList />
        </div>

        <div className='mid' />

        <div className='right'>
          <Description />
        </div>
      </div>
    </div>
  );
};

export default DOM;
