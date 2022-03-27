import { useSpring } from '@react-spring/three';
import useStore from '../../../../store';
import ImageRow from './ImageRow';

const ExampleImages = (props) => {
  const leavingIpad = useStore((state) => state.leavingIpad);

  const { opacity } = useSpring({
    opacity: props.visible && !leavingIpad ? 0.65 : 0,
  });

  return (
    <group {...props}>
      <ImageRow opacity={opacity} align={'top'} />
      <ImageRow opacity={opacity} align={'middle'} />
      <ImageRow opacity={opacity} align={'bottom'} />
    </group>
  );
};

export default ExampleImages;
