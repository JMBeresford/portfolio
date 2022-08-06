import create from 'zustand';
import { assetsActions, assetsSlice } from './assetsSlice';
import { hoverSlice, hoverActions } from './hoverSlice';
import { viewActions, viewSlice } from './viewSlice';

const useStore = create((set, get) => {
  return {
    router: null,
    dom: null,
    debug: false,

    sceneLoaded: false,
    experienceStarted: false,

    aboutLoaded: false,

    ...hoverSlice(set, get),
    ...assetsSlice(set, get),
    ...viewSlice(set, get),

    actions: {
      startExperience: () => {
        set({ experienceStarted: true });

        setTimeout(() => {
          get().actions.setView('home');
        }, 500);
      },

      ...hoverActions(set, get),
      ...assetsActions(set, get),
      ...viewActions(set, get),
    },
  };
});

export default useStore;
