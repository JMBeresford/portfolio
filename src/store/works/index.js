import create from 'zustand';
import { imagesSlice, imagesActions } from './imagesSlice';

// non-application state
const useWorksStore = create((set, get) => ({
  works: [
    {
      displayName: 'Deforestation Detector',
      name: 'deforestationdetector',
      description:
        'Deforestation Detector is a web application that is intended to promote awareness of deforestation in the Amazon and inform users how they can \
assist with conservation efforts. The experience involves exploring a 3D representation of the Amazon Rainforest.',
      live: 'http://deforestationdetector.com',
      source: 'https://github.com/Deforestation-Detector/web',
      color: '#c9461e',
      accentColor: '#007D5C',
      images: imagesSlice.deforestationdetector,
    },
    {
      displayName: 'Art of Jay Joson',
      name: 'artofjayjoson',
      description:
        "Jay Joson is a multi-disciplinary artist based in California. His works are composed of illustrations, animations, character designs and more. \
This web portfolio showcases some of Jay's handpicked works in a unique and personal fashion",
      live: 'http://artofjayjoson.com',
      source: 'https://github.com/JMBeresford/art-of-jay-joson',
      color: '#8657b1',
      accentColor: '#aa5577',
      images: imagesSlice.artofjayjoson,
    },
    {
      displayName: 'UCSC Chess Club',
      name: 'ucscchessclub',
      description:
        "UCSC Chess Club is a digital chess application for users to play against their peers in a controlled, \
localized environment. The app uses a standard ELO rating system to rate players relative to the rest of the 'club'.",
      live: null,
      source: 'https://github.com/JMBeresford/UCSC-chessclub',
      color: '#B39554',
      accentColor: '#FFD478',
      images: imagesSlice.ucscchessclub,
    },
  ],

  galleryHeight: 0,

  actions: {
    init: () => {},
  },
}));

export default useWorksStore;
