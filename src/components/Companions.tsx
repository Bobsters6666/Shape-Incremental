import { Companions, companions } from "@/constants/companions";
import { nf } from "@/utils/utils";
import Image from "next/image";
import React from "react";

interface CompanionsProps {
  gold: number;
  setGold: (gold: number) => void;
  crystal: number;
  setCrystal: (crystal: number) => void;
  critChance: number;
  setCritChance: (critChance: number) => void;
  critDamage: number;
  setCritDamage: (critDamage: number) => void;
}

const Companions = ({
  gold,
  setGold,
  crystal,
  setCrystal,
  critChance,
  setCritChance,
  critDamage,
  setCritDamage,
}: CompanionsProps) => {
  const companionUpgrade = (companion: Companions, type: string) => {
    if (type === "crit-chance") {
      if (gold > companion.goldCost) {
        setGold(gold - companion.goldCost);
        setCritChance(critChance + companion.critChanceIncrease);
        companion.faces++;
        companion.critChanceIncrease *= companion.critChanceScaling;
        companion.goldCost *= companion.goldScaling;
      }
    } else if (type === "crit-damage") {
      if (crystal > companion.crystalCost) {
        setCrystal(crystal - companion.crystalCost);
        setCritDamage(critDamage + companion.critDamageIncrease);
        companion.vertex++;
        companion.critDamageIncrease *= companion.critDamageScaling;
        companion.crystalCost *= companion.crystalScaling;
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-center text-lg font-bold">Companion</h3>

      {companions.map((companion) => (
        <>
          <Image
            src={companion.icon}
            alt={companion.name}
            width={100}
            height={100}
            className="text-center mb-12 mx-auto"
          />
          <div className="p-3 bg-orange-200 rounded-[4px] text-center">
            <p>
              <strong>{companion.name}</strong>
            </p>
            <p>Level: {nf(companion.level)}</p>
            <p>Faces: {nf(companion.faces)}</p>
            <p>Vertex: {nf(companion.vertex)}</p>
            <div className="flex justify-center gap-2 mt-4 text-xs font-bold">
              <button
                className="flex-1 bg-orange-400 py-2 hover:bg-orange-300"
                onClick={() => companionUpgrade(companion, "crit-chance")}
              >
                <p>+1 Face</p>
                <p>+ {companion.critChanceIncrease.toFixed(2)}% Crit Chance</p>
                <p className="text-sm">Gold: {nf(companion.goldCost)} </p>
              </button>
              <button
                className="flex-1 bg-orange-400 py-2 hover:bg-orange-300"
                onClick={() => companionUpgrade(companion, "crit-damage")}
              >
                <p>+1 Vertex</p>
                <p>+ {companion.critDamageIncrease.toFixed(2)}% Crit Damage</p>
                <p className="text-sm">Crystal: {nf(companion.crystalCost)} </p>
              </button>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Companions;
