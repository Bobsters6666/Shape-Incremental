export interface Artifact {
  description: string;
  level: number;
  scaling: number;
  cost: number;
  costScaling: number;
  rarity: string;
  unlocked: boolean;
  piecesOwned?: number;
  piecesToUnlock?: number;
  artifactScaling?: number;
}

export type ArtifactKey =
  | "scorching disc"
  | "forgotten wand"
  | "musa's hand"
  | "Gilded Runeblade"
  | "Sapphire Heartstone"
  | "Ethereal Crown"
  | "Abyssal Pendant";

export const artifacts: Record<ArtifactKey, Artifact> = {
  "scorching disc": {
    description: "Permanently increase your attack",
    level: 1,
    cost: 1,
    costScaling: 2.1,
    scaling: 1.32,
    rarity: "uncommon",
    unlocked: false,
  },
  "forgotten wand": {
    description: "Permanently increase your magic",
    level: 1,
    cost: 1,
    costScaling: 2.15,
    scaling: 1.33,
    rarity: "uncommon",
    unlocked: false,
  },
  "musa's hand": {
    description: "Permanently increase gold dropped by enemies",
    level: 1,
    cost: 1,
    costScaling: 2.13,
    scaling: 1.42,
    rarity: "uncommon",
    unlocked: false,
  },
  "Gilded Runeblade": {
    description: "Permanently increase magic and attack",
    level: 1,
    cost: 1,
    costScaling: 2.08,
    scaling: 1.22,
    rarity: "uncommon",
    unlocked: false,
  },
  "Sapphire Heartstone": {
    description: "Permanenty increase boss timer",
    level: 1,
    cost: 1,
    costScaling: 2.28,
    scaling: 1.03,
    artifactScaling: 1.53,
    rarity: "epic",
    piecesOwned: 0,
    piecesToUnlock: 30,
    unlocked: false,
  },
  "Ethereal Crown": {
    description: "Permanently decrease enemies per stage",
    level: 1,
    cost: 1,
    costScaling: 2.32,
    scaling: 1.65,
    rarity: "legendary",
    artifactScaling: 1.73,
    unlocked: false,
    piecesOwned: 0,
    piecesToUnlock: 50,
  },
  "Abyssal Pendant": {
    description: "Permanently increase crit chance and damage",
    level: 1,
    cost: 1,
    costScaling: 2.25,
    scaling: 1.65,
    rarity: "legendary",
    artifactScaling: 1.68,
    unlocked: false,
    piecesOwned: 0,
    piecesToUnlock: 50,
  },
};

export const newArtifact = {
  scaling: 4.2,
  number: 0,
  cost: 1,
};
