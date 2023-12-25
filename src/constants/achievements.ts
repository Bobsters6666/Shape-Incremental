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
    points: 10,
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
    points: 10,
    completed: false,
  },
};
