export interface Companions {
  name: string;
  level: number;
  faces: number;
  vertex: number;
  critChanceIncrease: number;
  critChanceScaling: number;
  critDamageIncrease: number;
  critDamageScaling: number;
  goldCost: number;
  crystalCost: number;
  goldScaling: number;
  crystalScaling: number;
  icon: string;
}

export const companions = [
  {
    name: "Cube",
    level: 0,
    faces: 6,
    vertex: 8,
    critChanceIncrease: 0.5,
    critChanceScaling: 1.4,
    critDamageIncrease: 2.3,
    critDamageScaling: 1.5,
    goldCost: 500,
    crystalCost: 50,
    goldScaling: 12.7,
    crystalScaling: 2.5,
    icon: "./shapes/cube.svg",
  },
];
