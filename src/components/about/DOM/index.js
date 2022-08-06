import useStore from '@/store';
import { useProgress } from '@react-three/drei';
import Link from 'next/link';
import { useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';

const DOM = () => {
  const { aboutLoaded } = useStore();
  const setView = useStore((state) => state.actions.setView);

  const { progress } = useProgress();

  useEffect(() => {
    if (progress >= 100) {
      useStore.setState({ aboutLoaded: true });
    } else if (aboutLoaded) {
      useStore.setState({ aboutLoaded: false });
    }
  }, [progress]);

  return (
    <section id='about'>
      <div className='wrapper'>
        <header>
          <div className='back'>
            <Link href='/'>
              <a
                onClick={() => {
                  setView('home');
                }}
              >
                <IoArrowBack />
                return home
              </a>
            </Link>
          </div>
          <h1 className={aboutLoaded ? 'in' : ''}>About Me</h1>
          {/* <hr /> */}
        </header>

        <div className='content'>
          <p>
            My name is John Beresford, and I am a multi-disciplinary developer
            and designer. I'm currently working at{' '}
            <a href='https://www.nvidia.com/en-us/' target='_blank'>
              NVIDIA
            </a>{' '}
            as a software engineer. When I'm not working, I spend my time
            building and maintaining a collection of personal projects and
            experiments!
          </p>
          <p>
            As someone deeply interested in computer graphics and web
            technologies, I find myself drawn to the intersection of these two
            fields. The accessibility of the web and tools such as webGL allow
            me to share my creations with others easily.
          </p>
          <p>
            This portfolio showcases{' '}
            <Link href={'/works'}>
              <a>my work</a>
            </Link>{' '}
            and is even an exhibition of these technologies itself. Head over to{' '}
            <a href='https://lab.john-beresford.com' target='_blank'>
              my lab
            </a>{' '}
            to see my more experimental projects.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DOM;
