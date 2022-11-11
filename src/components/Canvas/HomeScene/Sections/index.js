import { useControls } from 'leva';
import React, { Suspense } from 'react';
import Work from './Work';
import Introduction from './Introduction';
import Socials from './Socials';

const Sections = () => {
  const { section1, section2 } = useControls('sectionAngles', {
    section1: { value: 0.035, step: 0.001 },
    section2: { value: 0.081, step: 0.001 },
  });

  return (
    <group>
      <Introduction />
      <Work angle={section1} />
      <Socials angle={section2} />
    </group>
  );
};

export default Sections;
