const viewSlice = (set, get) => ({
  view: 'start',
  destination: null,
  animatingView: false,
  views: {
    start: {
      position: [0.34019, 1.12988, -0.8],
      rotation: [0, 0, 0],
    },
    main: {
      position: [0, 1.22988, 1.44],
      rotation: [-0.15, 0, 0],
    },
    socials: {
      position: [-1.0508, 1.74999, -0.2],
      rotation: [0.0, 0.1, 0],
    },
    about: {
      position: [-1.1698, 1.62988, -0.4],
      rotation: [-0.3, 0, 0],
    },
    works: {
      position: [-1.1698, 1.12988, -0.4],
      rotation: [-0.15, 0, 0],
    },
    lab: {
      position: [-1.1698, 0.67988, -0.4],
      rotation: [-0.05, 0, 0],
    },

    aboutEntered: {
      position: [-1.31981, 1.44488, -1.1],
      rotation: [-0.3, 0.1, 0],
    },
    worksEntered: {
      position: [-0.92981, 1.04488, -1.1],
      rotation: [-0.3, -0.1, 0],
    },
    labEntered: {
      position: [-1.31981, 0.64488, -1.1],
      rotation: [-0.3, 0.1, 0],
    },
    desk: {
      position: [0.32019, 1.22988, -0.26],
      rotation: [-0.2, 0, 0],
    },
  },
  mobileViews: {
    start: {
      position: [0.34019, 1.12988, -0.8],
      rotation: [0, 0, 0],
    },
    main: {
      position: [-0.60981, 1.32988, 2],
      rotation: [-0.15, 0.2, 0],
      restraints: [-0.5, 2],
    },
    socials: {
      position: [-1.408, 1.74999, 0.25],
      rotation: [0.0, 0.1, 0],
      restraints: [-1.41, -0.6],
    },
    aboutEntered: {
      position: [-1.31981, 1.44488, -0.6],
      rotation: [-0.3, 0.1, 0],
    },
    worksEntered: {
      position: [-0.92981, 1.04488, -0.6],
      rotation: [-0.3, -0.1, 0],
    },
    labEntered: {
      position: [-1.31981, 0.64488, -0.6],
      rotation: [-0.3, 0.1, 0],
    },
    desk: {
      position: [0.32019, 1.22988, 0.73],
      rotation: [-0.2, 0, 0],
    },
  },
});

const actions = (set, get) => ({
  transitionView: (newView) => {
    if (get().animatingView) {
      return;
    }

    if (get().view === 'start') {
      set({ started: true });
    }

    set({ animatingView: true, destination: newView, intersecting: false });
  },
  getView: (view) => {
    let r = get().mobile ? get().mobileViews[view] : get().views[view];

    return r;
  },
  setView: (newView) => {
    if (newView === 'aboutEntered') {
      set({ viewingAbout: true });
    }
    set({ view: newView, animatingView: false, destination: null });
  },
  back: () => {
    if (get().animatingView || get().view === 'main') {
      return;
    }

    let transition = get().actions.transitionView;
    let mobile = get().mobile;

    switch (get().view) {
      case 'aboutEntered': {
        set({ viewingAbout: false });
        if (mobile) {
          transition('main');
        } else {
          transition('about');
        }
        break;
      }
      case 'worksEntered': {
        if (get().viewingWork) {
          set({ viewingWork: false });
        } else if (mobile) {
          transition('main');
        } else {
          transition('works');
        }
        break;
      }
      case 'labEntered': {
        if (mobile) {
          transition('main');
        } else {
          transition('lab');
        }
        break;
      }
      default: {
        transition('main');
        break;
      }
    }
  },
});

export { actions, viewSlice };
