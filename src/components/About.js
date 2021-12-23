import React, { useEffect, useRef } from 'react';
import useStore from '../store';
import AboutCanvas from '../3D/AboutCanvas';

const About = () => {
  const ref = useRef();
  const destination = useStore((state) => state.destination);

  useEffect(() => {
    if (destination === 'aboutEntered') {
      ref.current.classList.add('in');
    } else if (destination) {
      ref.current.classList.remove('in');
    }
  }, [destination]);

  return (
    <div ref={ref} id='about'>
      <div className='header'>
        <h1>About Me</h1>
      </div>

      <div className='content'>
        <div className='desc'>
          <p>
            I'm a multi-disciplinary designer and developer that feels most at
            home in the intersection of <strong>computer graphics</strong> and
            <strong> web design/development</strong>. This portfolio synthesizes
            the elements of that intersection that I find most appealing and
            fun!
          </p>
          <br />
          <p>
            The <em>works</em> section contains both personal projects and
            professional work. The <em>lab</em> section contains 'bite-sized'
            experiments rather than full projects. These experiments generally
            revolve around <strong>WebGL</strong> and usually focus on a
            specific topic or element.
          </p>
        </div>
        <AboutCanvas />
      </div>
    </div>
  );
};

export default About;
