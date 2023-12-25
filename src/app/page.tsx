"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { enemies, boss, enemyAdjectives } from "@/constants/enemy";
import { helpers } from "@/constants/helpers";
import { nf } from "@/utils/utils";
import Helpers from "@/components/Helpers";
import Hero from "@/components/Hero";
import HelpersField from "@/components/HelpersField";
import Companions from "@/components/Companions";
import { navCategories } from "@/constants";
import PlayerStats from "@/components/PlayerStats";
import AchievementsTracker from "@/components/AchievementsTracker";
import CombatTracker from "@/components/CombatTracker";
import Saver from "@/components/progress/Saver";
import Loader from "@/components/progress/Loader";
import Canvas from "@/components/Canvas";
import { EnemyShapes } from "@/constants/enemy";

export default function Home() {
  const [attack, setAttack] = useState(1);
  const [magic, setMagic] = useState(0);

  const [gold, setGold] = useState(10000000);
  const [crystal, setCrystal] = useState(10);
  const [achievementPoints, setAchievementPoints] = useState(0);
  const [stage, setStage] = useState(1);

  const [critChance, setCritChance] = useState(5);
  const [critDamage, setCritDamage] = useState(120);

  const [maxEnemyNumber, setMaxEnemyNumber] = useState(10);
  const [currentEnemyNumber, setCurrentEnemyNumber] = useState(1);
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const [currentBossIndex, setCurrentBossIndex] = useState(0);
  const [currentEnemyType, setCurrentEnemyType] = useState("normal");
  const [currentEnemyShape, setCurrentEnemyShape] = useState("Ellipse");
  const [currentEnemy, setCurrentEnemy] = useState(
    enemies[currentEnemyShape][currentEnemyIndex]
  );

  const [onEnemyDeath, toggleOnEnemyDeath] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("Hero");

  const [goldMultiplier, setGoldMultiplier] = useState(1);

  const [helperAnimations, setHelperAnimations] = useState(
    helpers.map(() => false)
  );

  const healthBar = useRef<any>(null);

  const { contextSafe } = useGSAP({ scope: healthBar });
  const healthBarChange = contextSafe(() => {
    if (healthBar.current !== null) {
      gsap.to(healthBar.current, {
        width: `${(currentEnemy.health / currentEnemy.maxHealth) * 100}%`,
        duration: 0.3,
        ease: "sine",
      });
    }
  });

  const handleClick = () => {
    const isCrit = Math.random() * 100 > 100 - critChance;

    if (isCrit) {
      setCurrentEnemy((prev) => ({
        ...prev,
        health: prev.health - (attack * critDamage) / 100,
      }));
    } else {
      setCurrentEnemy((prev) => ({ ...prev, health: prev.health - attack }));
    }
  };

  useEffect(() => {
    const updateMagic = setInterval(() => {
      setMagic((prev) => {
        let sum = 0;
        helpers.forEach((helper) => {
          sum += helper.magic;
        });
        return sum;
      });
    }, 100);

    return () => {
      clearInterval(updateMagic);
    };
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-24 overflow-hidden">
      <div className="flex gap-24">
        <section className="flex gap-8 category flex-col relative">
          <div className="absolute -top-12 right-1 text-sm font-semibold">
            Crystal: {crystal}
          </div>

          <ul>
            {navCategories.map((category) => (
              <li
                className={`${category.color} ${
                  selectedCategory !== category.name ? "bg-opacity-50" : ""
                } text-sm font-bold cursor: pointer;`}
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </li>
            ))}
          </ul>

          <div>
            {(() => {
              switch (selectedCategory) {
                case "Hero":
                  return (
                    <Hero
                      attack={attack}
                      setAttack={setAttack}
                      gold={gold}
                      setGold={setGold}
                      crystal={crystal}
                      setCrystal={setCrystal}
                    />
                  );
                case "Helper":
                  return (
                    <Helpers
                      gold={gold}
                      setGold={setGold}
                      goldMultiplier={goldMultiplier}
                      setGoldMultiplier={setGoldMultiplier}
                    />
                  );
                case "Companion":
                  return (
                    <Companions
                      gold={gold}
                      setGold={setGold}
                      critChance={critChance}
                      setCritChance={setCritChance}
                      critDamage={critDamage}
                      setCritDamage={setCritDamage}
                      crystal={crystal}
                      setCrystal={setCrystal}
                    />
                  );
                default:
                  return <></>;
              }
            })()}
          </div>
        </section>

        <section>
          <div className="mb-4">Stage: {stage}</div>
          <div className="mb-10">
            {currentEnemyNumber} / {maxEnemyNumber}
          </div>
          <div className="mb-12">Gold: {nf(gold)}</div>

          <div className="w-[160px] relative mb-28">
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
          </div>

          <Canvas
            currentEnemy={currentEnemy}
            currentEnemyNumber={currentEnemyNumber}
            maxEnemyNumber={maxEnemyNumber}
            currentEnemyShape={currentEnemyShape}
            currentEnemyType={currentEnemyType}
            currentBossIndex={currentBossIndex}
            onEnemyDeath={onEnemyDeath}
            handleClick={handleClick}
          />
        </section>

        <HelpersField
          handleClick={handleClick}
          helperAnimations={helperAnimations}
          setCurrentEnemy={setCurrentEnemy}
          setHelperAnimations={setHelperAnimations}
        />
      </div>

      <section className="mt-36 font-bold text-lg">
        <div>
          Attack: <span className="text-orange-600">{nf(attack)}</span>
        </div>
        <div>
          Magic: <span className="text-orange-600">{nf(magic)}</span>
        </div>
        <PlayerStats
          goldMultiplier={goldMultiplier}
          setGoldMultiplier={setGoldMultiplier}
          critChance={critChance}
          setCritChance={setCritChance}
          critDamage={critDamage}
          setCritDamage={setCritDamage}
        />
      </section>

      <AchievementsTracker gold={gold} />
      <CombatTracker
        gold={gold}
        stage={stage}
        goldMultiplier={goldMultiplier}
        currentEnemy={currentEnemy}
        currentEnemyType={currentEnemyType}
        maxEnemyNumber={maxEnemyNumber}
        currentBossIndex={currentBossIndex}
        currentEnemyShape={currentEnemyShape}
        setGold={setGold}
        setCurrentEnemyType={setCurrentEnemyType}
        setCurrentEnemyNumber={setCurrentEnemyNumber}
        setStage={setStage}
        setCurrentEnemy={setCurrentEnemy}
        setCurrentEnemyIndex={setCurrentEnemyIndex}
        setCurrentEnemyShape={setCurrentEnemyShape}
        toggleOnEnemyDeath={toggleOnEnemyDeath}
      />

      <Saver
        attack={attack}
        magic={magic}
        gold={gold}
        crystal={crystal}
        achievementPoints={achievementPoints}
        stage={stage}
        critChance={critChance}
        critDamage={critDamage}
        goldMultiplier={goldMultiplier}
        maxEnemyNumber={maxEnemyNumber}
        currentEnemyNumber={currentEnemyNumber}
        currentEnemyIndex={currentEnemyIndex}
        currentEnemy={currentEnemy}
        currentEnemyType={currentEnemyType}
        currentBossIndex={currentBossIndex}
      />

      <Loader
        setAttack={setAttack}
        setMagic={setMagic}
        setGold={setGold}
        setCrystal={setCrystal}
        setAchievementPoints={setAchievementPoints}
        setStage={setStage}
        setCritChance={setCritChance}
        setCritDamage={setCritDamage}
        setGoldMultiplier={setGoldMultiplier}
        setMaxEnemyNumber={setMaxEnemyNumber}
        setCurrentEnemyNumber={setCurrentEnemyNumber}
        setCurrentEnemyIndex={setCurrentEnemyIndex}
        setCurrentEnemy={setCurrentEnemy}
        setCurrentEnemyType={setCurrentEnemyType}
        setCurrentBossIndex={setCurrentBossIndex}
        currentEnemyType={currentEnemyType}
        currentEnemyIndex={currentEnemyIndex}
      />
    </main>
  );
}
