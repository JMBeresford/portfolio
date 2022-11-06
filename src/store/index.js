import create from 'zustand';
import useHomeStore from './home';
import useAboutStore from './about';
import useWorksStore from './works';

// non-application state
const useStore = create((set, get) => ({
  router: null,
  dom: null,
  debug: false,
  prevRoute: null,
  transitioning: false,

  actions: {
    init: () => {},
  },
}));

export { useStore, useHomeStore, useAboutStore, useWorksStore };
