import create from 'zustand';
import useHomeStore from './home';
import useWorksStore from './works';

// non-application state
const useStore = create((set, get) => ({
  router: null,
  dom: null,
  debug: false,
  transitioning: false,

  actions: {
    init: () => {},
  },
}));

export { useStore, useHomeStore, useWorksStore };
