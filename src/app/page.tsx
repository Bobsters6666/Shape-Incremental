"use client";
import React, { useState, useEffect } from "react";
import { enemies } from "@/constants/enemy";
import { helpers } from "@/constants/helpers";
import { nf } from "@/utils/utils";
import Helpers from "@/components/Helpers";
import Hero from "@/components/hero/Hero";
import HelpersField from "@/components/HelpersField";
import Companions from "@/components/Companions";
import { navCategories } from "@/constants";
import PlayerStats from "@/components/PlayerStats";
import AchievementsTracker from "@/components/AchievementsTracker";
import CombatTracker from "@/components/CombatTracker";
import Saver from "@/components/progress/Saver";
import Loader from "@/components/progress/Loader";
import Canvas from "@/components/Canvas";
import ClickingAnimation from "@/components/ClickingAnimation";
import Login from "@/components/Login";
import Link from "next/link";
import Artifacts from "@/components/Artifacts";
import { Button } from "@/components/ui/button";
import Shop from "@/components/Shop";
import Prestige from "@/components/progress/Prestige";
import { Notification, PushNotification } from "@/components/Notification";
import { notifications } from "@/constants/notifications";

interface Animation {
  id: number;
  isCrit: boolean;
  mousePosition: {
    x: number;
    y: number;
  };
}

