const worksSlice = (set, get) => ({
  selectedWork: 0,
  nextHovered: false,
  prevHovered: false,

  transitioningWork: false,

  works: [
    {
      displayName: 'Deforestation\nDetector',
      name: 'deforestationdetector',
      description: `Web application to promote awareness of deforestation in the amazon and how to
      assist with conservation efforts.`,
      live: 'http://deforestationdetector.com',
      source: 'https://github.com/Deforestation-Detector/web',
      color: '#38945e',
      accentColor: '#2d5e00',
    },
    {
      displayName: 'Art of Jay Joson',
      name: 'artofjayjoson',
      description: `Jay Joson is a character animator and illustrator based in California. 
        This is a web showcase of some of his curated works.`,
      live: 'http://artofjayjoson.com',
      source: 'https://github.com/JMBeresford/art-of-jay-joson',
      color: '#8657b1',
      accentColor: '#aa5577',
    },
    {
      displayName: 'UCSC Chess Club',
      name: 'ucscchessclub',
      description: `A digital chess application for users to play against peers in a controlled, 
      local environment. Uses a standard ELO rating system to rate players relative to others.`,
      live: null,
      source: 'https://github.com/JMBeresford/UCSC-chessclub',
      color: '#837546',
      accentColor: '#ffe4ab',
    },
  ],
});

const worksActions = (set, get) => ({
  nextWork: () => {
    set({ selectedWork: (get().selectedWork + 1) % get().works.length });
  },
  prevWork: () => {
    set({
      selectedWork:
        get().selectedWork === 0
          ? get().works.length - 1
          : get().selectedWork - 1,
    });
  },
});

export { worksSlice, worksActions };
