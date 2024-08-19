export const slideToBottom = {
  initial: { y: -80, opacity: 0 },
  enter: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.17 * i,
    },
  }),
};

export const slideToTop = {
  initial: { y: 80, opacity: 0 },
  enter: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1.2,
      delay: 0.2 * i,
    },
  }),
  exit: (i: number) => ({
    y: 80,
    opacity: 0,
    transition: {
      type: "spring",
      duration: 1.2,
      delay: 0.2 * i,
    },
  }),
};
