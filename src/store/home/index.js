import create from 'zustand';

const useHomeStore = create((set, get) => ({
  introDone: false,
  converged: true,
  viewManaged: true,
  world: null,
  selectedWork: null,

  actions: {},
}));

export default useHomeStore;
