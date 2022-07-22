import create from 'zustand';
import { assetsActions, assetsSlice } from './assetsSlice';
import { hoverSlice, hoverActions } from './hoverSlice';

const useStore = create((set, get) => {
  return {
    router: null,
    dom: null,
    debug: false,

    ...hoverSlice(set, get),
    ...assetsSlice(set, get),

    actions: {
      ...hoverActions(set, get),
      ...assetsActions(set, get),
    },
  };
});

export default useStore;
