export interface Enemy {
  color: string;
  health: number;
  maxHealth: number;
}

export interface RectangleEnemy extends Enemy {
  width: number;
  height: number;
}

export interface EllipseEnemy extends Enemy {
  centerX: number;
  centerY: number;
  radiusX: number;
  radiusY: number;
  rotation: number;
}

export type AllEnemies = RectangleEnemy | EllipseEnemy;

export type EnemyShapes = {
  [key: string]: AllEnemies[];
};

export const enemies: EnemyShapes = {
  Ellipse: [
    {
      color: "gray",
      health: 8,
      maxHealth: 8,
      centerX: 90,
      centerY: 90,
      radiusX: 60,
      radiusY: 70,
      rotation: 0,
    },
    {
      color: "gray",
      health: 8,
      maxHealth: 8,
      centerX: 90,
      centerY: 90,
      radiusX: 50,
      radiusY: 30,
      rotation: 120,
    },
    {
      color: "gray",
      health: 8,
      maxHealth: 8,
      centerX: 90,
      centerY: 90,
      radiusX: 44,
      radiusY: 42,
      rotation: 60,
    },
    {
      color: "gray",
      health: 8,
      maxHealth: 8,
      centerX: 90,
      centerY: 90,
      radiusX: 41,
      radiusY: 50,
      rotation: 60,
    },
    {
      color: "gray",
      health: 8,
      maxHealth: 8,
      centerX: 90,
      centerY: 90,
      radiusX: 52,
      radiusY: 28,
      rotation: 60,
    },
  ],
  Rectangle: [
    {
      color: "gray",
      health: 8,
      maxHealth: 8,
      width: 120,
      height: 100,
    },
    {
      color: "gray",
      health: 8,
      maxHealth: 8,
      width: 130,
      height: 110,
    },
    {
      color: "gray",
      health: 8,
      maxHealth: 8,
      width: 100,
      height: 150,
    },
  ],
};

export type EnemyAdjectives = {
  [key: string]: string[];
};

export const enemyAdjectives: EnemyAdjectives = {
  Ellipse: [
    "Brazen",
    "Bucolic",
    "Beguiling",
    "Bohemian",
    "Breathtaking",
    "Byzantine",
    "Blithesome",
    "Bombastic",
    "Bellicose",
    "Blithe",
    "Bizarre",
    "Bewitching",
    "Buoyant",
    "Burnished",
    "Bumptious",
    "Blazing",
    "Beaming",
    "Bilious",
    "Baleful",
    "Bonhomous",
  ],
  Rectangle: [
    "Radiant",
    "Resilient",
    "Reverent",
    "Robust",
    "Rambunctious",
    "Rapturous",
    "Rustic",
    "Ravenous",
    "Regal",
    "Rhapsodic",
    "Reclusive",
    "Rhapsody",
    "Rejuvenating",
    "Rhapsodical",
    "Retro",
    "Rhythmic",
    "Rambunctious",
    "Rhapsodic",
    "Relevant",
    "Resplendent",
  ],
};

export const boss: EnemyShapes = {
  Ellipse: [
    {
      color: "gray",
      health: 120,
      maxHealth: 120,
      centerX: 90,
      centerY: 90,
      radiusX: 85,
      radiusY: 82,
      rotation: 0,
    },
    {
      color: "gray",
      health: 150,
      maxHealth: 150,
      centerX: 90,
      centerY: 90,
      radiusX: 88,
      radiusY: 84,
      rotation: 0,
    },
  ],
  Rectangle: [
    {
      color: "gray",
      health: 120,
      maxHealth: 120,
      width: 167,
      height: 160,
    },
    {
      color: "gray",
      health: 150,
      maxHealth: 150,
      width: 100,
      height: 150,
    },
  ],
};

export const shapes = ["Ellipse", "Rectangle"];
