export interface Hero {
  name: string;
  level: number;
  attackIncrease: number;
  scaling: number;
  cost: number;
  costScaling: number;
  intervals: number[];
  powerUps: string[];
}

export const hero: Hero = {
  name: "hero",
  level: 0,
  attackIncrease: 1,
  scaling: 1.13,
  cost: 10,
  costScaling: 1.14,
  intervals: [
    10, 20, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 240, 270, 300,
  ],
  powerUps: [
    "2xA",
    "3xA",
    "2xA",
    "2xA",
    "3xA",
    "3xA",
    "2xA",
    "3xA",
    "2xA",
    "2xA",
    "3xA",
    "3xA",
  ],
};

export interface Ability {
  cost: number;
  description: string;
  scaling: number;
}

export type AbilityKey = "hand of gold";

export const abilities: Record<string, Ability> = {
  "hand of gold": {
    cost: 100,
    description: "Gain a massive amount of gold instantly",
    scaling: 1.38,
  },
};
