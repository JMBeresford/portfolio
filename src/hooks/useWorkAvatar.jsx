import { useWorksStore } from '@/store';
import { useTexture } from '@react-three/drei';
import artofjayjosonAvatar from '@/assets/img/artofjayjoson/avatar.webp';
import ucscchessclubAvatar from '@/assets/img/ucscchessclub/avatar.webp';
import deforestationdetectorAvatar from '@/assets/img/deforestationdetector/avatar.webp';
import { useRef } from 'react';

export default function useWorkAvatar(work) {
  const workAvatars = useRef({
    artofjayjoson: artofjayjosonAvatar.src,
    ucscchessclub: ucscchessclubAvatar.src,
    deforestationdetector: deforestationdetectorAvatar.src,
  });

  return useTexture(workAvatars.current[work]);
}
