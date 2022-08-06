const viewSlice = (set, get) => ({
  viewHistory: ['start'],
  currentView: 'start',

  enteringAbout: false,
  enteringWorks: false,
  enteringLab: false,

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
    origin: {
      position: {
        x: 0,
        y: 0,
        z: 0,
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
        x: -1.3112402591886119,
        y: 1.4044473356842653,
        z: -0.7418818303538858,
      },
      rotation: {
        x: -0.40464373181922353,
        y: 0.1546270463342957,
        z: 0.04044414698765712,
      },
    },
    works: {
      position: {
        x: -0.8970006942664647,
        y: 1.0051937482801594,
        z: -0.7307353204768537,
      },
      rotation: {
        x: -0.4672322790818503,
        y: -0.0658090431997701,
        z: -0.033163809658742494,
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
  popView: () => {
    let state = get();

    let lastView = state.actions.getLastView();
    state.viewHistory.pop();
    set({ currentView: lastView });
  },
});

export { viewSlice, viewActions };
