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
    { name: "Helmet1", base: 1.2, scaled: 1, equipped: false },
    { name: "Helmet2", base: 1.4, scaled: 1, equipped: false },
    { name: "Helmet3", base: 1.1, scaled: 1, equipped: false },
    { name: "Helmet4", base: 1.3, scaled: 1, equipped: false },
    { name: "Helmet5", base: 1.5, scaled: 1, equipped: false },
    // ... repeat for a total of 15 items
  ],

  overall: [
    { name: "Armor1", base: 1.4, scaled: 1, equipped: false },
    { name: "Armor2", base: 1.2, scaled: 1, equipped: false },
    { name: "Armor3", base: 1.3, scaled: 1, equipped: false },
    { name: "Armor4", base: 1.1, scaled: 1, equipped: false },
    { name: "Armor5", base: 1.5, scaled: 1, equipped: false },
    // ... repeat for a total of 15 items
  ],
  weapon: [
    { name: "Sword1", base: 1.3, scaled: 1, equipped: false },
    { name: "Sword2", base: 1.1, scaled: 1, equipped: false },
    { name: "Sword3", base: 1.5, scaled: 1, equipped: false },
    { name: "Sword4", base: 1.2, scaled: 1, equipped: false },
    { name: "Sword5", base: 1.4, scaled: 1, equipped: false },
    // ... repeat for a total of 15 items
  ],

  secondary: [
    { name: "Shield1", base: 1.5, scaled: 1, equipped: false },
    { name: "Shield2", base: 1.3, scaled: 1, equipped: false },
    { name: "Shield3", base: 1.2, scaled: 1, equipped: false },
    { name: "Shield4", base: 1.4, scaled: 1, equipped: false },
    { name: "Shield5", base: 1.1, scaled: 1, equipped: false },
    // ... repeat for a total of 15 items
  ],

  shoes: [
    { name: "Boots1", base: 1.1, scaled: 1, equipped: false },
    { name: "Boots2", base: 1.5, scaled: 1, equipped: false },
    { name: "Boots3", base: 1.3, scaled: 1, equipped: false },
    { name: "Boots4", base: 1.2, scaled: 1, equipped: false },
    { name: "Boots5", base: 1.4, scaled: 1, equipped: false },
    // ... repeat for a total of 15 items
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

export const equipmentsInfo = {
  head: "Increases gold drop by enemies",
  overall: "Increase chance of shiny enemies",
  weapon: "Increase attack from all sources",
  secondary: "Increase magic from all sources",
  shoes: "Increase gem dropped by bosses",
};
