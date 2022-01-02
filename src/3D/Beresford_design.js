/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react';
import { useGLTF, useTexture, shaderMaterial } from '@react-three/drei';
import useStore from '../store';
import modelPath from '../models/beresford_design.glb';
import bake1 from '../img/bakes/bake1.jpg';
import bake2 from '../img/bakes/bake2.jpg';
import lightmap1_1 from '../img/bakes/lightmap1_1.jpg';
import lightmap2_1 from '../img/bakes/lightmap2_1.jpg';
import lightmap1_2 from '../img/bakes/lightmap1_2.jpg';
import lightmap2_2 from '../img/bakes/lightmap2_2.jpg';
import { extend, useFrame, useThree } from '@react-three/fiber';

import {
  ACESFilmicToneMapping,
  CineonToneMapping,
  Color,
  LinearToneMapping,
  Mesh,
  NoToneMapping,
  ReinhardToneMapping,
  RGBFormat,
} from 'three';
import { gsap, Power2 } from 'gsap';

import bakedVertexShader from '../shaders/baked/vert.glsl';
import bakedFragmentShader from '../shaders/baked/frag.glsl';
import screenVertexShader from '../shaders/screen/vert.glsl';
import screenFragmentShader from '../shaders/screen/frag.glsl';
import ipadVertexShader from '../shaders/ipads/vert.glsl';
import ipadFragmentShader from '../shaders/ipads/frag.glsl';

const BakedMaterial = shaderMaterial(
  {
    uMap: null,
    uLightMap: null,
    uLightMap2: null,
    uTableColor: new Color(1, 1, 1),
    uMacColor: new Color(1, 1, 1),
    uEmailIntensity: 1.0,
    uInstaIntensity: 1.0,
    uLinkedinIntensity: 1.0,
    uGithubIntensity: 1.0,
    uMacIntensity: 1.0,
    uTableIntensity: 1.0,
  },
  bakedVertexShader,
  bakedFragmentShader
);

const ScreenMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: [0, 0, 0],
    uEntered: 0,
  },
  screenVertexShader,
  screenFragmentShader
);

const IpadMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new Color(),
  },
  ipadVertexShader,
  ipadFragmentShader
);

extend({ BakedMaterial, ScreenMaterial, IpadMaterial });

