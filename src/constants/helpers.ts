export interface Helper {
  name: string;
  level: number;
  magic: number;
  magicIncrease: number;
  scaling: number;
  cost: number;
  costScaling: number;
  interval: number;
  show: boolean;
  icon: string;
  powerUps?: string[];
}

export const helpers: Helper[] = [
  {
    name: "Calm Circle",
    level: 0,
    magic: 0,
    magicIncrease: 5,
    scaling: 1.05,
    cost: 30,
    costScaling: 1.12,
    interval: 2,
    show: true,
    icon: "./shapes/circle.svg",
    powerUps: [".05xG", "2xS", "2xS", "3xS"],
  },
  {
    name: "Sensitive Square",
    level: 0,
    magic: 0,
    magicIncrease: 25,
    scaling: 1.055,
    cost: 200,
    costScaling: 1.115,
    interval: 2.5,
    show: false,
    icon: "./shapes/square.svg",
    powerUps: ["2xS", "2xS", "3xS", "3xS"],
  },
  {
    name: "Tactical Triangle",
    level: 0,
    magic: 0,
    magicIncrease: 130,
    scaling: 1.055,
    cost: 1500,
    costScaling: 1.115,
    interval: 2.8,
    show: false,
    icon: "./shapes/triangle.svg",
    powerUps: ["2xS", "2xS", "3xS", "3xS"],
  },
  {
    name: "Tricky Trapezium",
    level: 0,
    magic: 0,
    magicIncrease: 1200,
    scaling: 1.055,
    cost: 40500,
    costScaling: 1.115,
    interval: 3,
    show: false,
    icon: "./shapes/trapezium.svg",
    powerUps: ["2xS", "2xS", "3xS", "3xS"],
  },
];

export const helpersIntervals = [10, 25, 50, 75, 100, 150, 200, 500, 1000];
