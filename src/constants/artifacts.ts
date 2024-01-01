export interface Artifact {
  description: string;
  level: number;
  scaling: number;
  cost: number;
  costScaling: number;
  unlocked: boolean;
}

type ArtifactKey = "scorching disc" | "forgotten wand" | "musa's hand";

export const artifacts: Record<ArtifactKey, Artifact> = {
  "scorching disc": {
    description: "Permanently increase your attack",
    level: 1,
    cost: 1,
    costScaling: 2.1,
    scaling: 1.32,
    unlocked: false,
  },
  "forgotten wand": {
    description: "Permanently increase your magic",
    level: 1,
    cost: 1,
    costScaling: 2.15,
    scaling: 1.33,
    unlocked: false,
  },
  "musa's hand": {
    description: "Permanently increase gold dropped by enemies",
    level: 1,
    cost: 1,
    costScaling: 2.13,
    scaling: 1.42,
    unlocked: false,
  },
};

export const newArtifact = {
  scaling: 4.2,
  number: 0,
  cost: 1,
};
