import ImageRow from './ImageRow';

const ExampleImages = (props) => {
  return (
    <group {...props}>
      <ImageRow align={'top'} />
      <ImageRow align={'middle'} />
      <ImageRow align={'bottom'} />
    </group>
  );
};

export default ExampleImages;
