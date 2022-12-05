import { useThree } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { useControls } from 'leva';
import { KernelSize, Resizer } from 'postprocessing';

const PostProcessing = ({ renderPriority = 1 }) => {
  const { smoothing, threshold, intensity } = useControls('bloom', {
    smoothing: { value: 0.6, min: 0, max: 2 },
    threshold: { value: 0.68, min: 0, max: 1 },
    intensity: { value: 1, min: 0, max: 2 },
  });

  const size = useThree((s) => s.size);

  return (
    <>
      <EffectComposer
        multisampling={8}
        renderPriority={renderPriority}
        disableNormalPass={true}
        resolutionScale={0.5}
      >
        <Bloom
          luminanceThreshold={threshold}
          intensity={intensity}
          luminanceSmoothing={smoothing}
          height={size.height / 2}
          width={size.width / 2}
          kernelSize={KernelSize.VERY_SMALL}
        />
        <Vignette eskil={false} darkness={0.35} />
      </EffectComposer>
    </>
  );
};

export default PostProcessing;
