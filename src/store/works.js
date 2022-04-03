import artofjayimg0 from '../img/artofjayjoson/0.webp';
import artofjayimg1 from '../img/artofjayjoson/1.webp';
import artofjayimg2 from '../img/artofjayjoson/2.webp';
import artofjayimg3 from '../img/artofjayjoson/3.webp';
import artofjayimg4 from '../img/artofjayjoson/4.webp';
import artofjayavatar from '../img/artofjayjoson/avatar.webp';
import jberesfordimg0 from '../img/johnberesford/0.webp';
import jberesfordimg1 from '../img/johnberesford/1.webp';
import jberesfordimg2 from '../img/johnberesford/2.webp';
import jberesfordavatar from '../img/johnberesford/avatar.webp';
import ucscchessimg0 from '../img/ucscchessclub/0.webp';
import ucscchessimg1 from '../img/ucscchessclub/4.webp';
import ucscchessimg2 from '../img/ucscchessclub/2.webp';
import ucscchessimg3 from '../img/ucscchessclub/3.webp';
import ucscchessimg4 from '../img/ucscchessclub/1.webp';
import ucscchessavatar from '../img/ucscchessclub/avatar.webp';
import deforestation0 from '../img/deforestationdetector/0.webp';
import deforestation1 from '../img/deforestationdetector/1.webp';
import deforestation2 from '../img/deforestationdetector/2.webp';
import deforestation3 from '../img/deforestationdetector/3.webp';
import deforestation4 from '../img/deforestationdetector/4.webp';
import deforestationAvatar from '../img/deforestationdetector/avatar.webp';

const worksSlice = (set, get) => ({
  works: [
    {
      name: 'Deforestation\nDetector',
      description: `Web application to promote awareness of deforestation in the amazon and how to
      assist with conservation efforts.`,
      live: 'http://deforestationdetector.com',
      source: 'https://github.com/Deforestation-Detector/web',
      images: [
        deforestation0,
        deforestation1,
        deforestation2,
        deforestation3,
        deforestation4,
      ],
      textures: [],
      color: '#52d187',
      accentColor: '#2d5e00',
    },
    {
      name: 'Art of Jay Joson',
      description: `Jay Joson is a character animator and illustrator based in California. 
        This project is a web showcase of some of his curated works.`,
      live: 'http://artofjayjoson.com',
      source: 'https://github.com/JMBeresford/art-of-jay-joson',
      images: [
        artofjayimg0,
        artofjayimg1,
        artofjayimg2,
        artofjayimg3,
        artofjayimg4,
      ],
      textures: [],
      color: '#8657b1',
      accentColor: '#aa5577',
    },
    {
      name: 'John Beresford Portfolio',
      description: `John Beresford is a multidisciplinary designer and developer based in California. 
      He uses a synthesis of 3D design and standard web technologies.`,
      live: 'http://john-beresford.com',
      source: 'https://github.com/JMBeresford/portfolio',
      images: [jberesfordimg0, jberesfordimg1, jberesfordimg2],
      textures: [],
      color: '#ca7f7f',
      accentColor: '#ff1b82',
    },
    {
      name: 'UCSC Chess Club',
      description: `A digital chess application for users to play against peers in a controlled, 
      local environment. Uses a standard ELO rating system to rate players relative to others.`,
      live: null,
      source: 'https://github.com/JMBeresford/UCSC-chessclub',
      images: [
        ucscchessimg0,
        ucscchessimg1,
        ucscchessimg2,
        ucscchessimg3,
        ucscchessimg4,
      ],
      textures: [],
      color: '#837546',
      accentColor: '#ffe4ab',
    },
  ],
  avatars: [
    deforestationAvatar,
    artofjayavatar,
    jberesfordavatar,
    ucscchessavatar,
  ],
  allImages: null,
});

const actions = (set, get) => ({
  getAllImages: () => {
    if (get().allImages === null) {
      const images = [];
      get().works.forEach((work) => {
        work.images.forEach((image) => {
          images.push(image);
        });
      });

      set({ allImages: images });
      return images;
    } else {
      return get().allImages;
    }
  },
});

export { actions, worksSlice };
