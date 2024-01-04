import React, { useEffect, useRef, useState } from "react";
import { enemies, shapes } from "@/constants/enemy";
import { boss } from "@/constants/enemy";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { nf } from "@/utils/utils";
import {
  EquipmentPieceName,
  equipments,
  ownedEquipments,
} from "@/constants/equipment";

type EquipmentKey = keyof typeof equipments;

const CombatTracker = ({
  gold,
  stage,
  shinyChance,
  isEnemyShiny,
  goldMultiplier,
  currentEnemy,
  currentEnemyNumber,
  currentEnemyType,
  maxEnemyNumber,
  currentBossIndex,
  currentEnemyShape,
  setGold,
  setCrystal,
  setIsEnemyShiny,
  setCurrentEnemyType,
  setCurrentEnemyNumber,
  setStage,
  setCurrentEnemy,
  setCurrentEnemyIndex,
  setCurrentEnemyShape,
  toggleOnEnemyDeath,
}: any) => {
  const healthBar = useRef<HTMLDivElement | null>(null);
  const bossTimerRef = useRef<HTMLDivElement | null>(null);
  const [remainingBossTime, setRemainingBossTime] = useState(30);
  const [isTraining, setIsTraining] = useState(false);

  const equipmentKeys = ["head", "overall", "weapon", "seconday", "shoes"];
  const [currentEquipmentIndex, setCurrentEquipmentIndex] = useState(0);

  const { contextSafe: healthBarContextSafe } = useGSAP({ scope: healthBar });
  const { contextSafe: bossTimerContextSafe } = useGSAP({
    scope: bossTimerRef,
  });

  const healthBarChange = healthBarContextSafe(() => {
    if (healthBar.current !== null) {
      gsap.to(healthBar.current, {
        width: `${(currentEnemy.health / currentEnemy.maxHealth) * 100}%`,
        duration: 0.3,
        ease: "sine",
      });
    }
  });

  const bossTimerChange = bossTimerContextSafe(() => {
    if (bossTimerRef.current !== null) {
      gsap.to(bossTimerRef.current, {
        width: `${(remainingBossTime / 30) * 100}%`,
        duration: 0.3,
        ease: "sine",
      });
    }
  });

  const nextEnemy = () => {
    setCurrentEnemyIndex((prev: number) => {
      const newIndex = (prev + 1) % enemies[currentEnemyShape].length;
      setCurrentEnemy({
        ...enemies[currentEnemyShape][newIndex],
        health: 1.4 ** stage * 10 - 6,
        maxHealth: 1.4 ** stage * 10 - 6,
      });
      return newIndex;
    });
  };

  const setNextEnemyBoss = () => {
    setCurrentEnemy(() => ({
      ...boss[currentEnemyShape][currentBossIndex],
      health: 1.405 ** stage * 50,
      maxHealth: 1.405 ** stage * 50,
    }));
    setRemainingBossTime(30);
  };

  useEffect(() => {
    if (currentEnemy.health <= 0) {
      toggleOnEnemyDeath((prev: boolean) => !prev);

      if (currentEnemyType === "boss") {
        // if fighting actual boss
        if (!isTraining) {
          setGold(gold + 1.35 ** stage * 24 * goldMultiplier);
          setCurrentEnemyType("normal");
          setCurrentEnemyNumber(1);
          setStage(stage + 1);
          setCrystal((prev: number) => prev + Math.ceil(Math.random() * 3));

          // if shape swap intervals reached => swap to next shape
          if (parseFloat(stage) % 5 === 0) {
            const newIndex =
              (shapes.indexOf(currentEnemyShape) + 1) % shapes.length;
            setCurrentEnemyShape(shapes[newIndex]);

            // boss equip drop
            const equipType = equipmentKeys[
              currentEquipmentIndex
            ] as EquipmentPieceName;

            const randomEquip =
              equipments[equipType][
                Math.floor(Math.random() * equipments[equipType].length)
              ];

            randomEquip.scaled =
              randomEquip.base * (1 + randomEquip.scaled / 60);

            ownedEquipments[equipType].push(randomEquip);

            setCurrentEquipmentIndex((prev: number) => prev + 1);
          }
        } else nextEnemy();
      } else {
        if (isEnemyShiny) {
          setGold(gold + 1.34 ** stage * 12 * goldMultiplier);
          setIsEnemyShiny(false);
        } else {
          setGold(gold + 1.33 ** stage * 3 * goldMultiplier);
        }

        setCurrentEnemyNumber((prev: number) => {
          const newEnemyNumber = prev + 1;

          // if fighting boss
          if (maxEnemyNumber === newEnemyNumber) {
            setNextEnemyBoss();
            setCurrentEnemyType("boss");
          }

          // set next enemy shiny
          else if (Math.random() * 100 < shinyChance) {
            setIsEnemyShiny(true);
          }

          nextEnemy();
          return newEnemyNumber;
        });
      }
    }
  }, [currentEnemy]);

  const handleBossTimerTick = () => {
    if (currentEnemyType === "boss" && !isTraining) {
      if (remainingBossTime > 0) {
        setRemainingBossTime(
          (prevRemainingBossTime) => prevRemainingBossTime - 0.02
        );
        bossTimerChange();
      } else {
        setIsTraining((prev) => !prev);
        nextEnemy();
      }
    }
  };

  useEffect(() => {
    const bossTimerInterval = setInterval(() => {
      handleBossTimerTick();
    }, 20);

    return () => clearInterval(bossTimerInterval);
  }, [remainingBossTime, currentEnemyType, isTraining]);

  return (
    <>
      <div className="mb-4">Stage: {stage}</div>
      <div className="mb-10">
        {currentEnemyNumber} / {maxEnemyNumber}
      </div>
      <div className="mb-12">Gold: {nf(gold)}</div>

      <div className="w-[200px] relative mb-4">
        <div className="w-full h-8 absolute bg-red-300"></div>
        <div
          ref={healthBar}
          className={`h-8 bg-red-500 absolute w-full`}
          onClick={healthBarChange()}
        ></div>
        <div className={`absolute w-full font-bold text-white ml-2 mt-1`}>
          <p>
            {nf(currentEnemy.health)} / {nf(currentEnemy.maxHealth)}
          </p>
        </div>

        {isTraining && (
          <button
            className="absolute right-0 px-4 py-1 text-sm whitespace-nowrap -top-[28px] bg-orange-400 text-white font-semibold"
            onClick={() => {
              setIsTraining(false);
              setNextEnemyBoss();
            }}
          >
            Fight Boss
          </button>
        )}
      </div>

      {currentEnemyType === "boss" && !isTraining ? (
        <div className="w-[200px] relative pt-10 mb-12">
          <div className="w-full h-4 absolute bg-orange-200 rounded-[6px]"></div>
          <div
            ref={bossTimerRef}
            className={`h-4 bg-orange-400 absolute w-full rounded-[6px]`}
            onClick={healthBarChange()}
          ></div>
          <div
            className={`absolute w-full font-bold text-white text-[10px] ml-2 mt-[1px]`}
          >
            <p>{remainingBossTime.toFixed(1)} / 30.0</p>
          </div>
        </div>
      ) : (
        <div className="mb-12">_</div>
      )}
    </>
  );
};

export default CombatTracker;
