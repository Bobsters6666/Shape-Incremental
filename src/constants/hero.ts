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
  scaling: 1.12,
  cost: 10,
  costScaling: 1.14,
  intervals: [
    10, 20, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 240, 270, 300,
  ],
  powerUps: ["2xA", "3xA", "2xA", "2xA"],
};

export const abilities = {
  "hand of gold": {
    cost: 100,
    description: "Instantly gain 30 minutes worth of gold",
  },
};
