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
  radiusX: number;
  radiusY: number;
  rotation: number;
}

export interface TriangleEnemy extends Enemy {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
}

export type AllEnemies = RectangleEnemy | EllipseEnemy | TriangleEnemy | Enemy;

export type EnemyShapes = {
  [key: string]: AllEnemies[];
};

export const enemies: EnemyShapes = {
  Ellipse: [
    {
      color: "gray",
      health: 8,
      maxHealth: 8,
      radiusX: 60,
      radiusY: 70,
      rotation: 0,
    },
    {
      color: "gray",
      health: 8,
      maxHealth: 8,
      radiusX: 50,
      radiusY: 30,
      rotation: 120,
    },
    {
      color: "gray",
      health: 8,
      maxHealth: 8,
      radiusX: 44,
      radiusY: 42,
      rotation: 60,
    },
    {
      color: "gray",
      health: 8,
      maxHealth: 8,
      radiusX: 41,
      radiusY: 50,
      rotation: 60,
    },
    {
      color: "gray",
      health: 8,
      maxHealth: 8,
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
  Triangle: [
    {
      color: "gray",
      health: 8,
      maxHealth: 8,
      x1: 53,
      y1: 46,
      x2: 183,
      y2: 38,
      x3: 150,
      y3: 152,
    },
    {
      color: "gray",
      health: 8,
      maxHealth: 8,
      x1: 113,
      y1: 62,
      x2: 52,
      y2: 170,
      x3: 160,
      y3: 142,
    },
    // {
    //   color: "gray",
    //   health: 8,
    //   maxHealth: 8,
    //   x1: 53,
    //   y1: 46,
    //   x2: 183,
    //   y2: 38,
    //   x3: 150,
    //   y3: 152,
    // },
    // {
    //   color: "gray",
    //   health: 8,
    //   maxHealth: 8,
    //   x1: 53,
    //   y1: 46,
    //   x2: 183,
    //   y2: 38,
    //   x3: 150,
    //   y3: 152,
    // },
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
  Triangle: [
    "Triumphant",
    "Tranquil",
    "Tenacious",
    "Turbulent",
    "Tessellated",
    "Transcendent",
    "Tantalizing",
    "Tectonic",
    "Timely",
    "Tintinnabulating",
    "Turbulent",
    "Talented",
    "Thriving",
    "Tactile",
    "Tremendous",
    "Transitory",
    "Thematic",
    "Thrilling",
    "Translucent",
    "Tribal",
  ],
};

export const boss: EnemyShapes = {
  Ellipse: [
    {
      color: "gray",
      health: 120,
      maxHealth: 120,
      radiusX: 85,
      radiusY: 82,
      rotation: 0,
    },
    {
      color: "gray",
      health: 150,
      maxHealth: 150,
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
  Triangle: [
    {
      color: "gray",
      health: 120,
      maxHealth: 120,
      x1: 113,
      y1: 26,
      x2: 16,
      y2: 160,
      x3: 196,
      y3: 203,
    },
    {
      color: "gray",
      health: 150,
      maxHealth: 150,
      x1: 113,
      y1: 26,
      x2: 204,
      y2: 160,
      x3: 24,
      y3: 203,
    },
  ],
};

export const shapes = ["Ellipse", "Rectangle"];
