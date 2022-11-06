import { useAboutStore } from '@/store';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

const DOM = () => {
  const introDone = useAboutStore((s) => s.introDone);

  return (
    <main id='about' className={introDone ? 'animate' : ''}>
      <div className='back'>
        <Link href='/'>
          <a>
            <IoArrowBack></IoArrowBack>
            return home
          </a>
        </Link>
      </div>
    </main>
  );
};

export default DOM;
