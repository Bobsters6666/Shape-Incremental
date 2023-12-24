import { useState } from "react";
import { enemies } from "@/constants/enemy";

export const useGameState = () => {
  const [maxEnemyNumber, setMaxEnemyNumber] = useState(10);
  const [currentEnemyNumber, setCurrentEnemyNumber] = useState(1);
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const [currentBossIndex, setCurrentBossIndex] = useState(0);
  const [currentEnemy, setCurrentEnemy] = useState(enemies[currentEnemyIndex]);
  const [currentEnemyType, setCurrentEnemyType] = useState("normal");

  const [attack, setAttack] = useState(1);
  const [magic, setMagic] = useState(0);

  const [gold, setGold] = useState(50000);
  const [stage, setStage] = useState(1);

  return {
    maxEnemyNumber,
    currentEnemyNumber,
    currentEnemyIndex,
    currentBossIndex,
    currentEnemy,
    currentEnemyType,
    setMaxEnemyNumber,
    setCurrentEnemyNumber,
    setCurrentEnemyIndex,
    setCurrentBossIndex,
    setCurrentEnemy,
    setCurrentEnemyType,
    attack,
    magic,
    gold,
    stage,
    setAttack,
    setMagic,
    setGold,
    setStage,
  };
};
