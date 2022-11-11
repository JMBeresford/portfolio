import twitterIcon from '@/assets/img/icons/twitter.svg';
import linkedinIcon from '@/assets/img/icons/linkedin.svg';
import instagramIcon from '@/assets/img/icons/instagram.svg';
import Image from 'next/image';

const SIZE = '35px';

const Socials = () => {
  return (
    <div className='socials'>
      <hr />

      <div id='nav-socials'>
        <a
          href='https://twitter.com/__jberesford__'
          target='_blank'
          rel='noreferrer'
        >
          <Image
            height={SIZE}
            width={SIZE}
            src={twitterIcon.src}
            alt='twitter link'
          />
        </a>
        <a
          href='https://www.linkedin.com/in/jmberesford/'
          target='_blank'
          rel='noreferrer'
        >
          <Image
            height={SIZE}
            width={SIZE}
            src={linkedinIcon.src}
            alt='linkedin link'
          />
        </a>
        <a
          href='https://www.instagram.com/beresforddesign/'
          target='_blank'
          rel='noreferrer'
        >
          <Image
            height={SIZE}
            width={SIZE}
            src={instagramIcon.src}
            alt='instagram link'
          />
        </a>
      </div>
    </div>
  );
};

export default Socials;
