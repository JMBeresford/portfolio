import artofjayimg0 from '../img/artofjayjoson/0.png';
import artofjayimg1 from '../img/artofjayjoson/1.png';

const worksSlice = (set, get) => ({
  currentWork: {
    name: '',
    description: ``,
    live: '',
    source: '',
    images: [artofjayimg0, artofjayimg1],
    color: '#8657b1',
  },
  viewingWork: false,
  works: [
    {
      name: 'Art of Jay Joson',
      description: `Jay Joson is a character animator and illustrator based in California. 
        This project is a web showcase of some of his curated works.`,
      live: 'http://artofjayjoson.com',
      source: 'https://github.com/JMBeresford/art-of-jay-joson',
      images: [artofjayimg0, artofjayimg1],
      color: '#8657b1',
    },
    {
      name: 'John Beresford',
      description: `John Beresford is a multidisciplinary designer and developer based in California. 
      He develops creative web experiences using a synthesis of 3D design and standard web technologies.`,
      live: 'http://john-beresford.com',
      source: 'https://github.com/JMBeresford/portfolio',
      images: [artofjayimg1],
    },
    {
      name: 'UCSC Chess Club',
      description: `A digital chess application for users to play against colleagues in a controlled, 
      local environment. Uses a standard ELO rating system to rate players relative to others.`,
      live: null,
      source: 'https://github.com/JMBeresford/UCSC-chessclub',
      images: [artofjayimg1],
    },
  ],
});

const actions = (set, get) => ({
  viewWork: (work) => {
    set({ currentWork: work, viewingWork: true });
  },
});

export { actions, worksSlice };
