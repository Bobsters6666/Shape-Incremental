import React, { useEffect } from "react";
import { hero } from "@/constants/hero";
import { helpers } from "@/constants/helpers";
import { companions } from "@/constants/companions";
import { achievements } from "@/constants/achievements";

const Saver = ({
  attack,
  magic,
  gold,
  crystal,
  achievementPoints,
  stage,
  critChance,
  critDamage,
  goldMultiplier,
  maxEnemyNumber,
  currentEnemyNumber,
  currentEnemyIndex,
  currentEnemy,
  currentEnemyType,
  currentBossIndex,
}: any) => {
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("attack", attack);
      localStorage.setItem("magic", magic);
      localStorage.setItem("gold", gold);
      localStorage.setItem("crystal", crystal);
      localStorage.setItem("achievementPoints", achievementPoints);
      localStorage.setItem("stage", stage);
      localStorage.setItem("critChance", critChance);
      localStorage.setItem("critDamage", critDamage);
      localStorage.setItem("goldMultiplier", goldMultiplier);
      localStorage.setItem("maxEnemyNumber", maxEnemyNumber);
      localStorage.setItem("currentEnemyNumber", currentEnemyNumber);
      localStorage.setItem("currentEnemyIndex", currentEnemyIndex);
      localStorage.setItem("currentEnemy", currentEnemy);
      localStorage.setItem("currentEnemyType", currentEnemyType);
      localStorage.setItem("currentBossIndex", currentBossIndex);

      localStorage.setItem("hero", JSON.stringify(hero));
      localStorage.setItem("helpers", JSON.stringify(helpers));
      localStorage.setItem("companions", JSON.stringify(companions));
      localStorage.setItem("achievements", JSON.stringify(achievements));
    }, 500);

    return () => clearInterval(interval);
  });

  return <></>;
};

export default Saver;
