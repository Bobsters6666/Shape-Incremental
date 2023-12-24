// "use client";

// import React, { createContext, useContext, useState } from "react";
// import { enemies } from "@/constants/enemy";

// export const GameContext = createContext();

// export function GameContextProvider({ children }: any) {
//   const [maxEnemyNumber, setMaxEnemyNumber] = useState(10);
//   const [currentEnemyNumber, setCurrentEnemyNumber] = useState(1);
//   const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
//   const [currentBossIndex, setCurrentBossIndex] = useState(0);
//   const [currentEnemy, setCurrentEnemy] = useState(enemies[currentEnemyIndex]);
//   const [currentEnemyType, setCurrentEnemyType] = useState("normal");

//   return (
//     <GameContext.Provider
//       value={{
//         maxEnemyNumber,
//         currentEnemyNumber,
//         currentBossIndex,
//         currentEnemy,
//         currentEnemyType,
//         setMaxEnemyNumber,
//         setCurrentEnemyNumber,
//         setCurrentEnemyIndex,
//         setCurrentBossIndex,
//         setCurrentEnemy,
//         setCurrentEnemyType,
//       }}
//     >
//       {children}
//     </GameContext.Provider>
//   );
// }

// export const useGameContext = () => useContext(GameContext);
