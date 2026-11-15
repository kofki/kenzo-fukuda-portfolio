// Generated: the clouds, palm crowns, stars, fish and city lights cut out of
// the prints so they can move. Positions are % of each 3:2 scene.
export interface Layer {
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  pivotX?: number;
}

export const sky = {
  day: {
    palm: {
      src: "/scenes/live/day-palm.webp",
      left: 0.0,
      top: 31.93,
      width: 9.24,
      height: 26.66,
      pivotX: 11.3,
    },
    clouds: [
      {
        src: "/scenes/live/day-cloud-0.webp",
        left: 55.21,
        top: 30.86,
        width: 44.79,
        height: 25.2,
      },
    ],
    stars: [],
  },
  night: {
    palm: {
      src: "/scenes/live/night-palm.webp",
      left: 0.0,
      top: 40.72,
      width: 11.33,
      height: 24.22,
      pivotX: 27.0,
    },
    clouds: [
      {
        src: "/scenes/live/night-cloud-0.webp",
        left: 61.33,
        top: 24.02,
        width: 38.67,
        height: 26.17,
      },
    ],
    stars: [
      {
        src: "/scenes/live/night-star-0.webp",
        left: 61.13,
        top: 12.7,
        width: 1.24,
        height: 1.85,
      },
      {
        src: "/scenes/live/night-star-1.webp",
        left: 90.95,
        top: 19.34,
        width: 1.24,
        height: 1.85,
      },
      {
        src: "/scenes/live/night-star-2.webp",
        left: 26.3,
        top: 20.8,
        width: 1.24,
        height: 1.85,
      },
      {
        src: "/scenes/live/night-star-4.webp",
        left: 88.22,
        top: 30.27,
        width: 1.24,
        height: 1.85,
      },
      {
        src: "/scenes/live/night-star-5.webp",
        left: 89.32,
        top: 30.37,
        width: 1.24,
        height: 1.85,
      },
      {
        src: "/scenes/live/night-star-6.webp",
        left: 87.83,
        top: 31.25,
        width: 1.24,
        height: 1.85,
      },
      {
        src: "/scenes/live/night-star-11.webp",
        left: 31.12,
        top: 48.15,
        width: 1.24,
        height: 1.85,
      },
      {
        src: "/scenes/live/night-star-12.webp",
        left: 89.19,
        top: 70.12,
        width: 1.24,
        height: 1.85,
      },
    ],
  },
} satisfies Record<
  "day" | "night",
  { palm: Layer; clouds: Layer[]; stars: Layer[] }
>;

export const moon = { left: 89.84, top: 61.52, width: 4.56, height: 11.23 };

export const seaFish: Layer[] = [
  {
    src: "/scenes/live/sea-fish-0.webp",
    left: 81.84,
    top: 45.22,
    width: 9.12,
    height: 6.74,
  },
  {
    src: "/scenes/live/sea-fish-1.webp",
    left: 72.14,
    top: 51.56,
    width: 8.92,
    height: 6.64,
  },
  {
    src: "/scenes/live/sea-fish-2.webp",
    left: 80.86,
    top: 55.27,
    width: 9.31,
    height: 5.76,
  },
  {
    src: "/scenes/live/sea-fish-3.webp",
    left: 87.24,
    top: 58.79,
    width: 9.05,
    height: 6.84,
  },
  {
    src: "/scenes/live/sea-fish-4.webp",
    left: 75.59,
    top: 61.23,
    width: 9.18,
    height: 5.57,
  },
  {
    src: "/scenes/live/sea-fish-5.webp",
    left: 84.18,
    top: 66.99,
    width: 8.79,
    height: 6.05,
  },
];

export const seaBubbles: Layer[] = [
  {
    src: "/scenes/live/sea-bubble-0.webp",
    left: 79.49,
    top: 34.38,
    width: 1.5,
    height: 2.93,
  },
  {
    src: "/scenes/live/sea-bubble-1.webp",
    left: 77.08,
    top: 48.34,
    width: 1.37,
    height: 2.05,
  },
  {
    src: "/scenes/live/sea-bubble-2.webp",
    left: 70.38,
    top: 59.57,
    width: 1.89,
    height: 2.93,
  },
  {
    src: "/scenes/live/sea-bubble-3.webp",
    left: 71.35,
    top: 63.48,
    width: 1.89,
    height: 2.64,
  },
  {
    src: "/scenes/live/sea-bubble-4.webp",
    left: 70.25,
    top: 66.8,
    width: 1.3,
    height: 1.85,
  },
  {
    src: "/scenes/live/sea-bubble-5.webp",
    left: 68.56,
    top: 69.14,
    width: 1.56,
    height: 2.34,
  },
  {
    src: "/scenes/live/sea-bubble-6.webp",
    left: 73.76,
    top: 74.81,
    width: 1.95,
    height: 2.83,
  },
  {
    src: "/scenes/live/sea-bubble-7.webp",
    left: 75.06,
    top: 78.81,
    width: 1.69,
    height: 2.44,
  },
  {
    src: "/scenes/live/sea-bubble-8.webp",
    left: 73.89,
    top: 81.84,
    width: 1.43,
    height: 2.25,
  },
];

export const reefFish: Layer[] = [
  {
    src: "/scenes/live/reef-fish-0.webp",
    left: 84.44,
    top: 75.78,
    width: 7.49,
    height: 4.49,
  },
  {
    src: "/scenes/live/reef-fish-1.webp",
    left: 79.49,
    top: 80.18,
    width: 6.77,
    height: 3.71,
  },
  {
    src: "/scenes/live/reef-fish-2.webp",
    left: 89.06,
    top: 81.54,
    width: 7.1,
    height: 4.1,
  },
];

export const cityFish: Layer[] = [
  {
    src: "/scenes/live/city-fish-0.webp",
    left: 75.33,
    top: 48.24,
    width: 5.6,
    height: 4.39,
  },
  {
    src: "/scenes/live/city-fish-1.webp",
    left: 27.02,
    top: 51.76,
    width: 5.99,
    height: 4.79,
  },
  {
    src: "/scenes/live/city-fish-2.webp",
    left: 67.25,
    top: 59.96,
    width: 5.53,
    height: 4.79,
  },
];
