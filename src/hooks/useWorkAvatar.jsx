import useStore from '@/store';
import { useTexture } from '@react-three/drei';

export default function useWorkAvatar(work) {
  const { workAvatars } = useStore();

  return useTexture(workAvatars[work]);
}
