import { Helper, helpers, helpersIntervals } from "@/constants/helpers";
import { notifications } from "@/constants/notifications";
import {
  AllPowerUps,
  AttackPowerUp,
  GoldPowerUp,
  MagicPowerUp,
  ShapePowerUp,
  powerUps,
} from "@/constants/powerups";
import { nf } from "@/utils/utils";
import React, { useContext, useEffect, useRef, useState } from "react";
import XSelector from "./XSelector";

interface HelperProps {
  gold: number;
  setGold: (gold: number) => void;
  goldMultiplier: number;
  setGoldMultiplier: (goldMultiplier: number) => void;
  attackMultiplier: number;
  setAttackMultiplier: (attackMultiplier: number) => void;
  magicMultiplier: number;
  setMagicMultiplier: (magicMultiplier: number) => void;
}

type PowerUpKey = keyof typeof powerUps;

const Helpers = ({
  gold,
  setGold,
  goldMultiplier,
  setGoldMultiplier,
  attackMultiplier,
  setAttackMultiplier,
  magicMultiplier,
  setMagicMultiplier,
}: HelperProps) => {
  const upgradeButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const levelUpInfoRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  // bulk upgrade
  const [value, setValue] = useState("");

  function isShapePowerUp(powerUp: AllPowerUps): powerUp is ShapePowerUp {
    return "shapeMultiplier" in powerUp;
  }

  function isGoldPowerUp(powerUp: AllPowerUps): powerUp is GoldPowerUp {
    return "goldMultiplier" in powerUp;
  }

  function isAttackPowerUp(powerUp: AllPowerUps): powerUp is AttackPowerUp {
    return "attackMultiplier" in powerUp;
  }

  function isMagicPowerUp(powerUp: AllPowerUps): powerUp is MagicPowerUp {
    return "magicMultiplier" in powerUp;
  }

  const onHelperUpgrade = (helper: Helper, index: number) => {
    const upgradeButtonRef = upgradeButtonRefs.current[index];
    const levelUpInfoRef = levelUpInfoRefs.current[index];

    if (gold >= helper.cost) {
      setGold(gold - helper.cost);
      if (helpersIntervals.includes(helper.level + 1)) {
        const matchedPowerUp = powerUps[helper.powerUps![0] as PowerUpKey];
        upgradeButtonRef!.style.backgroundColor = "#fd7860";
        levelUpInfoRef!.innerText = matchedPowerUp.description;
        helper.cost = helper.cost * matchedPowerUp.costMultiplier;
      } else {
        levelUpInfoRef!.innerText = `Magic: +${nf(helper.magicIncrease)}`;
      }

      if (helpersIntervals.includes(helper.level)) {
        const matchedPowerUp = powerUps[helper.powerUps![0] as PowerUpKey];
        helper.powerUps!.splice(0, 1);

        upgradeButtonRef!.style.backgroundColor = "rgb(253 186 116)";
        helper.cost = helper.cost / matchedPowerUp.costMultiplier;
        if (isShapePowerUp(matchedPowerUp)) {
          helper.magic *= matchedPowerUp.shapeMultiplier;
        } else if (isGoldPowerUp(matchedPowerUp)) {
          setGoldMultiplier(goldMultiplier * matchedPowerUp.goldMultiplier);
        } else if (isAttackPowerUp(matchedPowerUp)) {
          setAttackMultiplier(
            attackMultiplier * matchedPowerUp.attackMultiplier
          );
        } else if (isMagicPowerUp(matchedPowerUp)) {
          setMagicMultiplier(magicMultiplier * matchedPowerUp.magicMultiplier);
        }
      }

      helper.magic += helper.magicIncrease;
      helper.cost = Math.ceil(helper.cost * helper.costScaling);
      helper.level++;
      helper.magicIncrease *= helper.scaling;
    }
  };

  const helperUpgrade = (helper: Helper, index: number) => {
    if (value === "max") {
      while (gold >= helper.cost) {
        onHelperUpgrade(helper, index);
      }
    } else if (value === "100") {
      for (let i = 0; i < 100; i++) {
        onHelperUpgrade(helper, index);
        console.log(i);
      }
    } else if (value === "10") {
      for (let i = 0; i < 10; i++) onHelperUpgrade(helper, index);
    } else onHelperUpgrade(helper, index);
  };

  let hiddenHelpers = helpers.filter((helper) => helper.show === false);

  useEffect(() => {
    const checkMinimumGoldMet = setInterval(() => {
      hiddenHelpers.forEach((helper) => {
        if (gold * 50 > helper.cost) {
          helper.show = true;
          hiddenHelpers = helpers.filter((helper) => helper.show === false);
        }
      });
    }, 100);

    return () => clearInterval(checkMinimumGoldMet);
  });

  for (let i = notifications.length; i >= 0; i--) {
    if (notifications[i] === "Helper") notifications.splice(i);
  }

  return (
    <div className="flex flex-col gap-6 max-h-[600px] overflow-y-auto pr-4 relative">
      <XSelector value={value} setValue={setValue} />
      <h3 className="text-center text-lg font-bold">Helpers</h3>
      {helpers.map((helper: Helper, index: number) => (
        <button
          ref={(el) => (upgradeButtonRefs.current[index] = el)}
          className={`px-4 py-2 bg-orange-300 rounded-md hover:opacity-80 ${
            helper.show === false ? "hidden" : "inline-block"
          }`}
          key={helper.name}
          onClick={() => helperUpgrade(helper, index)}
        >
          <p>
            <strong>{helper.name}</strong>
          </p>
          <p>Level: {nf(helper.level)}</p>
          <p>Cost: {nf(helper.cost)}</p>
          <p ref={(el) => (levelUpInfoRefs.current[index] = el)}>
            Magic: +{nf(helper.magicIncrease)}
          </p>
        </button>
      ))}
    </div>
  );
};

export default Helpers;
