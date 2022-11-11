import { useStore } from '@/store';
import { useProgress } from '@react-three/drei';

const Loading = () => {
  const { progress, total } = useProgress();

  const transitioning = useStore((s) => s.transitioning);

  return (
    <div
      id='loading'
      className={transitioning || (progress < 100 && total !== 0) ? '' : 'out'}
    >
      <h1>Loading</h1>

      <div className='wrapper'>
        <p>{Math.floor(progress)}%</p>
      </div>
    </div>
  );
};

export default Loading;
