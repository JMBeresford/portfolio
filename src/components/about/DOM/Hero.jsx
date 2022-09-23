import useStore from '@/store';
import React from 'react';

const Hero = () => {
  const { introDone } = useStore();

  return (
    <section className={`hero`}>
      <div className='grid'>
        <div className='separator' />

        <div className='wrapper first'>
          <h1>John</h1>
        </div>
        <div className='wrapper last'>
          <h1>Beresford</h1>
        </div>

        <div className='wrapper creative'>
          <div className='rule' />
          <h3>creative</h3>
        </div>

        <div className='wrapper developer'>
          <div className='rule' />
          <h3>developer</h3>
        </div>
      </div>
    </section>
  );
};

export default Hero;
