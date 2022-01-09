const carouselSlice = (set, get) => ({
  currentWork: 0,
  carousel: null,
  viewingWork: null,
  domElement: null,
  touchStartX: 0,
  titleHovered: false,
  resolution: 512,
  dragging: false,
  direction: null,
  animating: false,
  scrolled: false,
});

const actions = (set, get) => ({
  moveLeft: () => {
    let cur = get().currentWork;
    if (cur === 0) {
      set({ currentWork: get().avatars.length - 1 });
    } else {
      set({ currentWork: cur - 1 });
    }
  },
  moveRight: () => {
    let cur = get().currentWork + 1;
    set({ currentWork: cur % get().avatars.length });
  },
});

export { actions, carouselSlice };
