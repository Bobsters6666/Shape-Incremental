export const bounce = {
  initial: {
    y: 0,
  },
  animate: {
    y: [0, -20, 0], // An array for y creates a bounce effect
    transition: {
      duration: 0.6,
      ease: "easeInOut", // You can adjust the ease function for a desired bounce effect
      yoyo: Infinity, // Infinite yoyo loop for bouncing up and down
      repeatDelay: 0.2, // Optional delay between bounces
    },
  },
};
