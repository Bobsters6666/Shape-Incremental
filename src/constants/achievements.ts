export interface Achievements {
  name: string;
  description: string;
  points: number;
  completed: boolean;
}

export const achievements: Record<string, Achievements> = {
  lv10: {
    name: "Level 10!",
    description: "Reach hero level 10",
    points: 5,
    completed: false,
  },
  lv50: {
    name: "Level 50!",
    description: "Reach hero level 50",
    points: 5,
    completed: false,
  },
  lv100: {
    name: "Level 100!",
    description: "Reach hero level 100",
    points: 5,
    completed: false,
  },
  lv250: {
    name: "Level 250!",
    description: "Reach hero level 250",
    points: 10,
    completed: false,
  },
  lv500: {
    name: "Level 500!",
    description: "Reach hero level 500",
    points: 10,
    completed: false,
  },
  lv1000: {
    name: "Level 1000!",
    description: "Reach hero level 1000",
    points: 15,
    completed: false,
  },
  "1kG": {
    name: "Money Money I",
    description: "Have 1k+ gold in hand",
    points: 5,
    completed: false,
  },
  "1mG": {
    name: "Money Money II",
    description: "Have 1m+ gold in hand",
    points: 5,
    completed: false,
  },
  "1bG": {
    name: "Money Money III",
    description: "Have 1b+ gold in hand",
    points: 10,
    completed: false,
  },
  "1tG": {
    name: "Money Money IV",
    description: "Have 1t+ gold in hand",
    points: 15,
    completed: false,
  },
  stage25: {
    name: "Reach Stage 25!",
    description: "Reach stage 25",
    points: 5,
    completed: false,
  },
  stage50: {
    name: "Reach Stage 50!",
    description: "Reach stage 50",
    points: 5,
    completed: false,
  },
  stage100: {
    name: "Reach Stage 100!",
    description: "Reach stage 100",
    points: 5,
    completed: false,
  },
  stage200: {
    name: "Reach Stage 200!",
    description: "Reach stage 200",
    points: 10,
    completed: false,
  },
};

export const upgrades = [
  {
    name: "attack",
    point: 0,
    pointText: 0,
    multiplier: 1,
    multiplierText: 1,
    cost: 10,
  },
  {
    name: "magic",
    point: 0,
    pointText: 0,
    multiplier: 1,
    multiplierText: 1,
    cost: 10,
  },
  {
    name: "gold",
    point: 0,
    pointText: 0,
    multiplier: 1,
    multiplierText: 1,
    cost: 10,
  },
];
