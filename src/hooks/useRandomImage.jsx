import useStore from '@/store';
import { useTexture } from '@react-three/drei';

const workImages = useStore.getState().workImages;

for (let work in workImages) {
  for (let image of workImages[work]) {
    useTexture.preload(image);
  }
}

export default function useRandomImage() {
  const { workImages } = useStore.getState();

  const works = Object.keys(workImages);
  const work = works[Math.floor(Math.random() * works.length)];

  const images = workImages[work];
  const image = images[Math.floor(Math.random() * images.length)];

  return useTexture(image);
}
