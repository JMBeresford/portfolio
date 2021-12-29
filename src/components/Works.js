import React from 'react';
import Work from '../3D/Work';
import WorkList from './WorkList';

const Works = React.memo(() => {
  return (
    <div id='works'>
      <WorkList />
      <Work />
    </div>
  );
});

export default Works;