export default function Home() {
  const [attack, setAttack] = useState(1);
  const [magic, setMagic] = useState(0);

  const [gold, setGold] = useState(10000);
  const [crystal, setCrystal] = useState(10);
  const [angel, setAngel] = useState(0);
  const [achievementPoints, setAchievementPoints] = useState(1000);
  const [stage, setStage] = useState(1);

  const [critChance, setCritChance] = useState(5);
  const [critDamage, setCritDamage] = useState(120);

  const [prestige, setPrestige] = useState(0);

  const [maxEnemyNumber, setMaxEnemyNumber] = useState(5);
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
  const [attackMultiplier, setAttackMultiplier] = useState(1);
  const [magicMultiplier, setMagicMultiplier] = useState(1);
  const [gemMultipler, setGemMultiplier] = useState(1);

  const [shinyChance, setShinyChance] = useState(2);
  const [isEnemyShiny, setIsEnemyShiny] = useState(false);

  const [activeAnimations, setActiveAnimations] = useState<Animation[]>([]);

  const handleClick = (event: any) => {
    const isCrit = Math.random() * 100 > 100 - critChance;

    if (isCrit) {
      setCurrentEnemy((prev) => ({
        ...prev,
        health: prev.health - ((attack * critDamage) / 100) * attackMultiplier,
      }));
    } else {
      setCurrentEnemy((prev) => ({
        ...prev,
        health: prev.health - attack * attackMultiplier,
      }));
    }

    // Create a new animation object and add it to the array
    const newAnimation: Animation = {
      id: Date.now(),
      isCrit,
      mousePosition: {
        x: event.clientX,
        y: event.clientY,
      },
    };

    setActiveAnimations((prevAnimations) => [...prevAnimations, newAnimation]);

    setTimeout(() => {
      setActiveAnimations((prevAnimations) =>
        prevAnimations.filter((animation) => animation.id !== newAnimation.id)
      );
    }, 500);
  };

  useEffect(() => {
    const updateMagic = setInterval(() => {
      setMagic((prev) => {
        let sum = 0;
        helpers.forEach((helper) => {
          sum += helper.magic;
        });
        return sum * magicMultiplier;
      });
    }, 100);

    return () => {
      clearInterval(updateMagic);
    };
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-24 overflow-hidden">
      <div className="flex gap-24 mt-12">
        <section className="flex gap-8 category flex-col relative">
          <div className="absolute -top-12 right-1 text-sm font-semibold">
            Crystal: {crystal}
          </div>

          <ul>
            {navCategories.map((category) => (
              <li
                className={`${category.color} ${
                  selectedCategory !== category.name ? "bg-opacity-50" : ""
                } text-sm font-bold cursor-pointer relative`}
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
                <PushNotification
                  name={category.name}
                  categoryNotifications={notifications.filter(
                    (n) => n === category.name
                  )}
                />
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
                      stage={stage}
                      goldMultiplier={goldMultiplier}
                      setGold={setGold}
                      crystal={crystal}
                      achievementPoints={achievementPoints}
                      setAchievementPoints={setAchievementPoints}
                      setCrystal={setCrystal}
                      setGoldMultiplier={setGoldMultiplier}
                      setAttackMultiplier={setAttackMultiplier}
                      setMagicMultiplier={setMagicMultiplier}
                      setGemMultiplier={setGemMultiplier}
                      setShinyChance={setShinyChance}
                    />
                  );
                case "Helper":
                  return (
                    <Helpers
                      gold={gold}
                      setGold={setGold}
                      goldMultiplier={goldMultiplier}
                      setGoldMultiplier={setGoldMultiplier}
                      attackMultiplier={attackMultiplier}
                      setAttackMultiplier={setAttackMultiplier}
                      magicMultiplier={magicMultiplier}
                      setMagicMultiplier={setMagicMultiplier}
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
                case "Artifact":
                  return (
                    <Artifacts
                      angel={angel}
                      setAngel={setAngel}
                      setAttackMultiplier={setAttackMultiplier}
                      setMagicMultiplier={setMagicMultiplier}
                      setGoldMultiplier={setGoldMultiplier}
                    />
                  );
                case "Shop":
                  return <Shop />;
                default:
                  return <></>;
              }
            })()}
          </div>
        </section>

        <section>
          <CombatTracker
            gold={gold}
            stage={stage}
            goldMultiplier={goldMultiplier}
            shinyChance={shinyChance}
            isEnemyShiny={isEnemyShiny}
            currentEnemy={currentEnemy}
            currentEnemyNumber={currentEnemyNumber}
            currentEnemyType={currentEnemyType}
            maxEnemyNumber={maxEnemyNumber}
            currentBossIndex={currentBossIndex}
            currentEnemyShape={currentEnemyShape}
            setGold={setGold}
            setCrystal={setCrystal}
            setIsEnemyShiny={setIsEnemyShiny}
            setCurrentEnemyType={setCurrentEnemyType}
            setCurrentEnemyNumber={setCurrentEnemyNumber}
            setStage={setStage}
            setCurrentEnemy={setCurrentEnemy}
            setCurrentEnemyIndex={setCurrentEnemyIndex}
            setCurrentEnemyShape={setCurrentEnemyShape}
            toggleOnEnemyDeath={toggleOnEnemyDeath}
          />

          <Canvas
            currentEnemy={currentEnemy}
            currentEnemyNumber={currentEnemyNumber}
            maxEnemyNumber={maxEnemyNumber}
            currentEnemyShape={currentEnemyShape}
            currentEnemyType={currentEnemyType}
            currentBossIndex={currentBossIndex}
            onEnemyDeath={onEnemyDeath}
            handleClick={handleClick}
            isEnemyShiny={isEnemyShiny}
          />
        </section>

        <HelpersField setCurrentEnemy={setCurrentEnemy} />
      </div>

      <section className="mt-36 font-bold text-lg">
        <div>
          Attack:{" "}
          <span className="text-orange-600">
            {nf(attack * attackMultiplier)}
          </span>
        </div>
        <div>
          Magic: <span className="text-orange-600">{nf(magic)}</span>
        </div>
        <PlayerStats
          goldMultiplier={goldMultiplier}
          attackMultiplier={attackMultiplier}
          magicMultiplier={magicMultiplier}
          gemMultiplier={gemMultipler}
          critChance={critChance}
          critDamage={critDamage}
          shinyChance={shinyChance}
        />
        <Prestige
          setAttack={setAttack}
          setMagic={setMagic}
          setGold={setGold}
          setAngel={setAngel}
          stage={stage}
          setStage={setStage}
          setCritChance={setCritChance}
          setCritDamage={setCritDamage}
          setPrestige={setPrestige}
          setCurrentEnemy={setCurrentEnemy}
          setCurrentEnemyNumber={setCurrentEnemyNumber}
        />
      </section>

      <AchievementsTracker
        gold={gold}
        achievementPoints={achievementPoints}
        setAchievementPoints={setAchievementPoints}
      />

      <Saver
        attack={attack}
        magic={magic}
        gold={gold}
        crystal={crystal}
        angels={angel}
        achievementPoints={achievementPoints}
        stage={stage}
        prestige={prestige}
        critChance={critChance}
        critDamage={critDamage}
        goldMultiplier={goldMultiplier}
        attackMultiplier={attackMultiplier}
        magicMultiplier={magicMultiplier}
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
        setPrestige={setPrestige}
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

      <Notification gold={gold} />

      {activeAnimations.map((animation) => (
        <ClickingAnimation
          key={animation.id}
          isCrit={animation.isCrit}
          id={animation.id}
          mousePosition={animation.mousePosition}
          attack={attack}
          attackMultiplier={attackMultiplier}
          critDamage={critDamage}
        />
      ))}
      <div className="absolute top-4 right-8 flex gap-4">
        <Button variant={"link"} className="text-black">
          <Link href="/logs">Logs</Link>
        </Button>
        <Button>
          <Link href="/leaderboard">Leaderboard</Link>
        </Button>
        <Login />
      </div>
    </main>
  );
}
