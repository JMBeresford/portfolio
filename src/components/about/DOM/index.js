import useStore from '@/store';
import { useProgress } from '@react-three/drei';
import Link from 'next/link';
import { useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import Career from './Career';
import Hero from './Hero';

const DOM = () => {
  const { aboutLoaded, introDone } = useStore();
  const setView = useStore((state) => state.actions.setView);

  const { progress } = useProgress();

  useEffect(() => {
    if (progress >= 100) {
      useStore.setState({ aboutLoaded: true });
    } else if (aboutLoaded) {
      useStore.setState({ aboutLoaded: false });
    }
  }, [progress, aboutLoaded]);

  return (
    <main id='about' className={introDone ? 'animate' : ''}>
      <div className='back'>
        <Link href='/'>
          <a
            onClick={() => {
              setView('home');
            }}
          >
            <IoArrowBack></IoArrowBack>
            return home
          </a>
        </Link>
      </div>

      <Hero />
      <Career />
    </main>
  );
};

export default DOM;
