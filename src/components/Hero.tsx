"use client";

import { nf } from "@/utils/utils";
import React, { useContext, useRef } from "react";
import { hero } from "@/constants/hero";
import { useGameState } from "@/hooks";
import { AllPowerUps, AttackPowerUp, powerUps } from "@/constants/powerups";

interface HeroProps {
  gold: number;
  attack: number;
  setGold: (gold: number) => void;
  setAttack: (gold: number) => void;
}

type PowerUpKey = keyof typeof powerUps;

const Hero = ({ gold, attack, setGold, setAttack }: HeroProps) => {
  const upgradeButtonRef = useRef<HTMLButtonElement>(null);
  const levelUpInfoP = useRef<HTMLParagraphElement>(null);

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
    <div className="flex flex-col gap-6">
      <div className="absolute top-12 right-0 text-sm font-semibold">
        Crystal: 0
      </div>

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
};

export default Hero;
