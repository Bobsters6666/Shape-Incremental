import React, { useEffect } from "react";
import { hero } from "@/constants/hero";
import { helpers } from "@/constants/helpers";
import { companions } from "@/constants/companions";
import { achievements } from "@/constants/achievements";

const Loader = ({
  setAttack,
  setMagic,
  setGold,
  setCrystal,
  setAchievementPoints,
  setStage,
  setCritChance,
  setCritDamage,
  setGoldMultiplier,
  setMaxEnemyNumber,
  setCurrentEnemyNumber,
  setCurrentEnemyIndex,
  setCurrentEnemy,
  setCurrentEnemyType,
  setCurrentBossIndex,
  currentEnemyType,
  currentEnemyIndex,
}: any) => {
  useEffect(() => {
    const load = () => {
      Object.assign(hero, JSON.parse(localStorage.getItem("hero")!));
      Object.assign(helpers, JSON.parse(localStorage.getItem("helpers")!));
      Object.assign(
        companions,
        JSON.parse(localStorage.getItem("companions")!)
      );
      Object.assign(
        achievements,
        JSON.parse(localStorage.getItem("achievements")!)
      );
      setAttack(parseFloat(localStorage.getItem("attack")!));
      setMagic(parseFloat(localStorage.getItem("magic")!));
      setGold(parseFloat(localStorage.getItem("gold")!));
      setCrystal(parseFloat(localStorage.getItem("crystal")!));
      setAchievementPoints(
        parseFloat(localStorage.getItem("achievementPoints")!)
      );
      setStage(parseFloat(localStorage.getItem("stage")!));
      setCritChance(parseFloat(localStorage.getItem("critChance")!));
      setCritDamage(parseFloat(localStorage.getItem("critDamage")!));
      setGoldMultiplier(parseFloat(localStorage.getItem("goldMultiplier")!));
      setMaxEnemyNumber(parseFloat(localStorage.getItem("maxEnemyNumber")!));
      setCurrentEnemyType(localStorage.getItem("currentEnemyType"));
      setCurrentBossIndex(
        parseFloat(localStorage.getItem("currentBossIndex")!)
      );
    };

    // load();
  }, []);

  return <></>;
};

export default Loader;
