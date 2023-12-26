export interface PowerUp {
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

export interface GoldPowerUp extends PowerUp {
  goldMultiplier: number;
}

export type AllPowerUps =
  | AttackPowerUp
  | ShapePowerUp
  | MagicPowerUp
  | GoldPowerUp;

export const powerUps: Record<string, AllPowerUps> = {
  "2xA": {
    description: "2 x Attack",
    attackMultiplier: 2,
    costMultiplier: 2.6,
  },
  "3xA": {
    description: "3 x Attack",
    attackMultiplier: 3,
    costMultiplier: 2.8,
  },
  "2xS": {
    description: "2 x Magic from this shape",
    shapeMultiplier: 2,
    costMultiplier: 2.6,
  },
  "3xS": {
    description: "3 x Magic from this shape",
    shapeMultiplier: 3,
    costMultiplier: 2.8,
  },
  "4xS": {
    description: "4 x Magic from this shape",
    shapeMultiplier: 4,
    costMultiplier: 3,
  },
  ".05xM": {
    description: "1.05 x Magic from all sources",
    magicMultiplier: 1.05,
    costMultiplier: 2.9,
  },
  ".08xM": {
    description: "1.08 x Magic from all sources",
    magicMultiplier: 1.08,
    costMultiplier: 3,
  },
  ".10xM": {
    description: "1.10 x Magic from all sources",
    magicMultiplier: 1.1,
    costMultiplier: 3.1,
  },
  ".05xG": {
    description: "1.05 x Gold from all sources",
    goldMultiplier: 1.05,
    costMultiplier: 2.5,
  },
  ".10xG": {
    description: "1.10 x Gold from all sources",
    goldMultiplier: 1.1,
    costMultiplier: 2.7,
  },
  ".004xAfM": {
    description: "Gain Attack equal to 0.4% of total Magic",
    goldMultiplier: 1.1,
    costMultiplier: 2.7,
  },
};
