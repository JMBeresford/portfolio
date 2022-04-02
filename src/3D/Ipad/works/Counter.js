import { Text } from '@react-three/drei';
import React, { useRef } from 'react';
import useStore from '../../../store';
import font from '../../../fonts/EBGaramond-Bold.ttf';

const Counter = (props) => {
  const ref = useRef();

  const { currentWork } = useStore();

  return (
    <Text
      ref={ref}
      {...props}
      fontSize={2}
      fillOpacity={0.1}
      font={font}
      text={currentWork < 10 ? `0${currentWork}` : currentWork}
    />
  );
};

export default Counter;
