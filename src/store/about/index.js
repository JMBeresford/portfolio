import create from 'zustand';

const useAboutStore = create((set, get) => ({
  introDone: false,
  converged: true,
  lastSection: 1,
  section: 0,
  viewManaged: true,
  camera: null,
  world: null,

  actions: {
    nextSection: () => {
      let s = get();
      let lastSection = s.lastSection;
      let curSection = s.section;

      if (curSection >= lastSection) {
        set({ section: lastSection });
      } else {
        set({ section: curSection + 1 });
      }

      return;
    },
    prevSection: () => {
      let s = get();
      let curSection = s.section;

      if (curSection <= 0) {
        set({ section: 0 });
      } else {
        set({ section: curSection - 1 });
      }

      return;
    },
  },
}));

export default useAboutStore;
