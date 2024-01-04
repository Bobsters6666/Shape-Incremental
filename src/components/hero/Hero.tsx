"use client";

import { nf } from "@/utils/utils";
import React, { useEffect, useRef, useState } from "react";
import { hero } from "@/constants/hero";
import { AllPowerUps, AttackPowerUp, powerUps } from "@/constants/powerups";
import { heroCategories } from "@/constants";
import { achievements } from "@/constants/achievements";
import Equipment from "./Equipment";
import Achievements from "./Achievements";

interface HeroProps {
  gold: number;
  crystal: number;
  attack: number;
  stage: number;
  setGold: (gold: number) => void;
  setAttack: (attack: number) => void;
  setCrystal: (crystal: number) => void;
  setGoldMultiplier: (GoldMultiplier: number) => void;
  setAttackMultiplier: (AttackMultiplier: number) => void;
  setMagicMultiplier: (MagicMultiplier: number) => void;
  setGemMultiplier: (GemMultiplier: number) => void;
  setShinyChance: (ShinyChance: number) => void;
}

type PowerUpKey = keyof typeof powerUps;

const Hero = ({
  gold,
  crystal,
  attack,
  stage,
  setGold,
  setCrystal,
  setAttack,
  setGoldMultiplier,
  setAttackMultiplier,
  setMagicMultiplier,
  setGemMultiplier,
  setShinyChance,
}: HeroProps) => {
  const upgradeButtonRef = useRef<HTMLButtonElement>(null);
  const levelUpInfoP = useRef<HTMLParagraphElement>(null);

  const [heroCategory, setHeroCategory] = useState("main");
  const [achivementPoints, setAchievementPoints] = useState(0);

  function isAttackPowerUp(powerUp: AllPowerUps): powerUp is AttackPowerUp {
    return "attackMultiplier" in powerUp;
  }

  const heroUpgrade = () => {
    if (gold >= hero.cost) {
      setGold(gold - hero.cost);

      let index = hero.intervals.indexOf(hero.level + 1);
      if (index !== -1) {
        const matchedPowerUp = powerUps[hero.powerUps[index] as PowerUpKey];
        upgradeButtonRef.current!.style.backgroundColor = "#fd7860";
        levelUpInfoP.current!.innerText = matchedPowerUp.description;
        hero.cost = hero.cost * matchedPowerUp.costMultiplier;
      } else {
        levelUpInfoP.current!.innerText = `Attack: +${nf(hero.attackIncrease)}`;
      }

      index = hero.intervals.indexOf(hero.level);

      if (index !== -1) {
        const matchedPowerUp = powerUps[hero.powerUps[index] as PowerUpKey];
        upgradeButtonRef.current!.style.backgroundColor = "rgb(253 186 116)";
        hero.cost = hero.cost / matchedPowerUp.costMultiplier;
        if (isAttackPowerUp(matchedPowerUp)) {
          attack *= matchedPowerUp.attackMultiplier;
        }
      }

      setAttack(attack + hero.attackIncrease);
      hero.cost = Math.ceil(hero.cost * hero.costScaling);
      hero.level++;
      hero.attackIncrease *= hero.scaling;
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
              <div className="flex flex-col gap-6">
                <h3 className="text-center text-lg font-bold">Hero</h3>
                <button
                  ref={upgradeButtonRef}
                  className="px-4 py-2 bg-orange-300 rounded-md hover:opacity-80"
                  onClick={heroUpgrade}
                >
                  <p>
                    <strong>Hero</strong>
                  </p>
                  <p>Level: {nf(hero.level)}</p>
                  <p>Cost: {nf(hero.cost)}</p>
                  <p ref={levelUpInfoP}>Attack: +{nf(hero.attackIncrease)}</p>
                </button>
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
            return <Achievements achivementPoints={achivementPoints} />;
          default:
            return <div>Default</div>;
        }
      })()}
    </div>
  );
};

export default Hero;
