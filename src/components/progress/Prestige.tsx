import React from "react";
import { Button } from "../ui/button";
import { hero } from "@/constants/hero";
import { helpers } from "@/constants/helpers";
import { companions } from "@/constants/companions";
import { artifacts, newArtifact } from "@/constants/artifacts";
import { equipped, ownedEquipments } from "@/constants/equipment";

const Prestige = ({
  setAttack,
  setMagic,
  setGold,
  setAngel,
  stage,
  setStage,
  setPrestige,
  setCritChance,
  setCritDamage,
  setCurrentEnemy,
  setCurrentEnemyNumber,
}: any) => {
  const prestige = () => {
    setAngel((prev: number) => prev + Math.ceil((stage - 50) / 3));

    setAttack(1);
    setMagic(0);
    setGold(1);
    setStage(1);
    setPrestige((prev: number) => prev + 1);
    setCritChance(5);
    setCritDamage(120);
    setCurrentEnemy((prev: object) => ({ ...prev, health: 8, maxHealth: 8 }));
    setCurrentEnemyNumber(1);

    Object.assign(hero, JSON.parse(localStorage.getItem("defaultHero")!));
    Object.assign(helpers, JSON.parse(localStorage.getItem("defaultHelpers")!));
    Object.assign(
      companions,
      JSON.parse(localStorage.getItem("defaultCompanions")!)
    );
    Object.assign(
      artifacts,
      JSON.parse(localStorage.getItem("defaultArtifacts")!)
    );
    Object.assign(
      newArtifact,
      JSON.parse(localStorage.getItem("defaultNewArtifact")!)
    );
    Object.assign(
      ownedEquipments,
      JSON.parse(localStorage.getItem("defaultOwnedEquipments")!)
    );
    Object.assign(
      equipped,
      JSON.parse(localStorage.getItem("defaultEquipped")!)
    );
  };

  return (
    <>{stage > 50 && <Button onClick={() => prestige()}>Prestige</Button>}</>
  );
};

export default Prestige;
