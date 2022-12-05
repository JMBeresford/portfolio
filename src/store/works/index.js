import create from 'zustand';
import { imagesSlice, imagesActions } from './imagesSlice';

// non-application state
const useWorksStore = create((set, get) => ({
  works: [
    {
      displayName: 'Deforestation Detector',
      name: 'deforestationdetector',
      description:
        'Deforestation Detector is a web experience that is intended to promote awareness of deforestation in the Amazon and inform users how they can \
assist with conservation efforts.',
      live: 'http://deforestationdetector.com',
      source: 'https://github.com/Deforestation-Detector/web',
      color: '#c9461e',
      accentColor: '#007D5C',
      images: imagesSlice.deforestationdetector.images,
      avatar: imagesSlice.deforestationdetector.avatar,
      year: 2022,
    },
    {
      displayName: 'UCSC Chess Club',
      name: 'ucscchessclub',
      description:
        'UCSC Chess Club is a digital chess application for users to play against their peers in a controlled, \
localized environment.',
      live: null,
      source: 'https://github.com/JMBeresford/UCSC-chessclub',
      color: '#B39554',
      accentColor: '#FFD478',
      images: imagesSlice.ucscchessclub.images,
      avatar: imagesSlice.ucscchessclub.avatar,
      year: 2021,
    },
    {
      displayName: 'Art of Jay Joson',
      name: 'artofjayjoson',
      description:
        'Jay Joson is a multi-disciplinary artist based in California. His works are composed of illustrations, animations, character designs and more.',
      live: 'http://artofjayjoson.com',
      source: 'https://github.com/JMBeresford/art-of-jay-joson',
      color: '#8657b1',
      accentColor: '#aa5577',
      images: imagesSlice.artofjayjoson.images,
      avatar: imagesSlice.artofjayjoson.avatar,
      year: 2020,
    },
  ],

  actions: {
    init: () => {},
  },
}));

export default useWorksStore;
