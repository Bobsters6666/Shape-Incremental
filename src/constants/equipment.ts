interface EquipmentPiece {
  name: string;
  base: number;
  scaled: number;
}

interface EquippedPiece extends EquipmentPiece {
  equipped: boolean;
}

type EquipmentPieceName = "head" | "overall" | "weapon" | "secondary" | "foot";

export const equipments: Record<EquipmentPieceName, EquipmentPiece[]> = {
  head: [
    { name: "Helmet1", base: 1.2, scaled: 0 },
    { name: "Helmet2", base: 1.4, scaled: 0 },
    { name: "Helmet3", base: 1.1, scaled: 0 },
    { name: "Helmet4", base: 1.3, scaled: 0 },
    { name: "Helmet5", base: 1.5, scaled: 0 },
    // ... repeat for a total of 15 items
  ],

  overall: [
    { name: "Armor1", base: 1.4, scaled: 0 },
    { name: "Armor2", base: 1.2, scaled: 0 },
    { name: "Armor3", base: 1.3, scaled: 0 },
    { name: "Armor4", base: 1.1, scaled: 0 },
    { name: "Armor5", base: 1.5, scaled: 0 },
    // ... repeat for a total of 15 items
  ],
  weapon: [
    { name: "Sword1", base: 1.3, scaled: 0 },
    { name: "Sword2", base: 1.1, scaled: 0 },
    { name: "Sword3", base: 1.5, scaled: 0 },
    { name: "Sword4", base: 1.2, scaled: 0 },
    { name: "Sword5", base: 1.4, scaled: 0 },
    // ... repeat for a total of 15 items
  ],

  secondary: [
    { name: "Shield1", base: 1.5, scaled: 0 },
    { name: "Shield2", base: 1.3, scaled: 0 },
    { name: "Shield3", base: 1.2, scaled: 0 },
    { name: "Shield4", base: 1.4, scaled: 0 },
    { name: "Shield5", base: 1.1, scaled: 0 },
    // ... repeat for a total of 15 items
  ],

  foot: [
    { name: "Boots1", base: 1.1, scaled: 0 },
    { name: "Boots2", base: 1.5, scaled: 0 },
    { name: "Boots3", base: 1.3, scaled: 0 },
    { name: "Boots4", base: 1.2, scaled: 0 },
    { name: "Boots5", base: 1.4, scaled: 0 },
    // ... repeat for a total of 15 items
  ],
};

export const ownedEquipments: Record<EquipmentPieceName, EquippedPiece[]> = {
  head: [{ name: "Basic Helmet", base: 1.1, scaled: 0, equipped: true }],
  overall: [{ name: "Basic Overall", base: 1.1, scaled: 0, equipped: true }],
  weapon: [{ name: "Basic Weapon", base: 1.1, scaled: 0, equipped: true }],
  secondary: [
    { name: "Basic Secondary", base: 1.1, scaled: 0, equipped: true },
  ],
  foot: [{ name: "Basic Boot", base: 1.1, scaled: 0, equipped: true }],
};

export const equipped = {
  head: { name: "Basic Helmet", base: 1.1, scaled: 0, equipped: true },
  overall: { name: "Basic Overall", base: 1.1, scaled: 0, equipped: true },
  weapon: { name: "Basic Weapon", base: 1.1, scaled: 0, equipped: true },
  secondary: { name: "Basic Seconday", base: 1.1, scaled: 0, equipped: true },
  foot: { name: "Basic Boot", base: 1.1, scaled: 0, equipped: true },
};

const equipmentsInfo = {
  head: "gold",
  overall: "all",
  weapon: "attack",
  secondary: "magic",
  foot: "gem",
};
