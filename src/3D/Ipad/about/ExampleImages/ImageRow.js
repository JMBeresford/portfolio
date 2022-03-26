import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import useStore from '../../../../store';
import Image from './Image';

const ASPECT = 1368 / 1069;

const ImageRow = (props) => {
  const ref = useRef();
  const { viewport, clock } = useThree();
  const texturePaths = useStore.getState().actions.getAllImages();

  var direction = useMemo(
    () => (props.align === 'middle' ? 1 : -1),
    [props.align]
  );

  const imageSize = useMemo(
    () => ({
      width: ASPECT * 0.25 * viewport.height,
      height: 0.25 * viewport.height,
    }),
    [viewport]
  );

  const rowWidth = useMemo(
    () => imageSize.width * texturePaths.length,
    [imageSize, texturePaths]
  );

  const verticalPos = useMemo(() => {
    if (props.align === 'top') {
      return imageSize.height * 0.9;
    } else if (props.align === 'bottom') {
      return -imageSize.height * 0.9;
    } else {
      return 0;
    }
  }, [props.align, imageSize]);

  const shuffledTexturePaths = useMemo(() => {
    // Fisher-Yates shuffle
    const arr = texturePaths.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [texturePaths]);

  const t = useRef(clock.elapsedTime);

  useFrame(({ clock }) => {
    let delta = clock.elapsedTime - t.current;
    t.current = clock.elapsedTime;

    ref.current.position.x += delta * 0.1 * direction;

    if (
      ref.current.position.x > rowWidth * 0.5 - imageSize.width * 2 ||
      ref.current.position.x < -rowWidth * 0.5 + imageSize.width * 2
    ) {
      direction *= -1;
    }
  });

  return (
    <group ref={ref}>
      {shuffledTexturePaths.map((url, index) => {
        return (
          <Image
            key={url}
            url={url}
            opacity={props.opacity}
            position={[
              -0.5 * rowWidth + index * imageSize.width,
              verticalPos,
              0,
            ]}
            size={imageSize}
          />
        );
      })}
    </group>
  );
};

export default ImageRow;
