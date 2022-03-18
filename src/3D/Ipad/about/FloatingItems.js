import React from 'react';
import Office from './OfficeMerged';
import PortalModel from './PortalModel';
import RainforestModel from './Rainforest';

const FloatingItems = (props) => {
  return (
    <group {...props}>
      <Office
        scale={[0.15, 0.15, 0.15]}
        rotation={[0, Math.PI / 4, 0]}
        position={[-1.75, -0.65, 0]}
      />
      <PortalModel scale={[0.035, 0.035, 0.035]} position={[0, -1, 0]} />
      <RainforestModel
        scale={[0.0045, 0.0045, 0.0045]}
        position={[1.75, -0.65, 0]}
        rotation={[Math.PI / 8, 0, Math.PI / 16]}
      />
    </group>
  );
};

export default FloatingItems;
