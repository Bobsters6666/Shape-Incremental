export interface EquipmentPiece {
  name: string;
  base: number;
  scaled: number;
  equipped: boolean;
}

interface EquippedPiece extends EquipmentPiece {
  equipped: boolean;
}

export type EquipmentPieceName =
  | "head"
  | "overall"
  | "weapon"
  | "secondary"
  | "shoes";

export const equipments: Record<EquipmentPieceName, EquipmentPiece[]> = {
  head: [
    { name: "Luminara", base: 1.2, scaled: 1, equipped: false },
    { name: "Shadowmeld", base: 1.26, scaled: 1, equipped: false },
    { name: "Thunderstrike", base: 1.1, scaled: 1, equipped: false },
    { name: "Frostbane", base: 1.3, scaled: 1, equipped: false },
    { name: "Phoenixflare", base: 1.13, scaled: 1, equipped: false },
    { name: "Nebulith", base: 1.22, scaled: 1, equipped: false },
    { name: "Zephyrshade", base: 1.14, scaled: 1, equipped: false },
    { name: "Torrential", base: 1.17, scaled: 1, equipped: false },
    { name: "Crystalion", base: 1.26, scaled: 1, equipped: false },
    { name: "Infernia", base: 1.13, scaled: 1, equipped: false },
  ],

  overall: [
    { name: "Ironsoul", base: 1.02, scaled: 1, equipped: false },
    { name: "Mystic Silk", base: 1.05, scaled: 1, equipped: false },
    { name: "Stormbreaker", base: 1.03, scaled: 1, equipped: false },
    { name: "Dragonhide", base: 1.06, scaled: 1, equipped: false },
    { name: "Emberweave", base: 1.045, scaled: 1, equipped: false },
    { name: "Onyxplate", base: 1.08, scaled: 1, equipped: false },
    { name: "Ethereal", base: 1.07, scaled: 1, equipped: false },
    { name: "Tempestwraps", base: 1.063, scaled: 1, equipped: false },
    { name: "Wyrmguard", base: 1.028, scaled: 1, equipped: false },
    { name: "Blazeplate", base: 1.055, scaled: 1, equipped: false },
  ],
  weapon: [
    { name: "Voidblade", base: 1.3, scaled: 1, equipped: false },
    { name: "Serpentfang", base: 1.1, scaled: 1, equipped: false },
    { name: "Stormcaster", base: 1.13, scaled: 1, equipped: false },
    { name: "Lunablade", base: 1.2, scaled: 1, equipped: false },
    { name: "Flameheart", base: 1.26, scaled: 1, equipped: false },
    { name: "Abyssedge", base: 1.2, scaled: 1, equipped: false },
    { name: "Vipernox", base: 1.12, scaled: 1, equipped: false },
    { name: "Quicksilver", base: 1.31, scaled: 1, equipped: false },
    { name: "Starrend", base: 1.16, scaled: 1, equipped: false },
    { name: "Infernoedge", base: 1.23, scaled: 1, equipped: false },
  ],

  secondary: [
    { name: "Aegis", base: 1.13, scaled: 1, equipped: false },
    { name: "Frostguard", base: 1.3, scaled: 1, equipped: false },
    { name: "Thunderbolt", base: 1.2, scaled: 1, equipped: false },
    { name: "Shadowbane", base: 1.26, scaled: 1, equipped: false },
    { name: "Radiant", base: 1.1, scaled: 1, equipped: false },
    { name: "Lunerward", base: 1.14, scaled: 1, equipped: false },
    { name: "Frostwand", base: 1.19, scaled: 1, equipped: false },
    { name: "Shockguard", base: 1.17, scaled: 1, equipped: false },
    { name: "Umbra", base: 1.23, scaled: 1, equipped: false },
    { name: "Solardefender", base: 1.24, scaled: 1, equipped: false },
  ],

  shoes: [
    { name: "Swiftwind", base: 1.03, scaled: 1, equipped: false },
    { name: "Froststep", base: 1.06, scaled: 1, equipped: false },
    { name: "Thunderwalk", base: 1.08, scaled: 1, equipped: false },
    { name: "Shadowdancer", base: 1.11, scaled: 1, equipped: false },
    { name: "Phoenixsole", base: 1.04, scaled: 1, equipped: false },
    { name: "Miragestrider", base: 1.07, scaled: 1, equipped: false },
    { name: "Hailwalkers", base: 1.05, scaled: 1, equipped: false },
    { name: "Voltstep", base: 1.1, scaled: 1, equipped: false },
    { name: "Emberwalk", base: 1.13, scaled: 1, equipped: false },
    { name: "Umbraboots", base: 1.05, scaled: 1, equipped: false },
  ],
};

export const ownedEquipments: Record<EquipmentPieceName, EquipmentPiece[]> = {
  head: [{ name: "Basic Helmet", base: 1.0, scaled: 1, equipped: true }],
  overall: [{ name: "Basic Overall", base: 1.0, scaled: 1, equipped: true }],
  weapon: [{ name: "Basic Weapon", base: 1.0, scaled: 1, equipped: true }],
  secondary: [
    { name: "Basic Secondary", base: 1.0, scaled: 1, equipped: true },
  ],
  shoes: [{ name: "Basic Boot", base: 1.0, scaled: 1, equipped: true }],
};

export const equipped: Record<EquipmentPieceName, EquipmentPiece> = {
  head: { name: "Basic Helmet", base: 1.1, scaled: 1, equipped: true },
  overall: { name: "Basic Overall", base: 1.1, scaled: 1, equipped: true },
  weapon: { name: "Basic Weapon", base: 1.1, scaled: 1, equipped: true },
  secondary: { name: "Basic Seconday", base: 1.1, scaled: 1, equipped: true },
  shoes: { name: "Basic Boot", base: 1.1, scaled: 1, equipped: true },
};

export const equipGranted: number[] = [];

export const equipmentKeys = [
  "head",
  "overall",
  "weapon",
  "secondary",
  "shoes",
];

export const equipmentsInfo = {
  head: "Increases gold drop by enemies",
  overall: "Increase chance of shiny enemies",
  weapon: "Increase attack from all sources",
  secondary: "Increase magic from all sources",
  shoes: "Increase gem dropped by bosses",
};
