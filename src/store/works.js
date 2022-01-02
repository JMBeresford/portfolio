import artofjayimg0 from '../img/artofjayjoson/0.png';
import artofjayimg1 from '../img/artofjayjoson/1.png';
import artofjayimg2 from '../img/artofjayjoson/2.png';
import artofjayimg3 from '../img/artofjayjoson/3.png';
import artofjayimg4 from '../img/artofjayjoson/4.png';
import artofjayavatar from '../img/artofjayjoson/avatar.png';
import jberesfordimg0 from '../img/johnberesford/0.png';
import jberesfordimg1 from '../img/johnberesford/1.png';
import jberesfordimg2 from '../img/johnberesford/2.png';
import jberesfordimg3 from '../img/johnberesford/3.png';
import jberesfordavatar from '../img/johnberesford/avatar.png';
import ucscchessimg0 from '../img/ucscchessclub/0.png';
import ucscchessimg1 from '../img/ucscchessclub/4.png';
import ucscchessimg2 from '../img/ucscchessclub/2.png';
import ucscchessimg3 from '../img/ucscchessclub/3.png';
import ucscchessimg4 from '../img/ucscchessclub/1.png';
import ucscchessavatar from '../img/ucscchessclub/avatar.png';

const worksSlice = (set, get) => ({
  works: [
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
      color: '#8657b1',
      accentColor: '#7777ee',
    },
    {
      name: 'John Beresford Portfolio',
      description: `John Beresford is a multidisciplinary designer and developer based in California. 
      He uses a synthesis of 3D design and standard web technologies.`,
      live: 'http://john-beresford.com',
      source: 'https://github.com/JMBeresford/portfolio',
      images: [jberesfordimg0, jberesfordimg1, jberesfordimg2, jberesfordimg3],
      color: '#ca7f7f',
      accentColor: '#ff1b82',
    },
    {
      name: 'UCSC Chess Club',
      description: `A digital chess application for users to play against colleagues in a controlled, 
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
      color: '#837546',
      accentColor: '#ffe4ab',
    },
  ],
  avatars: [artofjayavatar, jberesfordavatar, ucscchessavatar],
});

const actions = (set, get) => ({});

export { actions, worksSlice };
