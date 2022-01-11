import create from 'zustand';
import { Pane } from 'tweakpane';
import { actions as viewActions, viewSlice } from './views';
import { actions as pointerActions, pointerSlice } from './pointer';
import { actions as worksActions, worksSlice } from './works';
import { actions as carouselActions, carouselSlice } from './carousel';
import { actions as officeActions, officeSlice } from './office';

const useStore = create((set, get) => ({
  canvas: null,
  camera: null,
  cursor: null,

  ready: false,
  started: false,
  mobile: false,
  viewingAbout: false,

  debug: {
    active: false,
    pane: null,
  },

  ...viewSlice(set, get),
  ...pointerSlice(set, get),
  ...worksSlice(set, get),
  ...carouselSlice(set, get),
  ...officeSlice(set, get),

  actions: {
    init: (canvas) => {
      if (window && window.location.hash === '#debug') {
        set({
          canvas,
          debug: {
            active: true,
            pane: new Pane({ title: 'Config', expanded: false }),
          },
        });
      }
    },

    ...viewActions(set, get),
    ...pointerActions(set, get),
    ...worksActions(set, get),
    ...carouselActions(set, get),
    ...officeActions(set, get),
  },
}));

export default useStore;
