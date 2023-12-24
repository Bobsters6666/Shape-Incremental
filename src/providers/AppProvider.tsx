"use client";

import { enemies } from "@/constants/enemy";
import React, { useState } from "react";

const AppProvider = ({ children }: any) => {
  const [maxEnemyNumber, setMaxEnemyNumber] = useState(10);
  const [currentEnemyNumber, setCurrentEnemyNumber] = useState(1);
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const [currentBossIndex, setCurrentBossIndex] = useState(0);
  const [currentEnemy, setCurrentEnemy] = useState(enemies[currentEnemyIndex]);
  const [currentEnemyType, setCurrentEnemyType] = useState("normal");

  return <div>{children}</div>;
};

export default AppProvider;
