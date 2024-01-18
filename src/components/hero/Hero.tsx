"use client";

import { nf } from "@/utils/utils";
import React, { useEffect, useRef, useState } from "react";
import { Ability, AbilityKey, abilities, hero } from "@/constants/hero";
import { AllPowerUps, AttackPowerUp, powerUps } from "@/constants/powerups";
import { heroCategories } from "@/constants";
import { achievements } from "@/constants/achievements";
import Equipment from "./Equipment";
import Achievements from "./Achievements";
import XSelector from "../XSelector";

type PowerUpKey = keyof typeof powerUps;

// used to store the information for bulk upgrades
let heroCost = hero.cost;
let heroIncrease = hero.attackIncrease;
let levelsToGo = 1;

// store prev upgrade, allows to switch back to from bulk upgrade to single upgrade
let prevCost = hero.cost;
let prevIncrease = hero.attackIncrease;

const Hero = ({
  gold,
  crystal,
  attack,
  stage,
  goldMultiplier,
  achievementPoints,
  setAchievementPoints,
  setGold,
  setCrystal,
  setAttack,
  setGoldMultiplier,
  setAttackMultiplier,
  setMagicMultiplier,
  setGemMultiplier,
  setShinyChance,
}: any) => {
  const upgradeButtonRef = useRef<HTMLButtonElement>(null);
  const levelUpInfoP = useRef<HTMLParagraphElement>(null);

  const [heroCategory, setHeroCategory] = useState("main");

  const [numberOfUpgrades, setNumberOfUpgrades] = useState(1);

  // variable used to toggle the useEffect for setting heroCost and heroIncrease
  const [flick, setFlick] = useState(false);

  // bulk upgrade
  const [value, setValue] = useState("1");

  function isAttackPowerUp(powerUp: AllPowerUps): powerUp is AttackPowerUp {
    return "attackMultiplier" in powerUp;
  }

  const showPowerUp = (index: number) => {
    if (index !== -1) {
      const matchedPowerUp = powerUps[hero.powerUps[index] as PowerUpKey];
      upgradeButtonRef.current!.style.backgroundColor = "#fd7860";
      levelUpInfoP.current!.innerText = matchedPowerUp.description;
      hero.cost = hero.cost * matchedPowerUp.costMultiplier;
    } else {
      levelUpInfoP.current!.innerText = `Attack: +${nf(hero.attackIncrease)}`;
    }
  };

  const hidePowerUp = (index: number) => {
    if (index !== -1) {
      const matchedPowerUp = powerUps[hero.powerUps[index] as PowerUpKey];
      upgradeButtonRef.current!.style.backgroundColor = "rgb(253 186 116)";
      hero.cost = hero.cost / matchedPowerUp.costMultiplier;
      if (isAttackPowerUp(matchedPowerUp)) {
        attack *= matchedPowerUp.attackMultiplier;
      }
    }
  };

  const onHeroUpgrade = (bulk = false) => {
    if (gold >= heroCost) {
      setGold(gold - heroCost);

      let index = hero.intervals.indexOf(hero.level + 1);
      showPowerUp(index);

      index = hero.intervals.indexOf(hero.level);
      hidePowerUp(index);

      hero.level += levelsToGo;

      if (!bulk) {
        setAttack(attack + hero.attackIncrease);
        hero.cost *= hero.costScaling;
        hero.attackIncrease *= hero.scaling;
      } else {
        setAttack(attack + heroIncrease);
        hero.cost = heroCost * hero.costScaling;
        hero.attackIncrease = heroIncrease * hero.scaling;
      }

      heroCost = hero.cost;
      heroIncrease = hero.attackIncrease;

      setFlick(!flick);
    } else return;
  };

  const calculateBulkUpgrade = () => {
    levelsToGo =
      hero.intervals.filter((interval) => {
        return interval > hero.level;
      })[0] - hero.level;

    if (parseFloat(value) < levelsToGo) levelsToGo = parseFloat(value);

    heroCost = hero.cost;
    heroIncrease = hero.attackIncrease;

    for (let i = 0; i < levelsToGo; i++) {
      heroCost += prevCost;
      heroIncrease += prevIncrease;

      prevCost *= hero.costScaling;
      prevIncrease *= hero.scaling;
    }
  };

  useEffect(() => {
    // number of levels until next powerup
    if (parseFloat(value) === 1) {
      heroCost = hero.cost;
      heroIncrease = hero.attackIncrease;
      levelsToGo = 1;
      return;
    } else if (hero.level % 10 === 0) levelsToGo = 1;

    calculateBulkUpgrade();
  }, [value, flick]);

  const heroUpgrade = () => {
    let index = hero.intervals.indexOf(hero.level + levelsToGo - 1);
    let index2 = hero.intervals.indexOf(hero.level + levelsToGo);

    console.log(index, index2, hero.level + levelsToGo);

    if (index === -1 && value !== "1") {
      onHeroUpgrade(true);
    } else onHeroUpgrade();

    if (index2 !== -1 && value !== "1") {
      hero.cost = prevCost;
      hero.attackIncrease = prevIncrease;
      showPowerUp(index2);
    } else if (index !== -1 && value !== "1") {
      hidePowerUp(index);
    }
  };

  const useSkill = (key: string, object: Ability) => {
    if (crystal >= object.cost) {
      setCrystal(crystal - object.cost);

      setGold(gold + object.scaling ** stage * 2048 + 100 * goldMultiplier);
    }
  };

  return (
    <div className="">
      <ul className="flex justify-center items-center mb-6">
        {heroCategories.map((category) => (
          <li
            key={category.name}
            className={`flex-1 text-center ${category.color} ${
              heroCategory !== category.name ? "bg-opacity-50" : ""
            }`}
            onClick={() => setHeroCategory(category.name)}
          >
            {category.name}
          </li>
        ))}
      </ul>
      {(() => {
        switch (heroCategory) {
          case "main":
            return (
              <div className="flex flex-col gap-6 overflow-y-auto max-h-[600px] relative">
                <h3 className="text-center text-lg font-bold">Hero</h3>
                <XSelector value={value} setValue={setValue} />
                <button
                  ref={upgradeButtonRef}
                  className="px-4 py-2 bg-orange-300 rounded-md hover:opacity-80"
                  onClick={heroUpgrade}
                >
                  <p>
                    <strong>Hero</strong>
                  </p>
                  <p>Level: {nf(hero.level)}</p>
                  <p>Cost: {nf(heroCost)}</p>
                  <p ref={levelUpInfoP}>Attack: +{nf(heroIncrease)}</p>
                </button>

                {Object.keys(abilities).map((ability) => {
                  const object = abilities[ability as AbilityKey];

                  return (
                    <button
                      className="px-4 py-2 bg-orange-300 rounded-md hover:opacity-80 max-w-[324px]"
                      onClick={() => useSkill(ability, object)}
                      key={ability}
                    >
                      <p>
                        <strong className="capitalize">{ability}</strong>
                      </p>
                      <p>Cost: {nf(object.cost)} Crystal</p>
                      <p className="px-4">{object.description}</p>
                    </button>
                  );
                })}
              </div>
            );
          case "equips":
            return (
              <>
                <Equipment
                  stage={stage}
                  setGoldMultiplier={setGoldMultiplier}
                  setAttackMultiplier={setAttackMultiplier}
                  setMagicMultiplier={setMagicMultiplier}
                  setGemMultiplier={setGemMultiplier}
                  setShinyChance={setShinyChance}
                />
              </>
            );
          case "achievements":
            return (
              <Achievements
                achievementPoints={achievementPoints}
                setAchievementPoints={setAchievementPoints}
                setGoldMultiplier={setGoldMultiplier}
                setAttackMultiplier={setAttackMultiplier}
                setMagicMultiplier={setMagicMultiplier}
              />
            );
          default:
            return <div>Default</div>;
        }
      })()}
    </div>
  );
};

export default Hero;
