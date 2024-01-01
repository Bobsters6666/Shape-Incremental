import React, { useEffect } from "react";
import { hero } from "@/constants/hero";
import { helpers } from "@/constants/helpers";
import { companions } from "@/constants/companions";
import { achievements } from "@/constants/achievements";
import { useSession } from "next-auth/react";
import { artifacts, newArtifact } from "@/constants/artifacts";
import { equipped, ownedEquipments } from "@/constants/equipment";

const Saver = ({
  attack,
  magic,
  gold,
  crystal,
  angel,
  achievementPoints,
  stage,
  prestige,
  critChance,
  critDamage,
  goldMultiplier,
  attackMultiplier,
  magicMultiplier,
  maxEnemyNumber,
  currentEnemyNumber,
  currentEnemyIndex,
  currentEnemy,
  currentBossIndex,
}: any) => {
  const { data: session } = useSession();

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("attack", attack);
      localStorage.setItem("magic", magic);
      localStorage.setItem("gold", gold);
      localStorage.setItem("crystal", crystal);
      localStorage.setItem("angel", angel);
      localStorage.setItem("achievementPoints", achievementPoints);
      localStorage.setItem("stage", stage);
      localStorage.setItem("prestige", prestige);
      localStorage.setItem("critChance", critChance);
      localStorage.setItem("critDamage", critDamage);
      localStorage.setItem("goldMultiplier", goldMultiplier);
      localStorage.setItem("attackMultiplier", attackMultiplier);
      localStorage.setItem("magicMultiplier", magicMultiplier);
      localStorage.setItem("maxEnemyNumber", maxEnemyNumber);
      localStorage.setItem("currentEnemyNumber", currentEnemyNumber);

      localStorage.setItem("hero", JSON.stringify(hero));
      localStorage.setItem("helpers", JSON.stringify(helpers));
      localStorage.setItem("companions", JSON.stringify(companions));
      localStorage.setItem("achievements", JSON.stringify(achievements));
      localStorage.setItem("artifacts", JSON.stringify(artifacts));
      localStorage.setItem("newArtifact", JSON.stringify(newArtifact));
      localStorage.setItem("ownedEquipments", JSON.stringify(ownedEquipments));
      localStorage.setItem("equipped", JSON.stringify(equipped));

      // saving default values (for prestige purposes)

      localStorage.setItem("defaultHero", JSON.stringify(hero));
      localStorage.setItem("defaultHelpers", JSON.stringify(helpers));
      localStorage.setItem("defaultCompanions", JSON.stringify(companions));
      localStorage.setItem("defaultArtifacts", JSON.stringify(artifacts));
      localStorage.setItem("defaultNewArtifact", JSON.stringify(newArtifact));
      localStorage.setItem(
        "defaultOwnedEquipments",
        JSON.stringify(ownedEquipments)
      );
      localStorage.setItem("defaultEquipped", JSON.stringify(equipped));
    }, 500);

    return () => clearInterval(interval);
  });

  return <></>;
};

export default Saver;
