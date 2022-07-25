const viewSlice = (set, get) => ({
  viewHistory: [],
  currentView: 'start',

  views: {
    start: {
      position: {
        x: 0.3401925563812256,
        y: 1.129882574081421,
        z: -0.8591268086433411,
      },
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    home: {
      position: {
        x: 0.10899140545608632,
        y: 1.242781524765127,
        z: 0.9634562511561878,
      },
      rotation: {
        x: -0.15321013516821672,
        y: 0,
        z: 0,
      },
    },
    about: {
      position: {
        x: -1.1214985847473145,
        y: 1.2421875,
        z: -0.7616888284683228,
      },
      rotation: {
        x: -0.15321013516821672,
        y: 0,
        z: 0,
      },
    },
  },
});

const viewActions = (set, get) => ({
  setView: (newView) => {
    let state = get();

    state.viewHistory.push(state.currentView);

    set({ currentView: newView });
  },
  getLastView: () => {
    let state = get();

    return state.viewHistory[state.viewHistory.length - 1];
  },
});

export { viewSlice, viewActions };
