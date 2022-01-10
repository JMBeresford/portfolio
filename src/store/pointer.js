import { Vector2 } from 'three';

const pointerSlice = (set, get) => ({
  intersecting: false,
  intersections: [],
  pointerType: 'touch',
  mouse: new Vector2(0, 0),
  nocursor: false,

  allowedIntersections: {
    start: [],
    main: '*',
    desk: ['socials', 'lab', 'works', 'about', 'mac'],
    socials: ['email', 'insta', 'linkedin', 'github', 'about'],
    about: ['aboutPad', 'socials', 'works'],
    works: ['about', 'worksPad', 'socials', 'lab'],
    lab: ['works', 'about', 'labPad'],
    aboutEntered: [],
    worksEntered: [],
    labEntered: [],
  },
});

const actions = (set, get) => ({
  intersect: (intersections) => {
    let state = get();
    let allowed = state.allowedIntersections[state.view];

    if (allowed === '*') {
      set({ intersecting: true });
      return;
    }

    for (let intersection of intersections) {
      let name = intersection.eventObject.userData.name;

      if (name && allowed.includes(name)) {
        set({ intersecting: true });
        return;
      }
    }

    set({ intersecting: false });
  },
});

export { actions, pointerSlice };
