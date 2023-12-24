"use client";

import { nf } from "@/utils/utils";
import React, { useContext, useRef, useState } from "react";
import { hero } from "@/constants/hero";
import { useGameState } from "@/hooks";
import { AllPowerUps, AttackPowerUp, powerUps } from "@/constants/powerups";
import { heroCategories } from "@/constants";
import { achievements } from "@/constants/achievements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

interface HeroProps {
  gold: number;
  crystal: number;
  attack: number;
  setGold: (gold: number) => void;
  setAttack: (attack: number) => void;
  setCrystal: (crystal: number) => void;
}

type PowerUpKey = keyof typeof powerUps;
type AchievementKey = keyof typeof achievements;

const Hero = ({
  gold,
  crystal,
  attack,
  setGold,
  setCrystal,
  setAttack,
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
      setGold(gold - hero.cost);
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
              <div>
                <div>Equips</div>
              </div>
            );
          case "achievements":
            return (
              <>
                <div className="mb-6 text-center font-bold">
                  Achievement Points: {achivementPoints}
                </div>
                <div className="flex flex-col gap-4">
                  {Object.keys(achievements).map((achievement) => {
                    const currentAchievement =
                      achievements[achievement as AchievementKey];

                    return (
                      <div
                        key={currentAchievement.name}
                        className="p-4 bg-orange-300 flex justify-between items-center"
                      >
                        <p>{currentAchievement.description}</p>
                        {currentAchievement.completed ? (
                          <FontAwesomeIcon
                            className="text-green-500"
                            icon={faCheck}
                          ></FontAwesomeIcon>
                        ) : (
                          <FontAwesomeIcon
                            className="text-red-800"
                            icon={faX}
                          ></FontAwesomeIcon>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            );
          default:
            return <div>Default</div>;
        }
      })()}
    </div>
  );
};

export default Hero;
