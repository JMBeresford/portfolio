import { Starfield } from './Starfield';
import { Clouds } from './Clouds';
import { Constellation } from './Constellation';

const Environment = (props) => {
  return (
    <group>
      <Starfield />
      <Constellation />
      <Clouds {...props} />
    </group>
  );
};

export default Environment;
