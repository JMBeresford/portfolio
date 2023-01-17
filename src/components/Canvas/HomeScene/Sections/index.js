import { useControls } from 'leva';
import React, { useMemo } from 'react';
import Work from './Work';
import Introduction from './Introduction';
import { useThree } from '@react-three/fiber';
import useFullWidth from '@/hooks/useFullWidth';
import Contact from './Contact';
import { useWorksStore } from '@/store';
import useFullHeight from '@/hooks/useFullHeight';

const Sections = () => {
  const { section1, section2 } = useControls('sectionAngles', {
    section1: { value: 0.0425, step: 0.001 },
    section2: { value: 0.081, step: 0.001 },
  });

  const size = useThree((s) => s.size);
  const works = useWorksStore((s) => s.works);
  const fullWidth = useFullWidth();
  const fullHeight = useFullHeight();
  const aspect = useMemo(() => size.width / size.height, [size]);
  const isMobile = useMemo(
    () => size.width < 768 || aspect < 1,
    [size, aspect]
  );

  // const { nPlanes } = useControls('workList', {
  //   nPlanes: { value: 25, min: 0, max: 100, step: 1 },
  // });

  // parameters of n-gons stolen from:
  // https://calcresource.com/geom-ngon.html
  const nPlanes = useMemo(() => {
    if (isMobile) return 25;

    if (aspect > 2.5) {
      if (size.width > 1920) {
        return 33;
      } else {
        return 27;
      }
    } else if (aspect > 2.3) {
      return 30;
    } else if (aspect > 2) {
      return 36;
    } else if (aspect > 1.7) {
      return 40;
    } else if (aspect > 1.2) {
      return 50;
    } else {
      return 55;
    }
  }, [aspect, size, isMobile]);

  const rotOffset = useMemo(() => (Math.PI * 2) / nPlanes, [nPlanes]);

  const width = useMemo(() => {
    let w;
    if (size.width > 1920) {
      w = fullWidth * 0.5;
    } else if (size.width > 1280) {
      w = fullWidth * 0.7;
    } else if (size.width > 768) {
      w = fullWidth * 0.8;
    } else {
      w = fullWidth * 0.9;
    }

    return Math.min(w, fullHeight * 1.65);
  }, [fullWidth, size, fullHeight]);

  const planeHeight = useMemo(() => {
    let r = 1.625;

    return r * 2 * Math.tan(Math.PI / nPlanes);
  }, [nPlanes]);

  return (
    <group>
      <Introduction />
      <Work
        angle={section1}
        rotOffset={rotOffset}
        width={width}
        height={planeHeight}
        isMobile={isMobile}
      />
      <Contact
        angle={section1 + rotOffset * (works.length + 1.5)}
        width={width}
        height={planeHeight}
        isMobile={isMobile}
      />
    </group>
  );
};

export default Sections;
