import { useControls } from 'leva';
import React from 'react';
import Career from './Career';
import Introduction from './Introduction';
import Socials from './Socials';

const Sections = () => {
  const { section1, section2 } = useControls('sectionAngles', {
    section1: { value: 0.052, step: 0.001 },
    section2: { value: 0.099, step: 0.001 },
  });

  return (
    <group>
      <Introduction />
      <Career angle={section1} />
    </group>
  );
};

export default Sections;
