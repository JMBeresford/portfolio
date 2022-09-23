import create from 'zustand';
import { assetsActions, assetsSlice } from './assetsSlice';
import { hoverSlice, hoverActions } from './hoverSlice';
import { viewActions, viewSlice } from './viewSlice';
import { worksActions, worksSlice } from './worksSlice';
import { aboutSlice, aboutActions } from './aboutSlice';

const useStore = create((set, get) => {
  return {
    router: null,
    dom: null,
    debug: false,
    isIOS: false,

    sceneLoaded: false,
    experienceStarted: false,

    aboutLoaded: false,

    ...hoverSlice(set, get),
    ...assetsSlice(set, get),
    ...viewSlice(set, get),
    ...worksSlice(set, get),
    ...aboutSlice(set, get),

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
      ...worksActions(set, get),
      ...aboutActions(set, get),
    },
  };
});

export default useStore;
