import create from 'zustand';
import { viewActions, viewSlice } from './viewSlice';
import { cursorSlice, cursorActions } from './cursorSlice';

const useHomeStore = create((set, get) => ({
  sceneLoaded: false,
  camera: null,
  experienceStarted: false,

  ...viewSlice,
  ...cursorSlice,

  actions: {
    init: (from) => {
      let actions = get().actions;

      actions.initView(from);
      actions.initCursor();

      set({ experienceStarted: true });
    },

    ...viewActions(set, get),
    ...cursorActions(set, get),
  },
}));

export default useHomeStore;
