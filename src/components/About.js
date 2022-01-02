import React, { useEffect, useRef } from 'react';
import useStore from '../store';
import AboutCanvas from '../3D/AboutCanvas';

const About = () => {
  const ref = useRef();
  const view = useStore((state) => state.view);
  const destination = useStore((state) => state.destination);

  useEffect(() => {
    if (view === 'aboutEntered') {
      ref.current.classList.add('in');
      if (destination === 'main') {
        ref.current.classList.remove('in');
      }
    }
  }, [view, destination]);

  return (
    <div ref={ref} id='about'>
      <div className='desc'>
        <h1>
          About
          <div className='underline' />
        </h1>
        <p>
          I'm a multi-disciplinary designer and developer that feels most at
          home in the intersection of{' '}
          <strong>computer graphics and web design/development</strong>. This
          portfolio synthesizes the elements of that intersection that I find
          most appealing and fun!
        </p>
        <br />
        <p>
          The <em>works</em> section contains both personal projects and
          professional work. The <em>lab</em> section contains 'bite-sized'
          experiments rather than full projects. These experiments generally
          revolve around <strong>WebGL</strong> and usually focus on a specific
          topic or element.
        </p>
      </div>
      <AboutCanvas />
    </div>
  );
};

export default About;
