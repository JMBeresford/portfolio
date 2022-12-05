import { useHomeStore, useStore } from '@/store';
import Link from 'next/link';
import { useState, useCallback, useMemo } from 'react';
import Socials from './Socials';

const Navigation = () => {
  const router = useStore((s) => s.router);
  const introDone = useHomeStore((s) => s.introDone);
  const [open, setOpen] = useState(false);

  const curPath = useMemo(() => {
    return router?.pathname;
  }, [router]);

  const backPath = useMemo(
    () => (curPath === '/works' ? '/' : '/works'),
    [curPath]
  );

  const handleNavigate = useCallback(
    (e, route) => {
      e.preventDefault();
      useStore.setState({ transitioning: true });

      setTimeout(() => router.push(route), 350);
    },
    [router]
  );

  const handleBack = useCallback(
    (e, route) => {
      e.preventDefault();
      useStore.setState({ transitioning: true });

      setTimeout(() => router.push(route), 350);
    },
    [router]
  );

  return (
    <nav className={introDone || curPath !== '/' ? '' : 'hide'}>
      <div className='buttons'>
        <div className={`backWrapper${curPath === '/' ? ' hide' : ''}`}>
          <Link href={backPath}>
            <div className='back' onClick={(e) => handleNavigate(e, backPath)}>
              <div className='line'></div>
              <div className='line'></div>
              <div className='line'></div>
            </div>
          </Link>
        </div>

        <div className='hamburger' onClick={() => setOpen(true)}>
          <div className='line' />
          <div className='line' />
          <div className='line' />
        </div>
      </div>

      <div className={open ? 'navlist open' : 'navlist'}>
        <div className='close' onClick={() => setOpen(false)}>
          <div className='lines'>
            <div className='line' />
            <div className='line' />
          </div>
        </div>

        <Link href='/'>
          <a
            onClick={(e) => handleNavigate(e, '/')}
            className={`${curPath === '/' ? 'disabled' : ''}`}
          >
            Home
          </a>
        </Link>

        <Link href='/works'>
          <a
            onClick={(e) => handleNavigate(e, '/works')}
            className={`${curPath === '/works' ? 'disabled' : ''}`}
          >
            My Work
          </a>
        </Link>

        <a
          href='https://lab.john-beresford.com'
          target='_blank'
          rel='noreferrer'
        >
          My Lab
        </a>

        <Socials />
      </div>
    </nav>
  );
};

export default Navigation;