const Model = (props) => {
  /**
   * STORE
   */
  const transitionView = useStore((state) => state.actions.transitionView);
  const back = useStore((state) => state.actions.back);
  const mouse = useStore((state) => state.mouse);
  const mobile = useStore((state) => state.mobile);
  const intersect = useStore((state) => state.actions.intersect);
  const intersections = useRef(useStore.getState().intersections);
  const viewRef = useRef(useStore.getState().view);
  const destinationRef = useRef(useStore.getState().destination);
  const animating = useRef(useStore.getState().animatingView);
  const started = useStore((state) => state.started);

  useEffect(
    () => useStore.subscribe((state) => (viewRef.current = state.view)),
    []
  );

  useEffect(
    () =>
      useStore.subscribe(
        (state) => (destinationRef.current = state.destination)
      ),
    []
  );

  useEffect(
    () =>
      useStore.subscribe(
        (state) => (intersections.current = state.intersections)
      ),
    []
  );

  useEffect(
    () =>
      useStore.subscribe((state) => (animating.current = state.animatingView)),
    []
  );

  /**
   * REF's
   */
  const group = useRef();
  const macRef = useRef();
  const bake1Ref = useRef();
  const bake2Ref = useRef();
  const socialsTl = useRef();
  const emailTl = useRef();
  const instaTl = useRef();
  const linkedinTl = useRef();
  const githubTl = useRef();
  const tableTl = useRef();
  const macTl = useRef();
  const scene = useThree((state) => state.scene);
  const renderer = useThree((state) => state.gl);

  const socialRef0 = useRef();
  const socialRef1 = useRef();
  const socialRef2 = useRef();
  const socialRef3 = useRef();

  const ipadRef0 = useRef();
  const ipadRef1 = useRef();
  const ipadRef2 = useRef();

  const monitorRef = useRef();

  /**
   * TEXTURES
   */
  const bake1map = useTexture(bake1);
  bake1map.flipY = false;
  bake1map.format = RGBFormat;

  const bake2map = useTexture(bake2);
  bake2map.flipY = false;
  bake2map.format = RGBFormat;

  const bake2lightmap = useTexture(lightmap2_1);
  bake2lightmap.flipY = false;
  bake2lightmap.format = RGBFormat;

  const bake1lightmap = useTexture(lightmap1_1);
  bake1lightmap.flipY = false;
  bake1lightmap.format = RGBFormat;

  const bake2lightmap2 = useTexture(lightmap2_2);
  bake2lightmap2.flipY = false;
  bake2lightmap2.format = RGBFormat;

  const bake1lightmap2 = useTexture(lightmap1_2);
  bake1lightmap2.flipY = false;
  bake1lightmap2.format = RGBFormat;

  /**
   * CONFIG
   */

  const CONFIG = {
    macLight: {
      intensity: 1.0,
      color: { r: 255, g: 255, b: 255 },
    },
    tableLight: {
      intensity: 0.7,
      color: { r: 35.0115, g: 92.9985, b: 255 },
    },
  };

  /**
   * INIT
   */
  useEffect(() => {
    useStore.setState({ ready: true });
  }, []);

  /**
   * DEBUGGING
   */
  useEffect(() => {
    if (useStore.getState().debug.active) {
      const pane = useStore.getState().debug.pane;

      pane
        .addButton({
          title: 'No Tonemapping',
        })
        .on('click', () => {
          renderer.toneMapping = NoToneMapping;
          renderer.toneMappingExposure = 1;

          scene.traverse((child) => {
            if (child instanceof Mesh) {
              child.material.needsUpdate = true;
            }
          });
        });

      pane
        .addButton({
          title: 'Linear Tonemapping',
        })
        .on('click', () => {
          renderer.toneMapping = LinearToneMapping;
          renderer.toneMappingExposure = 1;

          scene.traverse((child) => {
            if (child instanceof Mesh) {
              child.material.needsUpdate = true;
            }
          });
        });

      pane
        .addButton({
          title: 'Reinhard Tonemapping',
        })
        .on('click', () => {
          renderer.toneMapping = ReinhardToneMapping;
          renderer.toneMappingExposure = 1.5;

          scene.traverse((child) => {
            if (child instanceof Mesh) {
              child.material.needsUpdate = true;
            }
          });
        });

      pane
        .addButton({
          title: 'ACES Filmic Tonemapping',
        })
        .on('click', () => {
          renderer.toneMapping = ACESFilmicToneMapping;
          renderer.toneMappingExposure = 1;

          scene.traverse((child) => {
            if (child instanceof Mesh) {
              child.material.needsUpdate = true;
            }
          });
        });

      pane
        .addButton({
          title: 'Cineon Tonemapping',
        })
        .on('click', () => {
          renderer.toneMapping = CineonToneMapping;
          renderer.toneMappingExposure = 1;

          scene.traverse((child) => {
            if (child instanceof Mesh) {
              child.material.needsUpdate = true;
            }
          });
        });

      return () => {
        if (pane && pane.dispose) {
          pane.dispose();
        }
      };
    }
  }, [renderer, scene]);

  /**
   * ANIMATION HANDLING
   */
  useEffect(() => {
    if (started) {
      let anim = gsap.to(monitorRef.current.material.uniforms.uEntered, {
        value: 1,

        duration: 1.5,
        ease: Power2.easeIn,
      });

      return () => {
        if (anim && anim.kill) anim.kill();
      };
    }
  }, [started]);

  useEffect(() => {
    tableTl.current = gsap
      .timeline()
      .to(
        bake2Ref.current.material.uniforms.uTableColor.value,
        {
          duration: 3,
          repeat: -1,
          yoyo: true,
          yoyoEase: Power2.easeOut,
          r: 1.0,
          g: 0.1176,
          b: 0.4863,
        },
        0
      )
      .to(
        bake1Ref.current.material.uniforms.uTableColor.value,
        {
          duration: 3,
          repeat: -1,
          yoyo: true,
          yoyoEase: Power2.easeOut,
          r: 1.0,
          g: 0.1176,
          b: 0.4863,
        },
        0
      );

    return () => {
      if (tableTl.current && tableTl.current.kill) {
        tableTl.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    socialsTl.current = gsap
      .timeline({ paused: true })
      .to(
        bake2Ref.current.material.uniforms.uEmailIntensity,
        {
          value: 1.5,
          duration: 0.5,
          ease: Power2.easeInOut,
        },
        0
      )
      .to(
        bake2Ref.current.material.uniforms.uInstaIntensity,
        {
          value: 1.5,
          duration: 0.5,
          ease: Power2.easeInOut,
        },
        0
      )
      .to(
        bake2Ref.current.material.uniforms.uLinkedinIntensity,
        {
          value: 1.5,
          duration: 0.5,
          ease: Power2.easeInOut,
        },
        0
      )
      .to(
        bake2Ref.current.material.uniforms.uGithubIntensity,
        {
          value: 1.5,
          duration: 0.5,
          ease: Power2.easeInOut,
        },
        0
      )
      .to(
        bake1Ref.current.material.uniforms.uEmailIntensity,
        {
          value: 1.5,
          duration: 0.5,
          ease: Power2.easeInOut,
        },
        0
      )
      .to(
        bake1Ref.current.material.uniforms.uInstaIntensity,
        {
          value: 1.5,
          duration: 0.5,
          ease: Power2.easeInOut,
        },
        0
      )
      .to(
        bake1Ref.current.material.uniforms.uLinkedinIntensity,
        {
          value: 1.5,
          duration: 0.5,
          ease: Power2.easeInOut,
        },
        0
      )
      .to(
        bake1Ref.current.material.uniforms.uGithubIntensity,
        {
          value: 1.5,
          duration: 0.5,
          ease: Power2.easeInOut,
        },
        0
      );

    return () => {
      if (socialsTl.current && socialsTl.current.kill) {
        socialsTl.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    emailTl.current = gsap
      .timeline({ paused: true })
      .to(
        bake2Ref.current.material.uniforms.uEmailIntensity,
        {
          value: 1.5,
          duration: 0.5,
          ease: Power2.easeInOut,
        },
        0
      )
      .to(
        bake1Ref.current.material.uniforms.uEmailIntensity,
        {
          value: 1.5,
          duration: 0.5,
          ease: Power2.easeInOut,
        },
        0
      );

    return () => {
      if (emailTl.current && emailTl.current.kill) {
        emailTl.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    instaTl.current = gsap
      .timeline({ paused: true })
      .to(
        bake2Ref.current.material.uniforms.uInstaIntensity,
        {
          value: 1.5,
          duration: 0.5,
          ease: Power2.easeInOut,
        },
        0
      )
      .to(
        bake1Ref.current.material.uniforms.uInstaIntensity,
        {
          value: 1.5,
          duration: 0.5,
          ease: Power2.easeInOut,
        },
        0
      );

    return () => {
      if (instaTl.current && instaTl.current.kill) {
        instaTl.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    linkedinTl.current = gsap
      .timeline({ paused: true })
      .to(
        bake2Ref.current.material.uniforms.uLinkedinIntensity,
        {
          value: 1.5,
          duration: 0.5,
          ease: Power2.easeInOut,
        },
        0
      )
      .to(
        bake1Ref.current.material.uniforms.uLinkedinIntensity,
        {
          value: 1.5,
          duration: 0.5,
          ease: Power2.easeInOut,
        },
        0
      );

    return () => {
      if (linkedinTl.current && linkedinTl.current.kill) {
        linkedinTl.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    githubTl.current = gsap
      .timeline({ paused: true })
      .to(
        bake2Ref.current.material.uniforms.uGithubIntensity,
        {
          value: 1.5,
          duration: 0.5,
          ease: Power2.easeInOut,
        },
        0
      )
      .to(
        bake1Ref.current.material.uniforms.uGithubIntensity,
        {
          value: 1.5,
          duration: 0.5,
          ease: Power2.easeInOut,
        },
        0
      );

    return () => {
      if (githubTl.current && githubTl.current.kill) {
        githubTl.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    macTl.current = gsap
      .timeline({ paused: true })
      .to(
        bake1Ref.current.material.uniforms.uMacIntensity,
        {
          value: 0,

          duration: 0.05,
          repeat: 1,
          yoyo: true,
        },
        'first'
      )
      .to(
        bake2Ref.current.material.uniforms.uMacIntensity,
        {
          value: 0,

          duration: 0.05,
          repeat: 1,
          yoyo: true,
        },
        'first'
      )
      .to(
        macRef.current.material.color,
        {
          r: 0,
          g: 0,
          b: 0,

          duration: 0.05,
          repeat: 1,
          yoyo: true,
        },
        'first'
      )
      .to(
        bake1Ref.current.material.uniforms.uMacIntensity,
        {
          value: 0,

          duration: 0.05,
          delay: 0.5,
          repeat: 1,
          yoyo: true,
        },
        'second'
      )
      .to(
        bake2Ref.current.material.uniforms.uMacIntensity,
        {
          value: 0,

          duration: 0.05,
          delay: 0.5,
          repeat: 1,
          yoyo: true,
        },
        'second'
      )
      .to(
        macRef.current.material.color,
        {
          r: 0,
          g: 0,
          b: 0,

          duration: 0.05,
          delay: 0.5,
          repeat: 1,
          yoyo: true,
        },
        'second'
      )
      .to(
        bake1Ref.current.material.uniforms.uMacIntensity,
        {
          value: 0,

          duration: 0.05,
          repeat: 1,
          yoyo: true,
        },
        'third'
      )
      .to(
        bake2Ref.current.material.uniforms.uMacIntensity,
        {
          value: 0,

          duration: 0.05,
        },
        'third'
      )
      .to(
        macRef.current.material.color,
        {
          r: 0,
          g: 0,
          b: 0,

          duration: 0.05,
        },
        'third'
      )
      .to(
        bake1Ref.current.material.uniforms.uMacIntensity,
        {
          value: 1,

          duration: 0.05,
          repeat: 4,
          delay: 0.75,
          yoyo: true,
        },
        'fourth'
      )
      .to(
        bake2Ref.current.material.uniforms.uMacIntensity,
        {
          value: 1,

          duration: 0.05,
          repeat: 4,
          delay: 0.75,
          yoyo: true,
        },
        'fourth'
      )
      .to(
        macRef.current.material.color,
        {
          r: CONFIG.macLight.color.r / 255,
          g: CONFIG.macLight.color.g / 255,
          b: CONFIG.macLight.color.b / 255,

          duration: 0.05,
          repeat: 4,
          delay: 0.75,
          yoyo: true,
        },
        'fourth'
      );

    return () => {
      if (macTl.current && macTl.current.kill) {
        macTl.current.kill();
      }
    };
  }, [
    CONFIG.macLight.color.r,
    CONFIG.macLight.color.g,
    CONFIG.macLight.color.b,
  ]);

  useFrame(({ clock }) => {
    if (
      ['worksEntered', 'aboutEntered', 'labEntered'].includes(
        viewRef.current
      ) &&
      !destinationRef.current
    ) {
      return;
    }

    const intersects = intersections.current;

    if (intersects.length > 0) {
      for (let obj of intersects) {
        if (obj.eventObject.userData.name) {
          switch (obj.eventObject.userData.name) {
            case 'socials': {
              if (viewRef.current !== 'socials' && !animating.current) {
                if (
                  socialsTl.current.reversed() ||
                  !socialsTl.current.isActive()
                ) {
                  socialsTl.current.play();
                }
              }

              break;
            }
            case 'email': {
              if (viewRef.current === 'socials' && !animating.current) {
                if (emailTl.current.reversed() || !emailTl.current.isActive()) {
                  emailTl.current.play();
                }
              }

              break;
            }
            case 'insta': {
              if (viewRef.current === 'socials' && !animating.current) {
                if (instaTl.current.reversed() || !instaTl.current.isActive()) {
                  instaTl.current.play();
                }
              }

              break;
            }
            case 'linkedin': {
              if (viewRef.current === 'socials' && !animating.current) {
                if (
                  linkedinTl.current.reversed() ||
                  !linkedinTl.current.isActive()
                ) {
                  linkedinTl.current.play();
                }
              }

              break;
            }
            case 'github': {
              if (viewRef.current === 'socials' && !animating.current) {
                if (
                  githubTl.current.reversed() ||
                  !githubTl.current.isActive()
                ) {
                  githubTl.current.play();
                }
              }

              break;
            }
            default: {
              break;
            }
          }

          intersect(intersects);
        }
      }
    }

    if (
      intersects.find((obj) => obj.eventObject.userData.name === 'socials') ===
      undefined
    ) {
      if (viewRef.current !== 'socials') {
        if (!socialsTl.current.reversed() || !socialsTl.current.isActive()) {
          socialsTl.current.reverse();
        }
      }
    }

    if (
      intersects.find((obj) => obj.eventObject.userData.name === 'email') ===
      undefined
    ) {
      if (viewRef.current === 'socials') {
        if (!emailTl.current.reversed() || !emailTl.current.isActive()) {
          emailTl.current.reverse();
        }
      }
    }

    if (
      intersects.find((obj) => obj.eventObject.userData.name === 'insta') ===
      undefined
    ) {
      if (viewRef.current === 'socials') {
        if (!instaTl.current.reversed() || !instaTl.current.isActive()) {
          instaTl.current.reverse();
        }
      }
    }

    if (
      intersects.find((obj) => obj.eventObject.userData.name === 'linkedin') ===
      undefined
    ) {
      if (viewRef.current === 'socials') {
        if (!linkedinTl.current.reversed() || !linkedinTl.current.isActive()) {
          linkedinTl.current.reverse();
        }
      }
    }

    if (
      intersects.find((obj) => obj.eventObject.userData.name === 'github') ===
      undefined
    ) {
      if (viewRef.current === 'socials') {
        if (!githubTl.current.reversed() || !githubTl.current.isActive()) {
          githubTl.current.reverse();
        }
      }
    }

    if (intersects.find((obj) => obj.eventObject.userData.name) === undefined) {
      useStore.setState({ intersecting: false });
    }

    monitorRef.current.material.uTime = clock.elapsedTime + 100.0;

    ipadRef0.current.material.uTime = clock.elapsedTime;
    ipadRef1.current.material.uTime = clock.elapsedTime - 0.15;
    ipadRef2.current.material.uTime = clock.elapsedTime - 0.3;
  });

  /**
   * EVENT HANDLERS
   */
  const handleClick = (e) => {
    switch (e.eventObject.userData.name) {
      case 'socials': {
        if (viewRef.current === 'socials' || mobile) {
        } else {
          socialsTl.current.reverse();
          transitionView('socials');
        }

        break;
      }

      case 'about': {
        if (viewRef.current !== 'aboutEntered') {
          transitionView('aboutEntered');
        }

        break;
      }

      case 'works': {
        if (viewRef.current !== 'worksEntered') {
          transitionView('worksEntered');
        }

        break;
      }

      case 'lab': {
        if (viewRef.current !== 'labEntered') {
          transitionView('labEntered');
        }

        break;
      }

      case 'email': {
        if (viewRef.current === 'socials' || mobile) {
          window.open('mailto:john@beresford-design.com', '_blank');
        } else {
          socialsTl.current.reverse();
          transitionView('socials');
        }

        break;
      }
      case 'insta': {
        if (viewRef.current === 'socials' || mobile) {
          window.open('https://www.instagram.com/beresforddesign/', '_blank');
        } else {
          socialsTl.current.reverse();
          transitionView('socials');
        }

        break;
      }

      case 'linkedin': {
        if (viewRef.current === 'socials' || mobile) {
          window.open('https://www.linkedin.com/in/JMBeresford', '_blank');
        } else {
          socialsTl.current.reverse();
          transitionView('socials');
        }

        break;
      }

      case 'github': {
        if (viewRef.current === 'socials' || mobile) {
          window.open('https://github.com/JMBeresford', '_blank');
        } else {
          socialsTl.current.reverse();
          transitionView('socials');
        }

        break;
      }

      case 'mac': {
        macTl.current.play(0);
        break;
      }

      case 'desk': {
        if (viewRef.current !== 'start' && viewRef.current !== 'desk') {
          transitionView('desk');
        } else {
          transitionView('main');
        }

        break;
      }

      default: {
        for (let intersection of intersections.current) {
          if (intersection.eventObject.userData.name) {
            return;
          }
        }

        back();
        break;
      }
    }

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1.0;
    mouse.y = (e.clientY / window.innerHeight) * -2 + 1.0;
  };

  const handlePointerDown = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1.0;
    mouse.y = (e.clientY / window.innerHeight) * -2 + 1.0;
  };

  const handlePointerMove = (e) => {
    if (e && e.pointerType) {
      useStore.setState({ pointerType: e.pointerType });
    }

    if (!animating.current) {
      useStore.setState({ intersections: e.intersections });
    }
  };

  /**
   * 3D MODEL
   */
  const { nodes } = useGLTF(modelPath);
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onClick={(e) => handleClick(e)}
      onPointerMove={(e) => {
        handlePointerMove(e);
      }}
      onPointerDown={(e) => handlePointerDown(e)}
    >
      <mesh
        geometry={nodes.phone_emissive.geometry}
        position={[0.01893, 0.78195, -0.80597]}
      >
        <meshBasicMaterial />
      </mesh>
      <mesh
        ref={monitorRef}
        geometry={nodes.monitor_emissive.geometry}
        position={[0.34019, 1.12988, -0.91913]}
      >
        <screenMaterial />
      </mesh>
      <mesh
        ref={ipadRef0}
        geometry={nodes.ipad_emissive001.geometry}
        position={[-1.33282, 1.3842, -0.76811]}
        userData={{ name: 'aboutPad' }}
        onClick={(e) => handleClick(e)}
      >
        <ipadMaterial uColor={[1.0, 0.5098, 0.4745]} />
      </mesh>
      <mesh
        ref={ipadRef1}
        geometry={nodes.ipad_emissive002.geometry}
        position={[-0.91018, 0.9881, -0.76811]}
        userData={{ name: 'worksPad' }}
        onClick={(e) => handleClick(e)}
      >
        <ipadMaterial uColor={[0.4745, 0.7451, 1.0]} />
      </mesh>
      <mesh
        geometry={nodes.shelving_emissive.geometry}
        position={[-1.1215, 1.24219, -0.76169]}
      >
        <meshBasicMaterial color={'#ccccb0'} />
      </mesh>
      <mesh
        geometry={nodes.lamp_emissives.geometry}
        position={[1.29823, 1.57727, -0.86724]}
      >
        <meshBasicMaterial />
      </mesh>
      <mesh
        geometry={nodes.wall_emissive.geometry}
        position={[0.00167, 0.03201, -0.39003]}
      >
        <meshBasicMaterial color={'#ffffbb'} />
      </mesh>
      <mesh
        ref={ipadRef2}
        geometry={nodes.ipad_emissive003.geometry}
        position={[-1.34343, 0.61977, -0.76811]}
        userData={{ name: 'labPad' }}
        onClick={(e) => handleClick(e)}
      >
        <ipadMaterial uColor={[0.6706, 0.4196, 1.0]} />
      </mesh>
      <mesh
        ref={bake2Ref}
        geometry={nodes.wallsFloorsMerge.geometry}
        position={[0.12731, 0.04368, 0.49887]}
      >
        <bakedMaterial
          uMap={bake2map}
          uLightMap={bake2lightmap}
          uLightMap2={bake2lightmap2}
          uEmailIntensity={1.0}
          uMacIntensity={CONFIG.macLight.intensity}
          uMacColor={[
            CONFIG.macLight.color.r / 255,
            CONFIG.macLight.color.g / 255,
            CONFIG.macLight.color.b / 255,
          ]}
          uTableColor={[
            CONFIG.tableLight.color.r / 255,
            CONFIG.tableLight.color.g / 255,
            CONFIG.tableLight.color.b / 255,
          ]}
          uTableIntensity={CONFIG.tableLight.intensity}
        />
      </mesh>
      <mesh
        ref={bake1Ref}
        geometry={nodes.itemsMerge.geometry}
        position={[-1.34119, 0.93352, -0.83501]}
      >
        <bakedMaterial
          uMap={bake1map}
          uLightMap={bake1lightmap}
          uLightMap2={bake1lightmap2}
          uMacIntensity={CONFIG.macLight.intensity}
          uMacColor={[
            CONFIG.macLight.color.r / 255,
            CONFIG.macLight.color.g / 255,
            CONFIG.macLight.color.b / 255,
          ]}
          uTableColor={[
            CONFIG.tableLight.color.r / 255,
            CONFIG.tableLight.color.g / 255,
            CONFIG.tableLight.color.b / 255,
          ]}
          uTableIntensity={CONFIG.tableLight.intensity}
        />
      </mesh>
      <mesh
        ref={socialRef0}
        geometry={nodes.email_emissive.geometry}
        position={[-1.54201, 1.74999, -0.82321]}
        onClick={(e) => handleClick(e, 'email')}
        userData={{ name: 'email' }}
      >
        <meshBasicMaterial color={'#ddddff'} />
      </mesh>
      <mesh
        ref={socialRef1}
        geometry={nodes.insta_emissive.geometry}
        position={[-1.2595, 1.74999, -0.82434]}
        onClick={(e) => handleClick(e, 'insta')}
        userData={{ name: 'insta' }}
      >
        <meshBasicMaterial color={'#eeddf0'} />
      </mesh>
      <mesh
        ref={socialRef3}
        geometry={nodes.github_emissive.geometry}
        position={[-0.70014, 1.74999, -0.82434]}
        onClick={(e) => handleClick(e, 'github')}
        userData={{ name: 'github' }}
      >
        <meshBasicMaterial color={'#ffdfdf'} />
      </mesh>
      <mesh
        geometry={nodes.mac_pro_emissive.geometry}
        position={[0.87088, 0.30488, -0.54437]}
        scale={[1, 0.99, 1]}
        onClick={(e) => handleClick(e, 'mac')}
        userData={{ name: 'mac' }}
        ref={macRef}
      >
        <meshBasicMaterial />
      </mesh>
      <mesh
        ref={socialRef2}
        geometry={nodes.linkedin_emissive.geometry}
        position={[-0.9821, 1.74999, -0.82434]}
        onClick={(e) => handleClick(e, 'linkedin')}
        userData={{ name: 'linkedin' }}
      >
        <meshBasicMaterial color={'#ffeeef'} />
      </mesh>
      <mesh
        position={[-1.1208, 1.74999, -0.82434]}
        onClick={(e) => handleClick(e, 'socials')}
        userData={{ name: 'socials' }}
      >
        <boxGeometry args={[1.15, 0.35, 0.45]} />
        <meshBasicMaterial color='red' visible={false} />
      </mesh>
      <mesh
        position={[-1.0708, 1.40999, -0.82434]}
        onClick={(e) => handleClick(e, 'about')}
        userData={{ name: 'about' }}
      >
        <boxGeometry args={[0.8, 0.25, 0.45]} />
        <meshBasicMaterial color='red' visible={false} />
      </mesh>
      <mesh
        position={[-1.1208, 1.00999, -0.82434]}
        onClick={(e) => handleClick(e, 'works')}
        userData={{ name: 'works' }}
      >
        <boxGeometry args={[0.8, 0.25, 0.45]} />
        <meshBasicMaterial color='red' visible={false} />
      </mesh>
      <mesh
        position={[-1.0708, 0.62999, -0.82434]}
        onClick={(e) => handleClick(e, 'lab')}
        userData={{ name: 'lab' }}
      >
        <boxGeometry args={[0.8, 0.25, 0.45]} />
        <meshBasicMaterial color='red' visible={false} />
      </mesh>
      <mesh
        position={[0.38019, 1.0588, -0.91913]}
        onClick={(e) => handleClick(e, 'desk')}
        userData={{ name: 'desk' }}
      >
        <boxGeometry args={[1.45, 0.625, 0.85]} />
        <meshBasicMaterial color='red' visible={false} />
      </mesh>
    </group>
  );
};

useGLTF.preload(modelPath);

export default Model;
