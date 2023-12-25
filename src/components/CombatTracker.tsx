import React, { useEffect } from "react";
import { enemies, shapes } from "@/constants/enemy";
import { boss } from "@/constants/enemy";

const CombatTracker = ({
  gold,
  stage,
  goldMultiplier,
  currentEnemy,
  currentEnemyType,
  maxEnemyNumber,
  currentBossIndex,
  currentEnemyShape,
  setGold,
  setCurrentEnemyType,
  setCurrentEnemyNumber,
  setStage,
  setCurrentEnemy,
  setCurrentEnemyIndex,
  setCurrentEnemyShape,
  toggleOnEnemyDeath,
}: any) => {
  useEffect(() => {
    if (currentEnemy.health <= 0) {
      toggleOnEnemyDeath((prev: boolean) => !prev);

      if (currentEnemyType === "boss") {
        setGold(gold + 1.34 ** stage * 24 * goldMultiplier);
        setCurrentEnemyType("normal");
        setCurrentEnemyNumber(1);
        setStage(stage + 1);

        // if shape swap intervals reached => swap to next shape
        if (parseFloat(stage) % 5 === 0) {
          const newIndex =
            (shapes.indexOf(currentEnemyShape) + 1) % shapes.length;
          setCurrentEnemyShape(shapes[newIndex]);
        }
      } else {
        setGold(gold + 1.32 ** stage * 3 * goldMultiplier);
        setCurrentEnemyNumber((prev: number) => {
          const newEnemyNumber = prev + 1;

          // if fighting boss
          if (maxEnemyNumber === newEnemyNumber) {
            setCurrentEnemy(() => ({
              ...boss[currentEnemyShape][currentBossIndex],
              health: 1.405 ** stage * 50,
              maxHealth: 1.405 ** stage * 50,
            }));
            setCurrentEnemyType("boss");
          } else {
            setCurrentEnemyIndex((prev: number) => {
              const newIndex = (prev + 1) % enemies[currentEnemyShape].length;
              setCurrentEnemy({
                ...enemies[currentEnemyShape][newIndex],
                health: 1.4 ** stage * 10 - 6,
                maxHealth: 1.4 ** stage * 10 - 6,
              });
              return newIndex;
            });
          }

          return newEnemyNumber;
        });
      }
    }
  }, [currentEnemy]);
  return <></>;
};

export default CombatTracker;
