export interface PowerUp {
  name: string;
  description: string;
  costMultiplier: number;
}

export interface AttackPowerUp extends PowerUp {
  attackMultiplier: number;
}

export interface ShapePowerUp extends PowerUp {
  shapeMultiplier: number;
}

export interface MagicPowerUp extends PowerUp {
  magicMultiplier: number;
}

export type AllPowerUps = AttackPowerUp | ShapePowerUp | MagicPowerUp;

export const powerUps: Record<string, AllPowerUps> = {
  "2xA": {
    name: "2xA",
    description: "2 x Attack",
    attackMultiplier: 2,
    costMultiplier: 2.6,
  },
  "3xA": {
    name: "3xA",
    description: "3 x Attack",
    attackMultiplier: 3,
    costMultiplier: 2.8,
  },
  "2xS": {
    name: "3xN",
    description: "2 x Magic from this shape",
    shapeMultiplier: 2,
    costMultiplier: 2.6,
  },
  "3xS": {
    name: "3xN",
    description: "3 x Magic from this shape",
    shapeMultiplier: 3,
    costMultiplier: 2.8,
  },
  ".05xM": {
    name: ".05xM",
    description: "1.05 x Magic from all sources",
    magicMultiplier: 1.05,
    costMultiplier: 2.9,
  },
};
