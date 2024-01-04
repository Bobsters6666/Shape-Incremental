import React, { useEffect } from "react";
import { hero } from "@/constants/hero";
import { helpers } from "@/constants/helpers";
import { companions } from "@/constants/companions";
import { achievements } from "@/constants/achievements";
import { artifacts, newArtifact } from "@/constants/artifacts";
import { equipped, ownedEquipments } from "@/constants/equipment";

const Loader = ({
  setAttack,
  setMagic,
  setGold,
  setCrystal,
  setAchievementPoints,
  setStage,
  setPrestige,
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
      const heroData = localStorage.getItem("hero");
      const helpersData = localStorage.getItem("helpers");
      const companionsData = localStorage.getItem("companions");
      const achievementsData = localStorage.getItem("achievements");
      const attackData = localStorage.getItem("attack");
      const magicData = localStorage.getItem("magic");

      if (
        !heroData ||
        !helpersData ||
        !companionsData ||
        !achievementsData ||
        !attackData ||
        !magicData
      ) {
        return;
      }

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
      Object.assign(artifacts, JSON.parse(localStorage.getItem("artifacts")!));
      Object.assign(
        newArtifact,
        JSON.parse(localStorage.getItem("newArtifact")!)
      );
      Object.assign(
        ownedEquipments,
        JSON.parse(localStorage.getItem("ownedEquipments")!)
      );
      Object.assign(equipped, JSON.parse(localStorage.getItem("equipped")!));
      setAttack(parseFloat(localStorage.getItem("attack")!));
      setMagic(parseFloat(localStorage.getItem("magic")!));
      setGold(parseFloat(localStorage.getItem("gold")!));
      setCrystal(parseFloat(localStorage.getItem("crystal")!));
      setAchievementPoints(
        parseFloat(localStorage.getItem("achievementPoints")!)
      );
      setStage(parseFloat(localStorage.getItem("stage")!));
      setPrestige(parseFloat(localStorage.getItem("prestige")!));
      setCritChance(parseFloat(localStorage.getItem("critChance")!));
      setCritDamage(parseFloat(localStorage.getItem("critDamage")!));
      setGoldMultiplier(parseFloat(localStorage.getItem("goldMultiplier")!));
      setMaxEnemyNumber(parseFloat(localStorage.getItem("maxEnemyNumber")!));
      setCurrentEnemyType(localStorage.getItem("currentEnemyType"));
      setCurrentEnemyNumber(
        parseFloat(localStorage.getItem("currentEnemyNumber")!)
      );
      setCurrentBossIndex(
        parseFloat(localStorage.getItem("currentBossIndex")!)
      );
    };

    load();
  }, []);

  return <></>;
};

export default Loader;
