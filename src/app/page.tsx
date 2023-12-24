"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { enemies, boss } from "@/constants/enemy";
import { helpers } from "@/constants/helpers";
import { nf } from "@/utils/utils";
import Helpers from "@/components/Helpers";
import Hero from "@/components/Hero";
import HelpersField from "@/components/HelpersField";
import Companions from "@/components/Companions";
import { navCategories } from "@/constants";
import PlayerStats from "@/components/PlayerStats";
import AchievementsTracker from "@/components/AchievementsTracker";

export default function Home() {
  const [attack, setAttack] = useState(1);
  const [magic, setMagic] = useState(0);

  const [gold, setGold] = useState(100000);
  const [crystal, setCrystal] = useState(500);
  const [stage, setStage] = useState(1);

  const [critChance, setCritChance] = useState(5);
  const [critDamage, setCritDamage] = useState(120);

  const [maxEnemyNumber, setMaxEnemyNumber] = useState(10);
  const [currentEnemyNumber, setCurrentEnemyNumber] = useState(1);
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const [currentBossIndex, setCurrentBossIndex] = useState(0);
  const [currentEnemy, setCurrentEnemy] = useState(enemies[currentEnemyIndex]);
  const [currentEnemyType, setCurrentEnemyType] = useState("normal");

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
    setCurrentEnemy((prev) => ({ ...prev, health: prev.health - attack }));
  };

  useEffect(() => {
    const intervals = helpers.map((helper, index) => {
      return setInterval(() => {
        setCurrentEnemy((prev) => ({
          ...prev,
          health: prev.health - helper.magic * helper.interval,
        }));

        setHelperAnimations(helpers.map(() => false));

        if (helper.level > 0) {
          setHelperAnimations((prev) =>
            prev.map((animation, i) => (i === index ? !animation : animation))
          );
        }
      }, helper.interval * 1000);
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, []);

  useEffect(() => {
    // console.log(currentEnemy);

    if (currentEnemy.health <= 0) {
      if (currentEnemyType === "boss") {
        setGold(gold + 1.34 ** stage * 24 * goldMultiplier);
        setCurrentEnemyType("normal");
        setCurrentEnemyNumber(1);
        setStage(stage + 1);
      } else {
        setGold(gold + 1.32 ** stage * 3 * goldMultiplier);
        setCurrentEnemyNumber((prev) => {
          const newEnemyNumber = prev + 1;

          if (maxEnemyNumber === newEnemyNumber) {
            setCurrentEnemy(() => ({
              ...boss[currentBossIndex],
              health: 1.405 ** stage * 50,
              maxHealth: 1.405 ** stage * 50,
            }));
            setCurrentEnemyType("boss");
          } else {
            setCurrentEnemyIndex((prev) => {
              const newIndex = (prev + 1) % enemies.length;
              setCurrentEnemy({
                ...enemies[newIndex],
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
    <main className="flex min-h-screen flex-col items-center p-24">
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
          <div className="">
            <p className=" mb-4">
              {currentEnemyNumber === maxEnemyNumber
                ? boss[currentBossIndex].name
                : enemies[currentEnemyIndex].name}
            </p>
            <Image
              src={currentEnemy.icon!}
              alt={currentEnemy.name}
              width={100}
              height={100}
              onClick={handleClick}
              priority={true}
              className="w-36 border hover:bg-gray-100 active:bg-gray-200"
            />
          </div>
        </section>

        <HelpersField
          handleClick={handleClick}
          helperAnimations={helperAnimations}
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
    </main>
  );
}
