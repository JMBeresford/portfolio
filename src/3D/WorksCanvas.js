import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import useStore from '../store';
import IpadBackground from './IpadBackground';
import WorksCarousel from './WorksCarousel';
import font from '../fonts/EBGaramond-Bold.ttf';
import { gsap, Linear } from 'gsap';

const DisableRender = () => useFrame(() => null, 1000);

const WorksCanvas = () => {
  const ref = useRef();
  const titleRef = useRef();
  const imgRef = useRef();
  const view = useStore((state) => state.view);
  const destination = useStore((state) => state.destination);
  const works = useStore((state) => state.works);
  const currentWork = useStore((state) => state.currentWork);
  const animating = useStore((state) => state.animating);
  const mobile = useStore((state) => state.mobile);

  useEffect(() => {
    let anim;
    if (titleRef.current) {
      if (animating) {
        const spring = { value: 1 };
        anim = gsap.to(spring, {
          value: 0,

          duration: 0.2,
          onUpdate: () => {
            titleRef.current.fillOpacity = spring.value;
            titleRef.current.strokeOpacity = spring.value;
          },
          ease: Linear.easeInOut,
        });
      } else {
        const spring = { value: 0 };
        anim = gsap.to(spring, {
          value: 1,

          duration: 0.2,
          onUpdate: () => {
            titleRef.current.fillOpacity = spring.value;
            titleRef.current.strokeOpacity = spring.value;
          },
          ease: Linear.easeInOut,
        });
      }
    }

    return () => {
      if (anim) {
        anim.kill();
      }
    };
  }, [animating]);

  const handleOver = () => {
    useStore.setState({ intersecting: true });
    if (titleRef.current) {
      const spring = { value: titleRef.current.fillOpacity };

      gsap.to(spring, {
        value: 1,

        duration: 0.35,
        ease: Linear.easeInOut,
        onUpdate: () => {
          titleRef.current.fillOpacity = spring.value;
        },
      });
    }
  };

  const handleOut = () => {
    useStore.setState({ intersecting: false });
    if (titleRef.current) {
      const spring = { value: titleRef.current.fillOpacity };

      gsap.to(spring, {
        value: 0.5,

        duration: 0.35,
        ease: Linear.easeInOut,
        onUpdate: () => {
          titleRef.current.fillOpacity = spring.value;
        },
      });
    }
  };

  return (
    <div className='ipadWebGLWrapper'>
      <Canvas
        dpr={[1, 2]}
        gl={{ powerPreference: 'high-performance' }}
        ref={ref}
        camera={{ fov: 65 }}
        onCreated={({ camera, gl }) => {
          if (mobile) {
            camera.position.set(0, 0, 1.0);
          } else {
            camera.position.set(0, 0, 0.85);
          }
          gl.setClearColor('black');
        }}
      >
        {(view !== 'worksEntered' || destination) && <DisableRender />}
        <Suspense fallback={null}>
          <IpadBackground section='works' />
          <WorksCarousel ref={imgRef} />
          <Text
            onPointerOver={() => handleOver()}
            onPointerOut={() => handleOut()}
            ref={titleRef}
            position={[0, 0, 0.01]}
            color='white'
            maxWidth={1}
            transparent={false}
            font={font}
            fontSize={0.125}
            textAlign='center'
            strokeColor='black'
            strokeWidth={0.002}
            fillOpacity={0.5}
          >
            {works[currentWork].name}
          </Text>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default WorksCanvas;
