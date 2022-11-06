import create from 'zustand';
import { imagesSlice, imagesActions } from './imagesSlice';

// non-application state
const useWorksStore = create((set, get) => ({
  selectedWork: 0,
  prevSelectedWork: null,
  hoveredWork: null,

  transitioningWork: false,

  workListRef: null,

  works: [
    {
      displayName: 'Deforestation Detector',
      name: 'deforestationdetector',
      description: [
        `Deforestation Detector is a web application that is intended to promote awareness of deforestation in the Amazon and inform users how they can
      assist with conservation efforts.`,
        `The experience involves exploring a 3D representation of the Amazon Rainforest. Satellite imagery of this specific portion
      of the Rainforest was examined by an image recognition model trained to detect certain types of deforestation.`,
        `This data was used in the design of
      the 3D model, and the detected features can be examined in detail within the experience.`,
      ],
      live: 'http://deforestationdetector.com',
      source: 'https://github.com/Deforestation-Detector/web',
      color: '#c9461e',
      accentColor: '#007D5C',
      images: imagesSlice.deforestationdetector,
    },
    {
      displayName: 'Art of Jay Joson',
      name: 'artofjayjoson',
      description: [
        `Jay Joson is a multi-disciplinary artist based in California. His works are composed of illustrations, animations, character designs and more.`,
        `This web portfolio showcases some of Jay's handpicked works in a unique and personal fashion, exibiting not only his creations — but a caricature of
        himself, as well.`,
      ],
      live: 'http://artofjayjoson.com',
      source: 'https://github.com/JMBeresford/art-of-jay-joson',
      color: '#8657b1',
      accentColor: '#aa5577',
      images: imagesSlice.artofjayjoson,
    },
    {
      displayName: 'UCSC Chess Club',
      name: 'ucscchessclub',
      description: [
        `UCSC Chess Club is a digital chess application for users to play against their peers in a controlled, 
      localized environment. The app uses a standard ELO rating system to rate players relative to the rest of the 'club'.`,
        `This application differs from other rated chess environments by being 100% localized. Being a self-hostable application makes the data it
      provides specific to the player-base your 'club' involves.`,
      ],
      live: null,
      source: 'https://github.com/JMBeresford/UCSC-chessclub',
      color: '#B39554',
      accentColor: '#FFD478',
      images: imagesSlice.ucscchessclub,
    },
  ],

  actions: {
    init: () => {},
    transitionToWork: (idx) => {
      if (get().transitioningWork) return;

      set({ prevSelectedWork: get().selectedWork, transitioningWork: true });
      set({ selectedWork: idx });
    },
  },
}));

export default useWorksStore;
