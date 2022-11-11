import create from 'zustand';

const useHomeStore = create((set, get) => ({
  introDone: false,
  converged: true,
  viewManaged: true,

  actions: {},
}));

export default useHomeStore;
