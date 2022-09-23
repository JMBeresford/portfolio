import useStore from '@/store';
import { useTexture } from '@react-three/drei';
import { RepeatWrapping } from 'three';

// for (let tex of Object.values(useStore.getState().maps)) {
//   useTexture.preload(tex);
// }

export default function useTextureMaps() {
  const ios =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  const maps = ios ? useStore.getState().mapsIOS : useStore.getState().maps;

  return useTexture(maps, (textures) => {
    for (let tex of Object.values(textures)) {
      tex.flipY = false;
      tex.wrapS = tex.wrapT = RepeatWrapping;
    }
  });
}
