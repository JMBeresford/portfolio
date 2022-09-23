import useStore from '@/store';
import { useTexture } from '@react-three/drei';

// for (let work in Object.keys(useStore.getState().workImages)) {
//   let workImages = useStore.getState().workImages[work];

//   useTexture.preload(workImages);
// }

export default function useWorkImages(work) {
  const works = useStore.getState().workImages;

  return useTexture(works[work]);
}
