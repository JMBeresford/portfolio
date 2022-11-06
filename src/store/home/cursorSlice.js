const cursorSlice = {
  emailHovered: false,
  instaHovered: false,
  linkedinHovered: false,
  githubHovered: false,

  aboutHovered: false,
  worksHovered: false,
  labHovered: false,
};

const cursorActions = (set, get) => ({
  initCursor: () => {
    set({
      emailHovered: false,
      instaHovered: false,
      linkedinHovered: false,
      githubHovered: false,

      aboutHovered: false,
      worksHovered: false,
      labHovered: false,
    });
  },
});

export { cursorSlice, cursorActions };
