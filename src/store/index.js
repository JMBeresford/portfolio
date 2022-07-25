import create from 'zustand';
import { assetsActions, assetsSlice } from './assetsSlice';
import { hoverSlice, hoverActions } from './hoverSlice';
import { viewActions, viewSlice } from './viewSlice';

const useStore = create((set, get) => {
  return {
    router: null,
    dom: null,
    debug: false,

    ...hoverSlice(set, get),
    ...assetsSlice(set, get),
    ...viewSlice(set, get),

    actions: {
      ...hoverActions(set, get),
      ...assetsActions(set, get),
      ...viewActions(set, get),
    },
  };
});

export default useStore;
