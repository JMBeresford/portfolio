const carouselSlice = (set, get) => ({
  currentWork: 0,
  resolution: 512,
  dragging: false,
  touchStartX: 0,
  direction: 1,
  animating: false,

  positions: null,
  hidePositions: null,
  uvs: null,
  speeds: null,
});

const actions = (set, get) => ({
  initAttributes: (resolution) => {
    const state = get();

    let COUNT = resolution,
      COUNT2 = COUNT * COUNT,
      COUNTHALF = COUNT / 2;

    state.positions = new Float32Array(COUNT2 * 3);
    state.uvs = new Float32Array(COUNT2 * 2);
    state.speeds = new Float32Array(COUNT2);

    let idx = 0;

    for (let ix = 0; ix < COUNT; ix++) {
      for (let iy = 0; iy < COUNT; iy++) {
        let x = (ix - COUNTHALF) / COUNT;
        let y = (iy - COUNTHALF) / COUNT;

        let u = ix / COUNT;
        let v = iy / COUNT;

        let s = Math.random() * 0.7 + 0.3;

        state.positions[idx * 3] = x;
        state.positions[idx * 3 + 1] = y;
        state.positions[idx * 3 + 2] = 0;

        state.uvs[idx * 2] = u;
        state.uvs[idx * 2 + 1] = v;
        state.speeds[idx] = s;

        idx++;
      }
    }
  },
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
