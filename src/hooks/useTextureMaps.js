import useStore from '@/store';
import { useTexture } from '@react-three/drei';
import { RepeatWrapping } from 'three';

for (let tex of Object.values(useStore.getState().maps)) {
  useTexture.preload(tex);
}

export default function useTextureMaps() {
  return useTexture(useStore.getState().maps, (textures) => {
    for (let tex of Object.values(textures)) {
      tex.flipY = false;
      tex.wrapS = tex.wrapT = RepeatWrapping;
    }
  });
}
