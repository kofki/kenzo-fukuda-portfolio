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

// Coral and seaweed clumps, cut so they can sway from their base.
export const reefCoral: Layer[] = [
  {
    src: "/scenes/live/reef-coral-0.webp",
    left: 0.0,
    top: 67.09,
    width: 13.02,
    height: 20.31,
  },
  {
    src: "/scenes/live/reef-coral-1.webp",
    left: 13.02,
    top: 63.67,
    width: 8.66,
    height: 25.39,
  },
  {
    src: "/scenes/live/reef-coral-2.webp",
    left: 19.6,
    top: 81.84,
    width: 8.53,
    height: 9.38,
  },
  {
    src: "/scenes/live/reef-coral-3.webp",
    left: 26.04,
    top: 86.43,
    width: 6.18,
    height: 7.32,
  },
  {
    src: "/scenes/live/reef-coral-4.webp",
    left: 32.1,
    top: 76.86,
    width: 6.32,
    height: 19.34,
  },
  {
    src: "/scenes/live/reef-coral-5.webp",
    left: 36.78,
    top: 85.94,
    width: 7.62,
    height: 7.81,
  },
  {
    src: "/scenes/live/reef-coral-6.webp",
    left: 48.31,
    top: 88.87,
    width: 5.34,
    height: 7.13,
  },
  {
    src: "/scenes/live/reef-coral-7.webp",
    left: 55.34,
    top: 80.08,
    width: 6.84,
    height: 14.84,
  },
  {
    src: "/scenes/live/reef-coral-8.webp",
    left: 58.92,
    top: 91.02,
    width: 7.16,
    height: 5.86,
  },
  {
    src: "/scenes/live/reef-coral-9.webp",
    left: 66.73,
    top: 84.86,
    width: 5.01,
    height: 12.01,
  },
  {
    src: "/scenes/live/reef-coral-10.webp",
    left: 70.64,
    top: 93.07,
    width: 5.01,
    height: 4.59,
  },
];

export const cityCoral: Layer[] = [
  {
    src: "/scenes/live/city-coral-0.webp",
    left: 0.98,
    top: 71.29,
    width: 5.47,
    height: 16.11,
  },
  {
    src: "/scenes/live/city-coral-1.webp",
    left: 8.33,
    top: 78.61,
    width: 11.98,
    height: 16.6,
  },
  {
    src: "/scenes/live/city-coral-2.webp",
    left: 32.23,
    top: 84.96,
    width: 8.92,
    height: 11.72,
  },
  {
    src: "/scenes/live/city-coral-3.webp",
    left: 86.59,
    top: 78.61,
    width: 13.41,
    height: 18.07,
  },
  {
    src: "/scenes/live/city-coral-4.webp",
    left: 95.7,
    top: 66.02,
    width: 4.23,
    height: 7.62,
  },
];

// The reef's rocks, cut into three so each can carry its own coral.
export const reefRocks: Layer[] = [
  { src: "/scenes/live/reef-rock-0.webp", left: 0.0, top: 82.42, width: 38.87, height: 17.58 },
  { src: "/scenes/live/reef-rock-1.webp", left: 36.0, top: 88.87, width: 31.18, height: 11.13 },
  { src: "/scenes/live/reef-rock-2.webp", left: 64.32, top: 95.9, width: 19.14, height: 4.1 },
];
