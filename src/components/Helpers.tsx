import { Helper, helpers, helpersIntervals } from "@/constants/helpers";
import { AllPowerUps, ShapePowerUp, powerUps } from "@/constants/powerups";
import { nf } from "@/utils/utils";
import React, { useContext, useRef } from "react";

interface HelperProps {
  gold: number;
  setGold: (gold: number) => void;
}

type PowerUpKey = keyof typeof powerUps;

const Helpers = ({ gold, setGold }: HelperProps) => {
  const upgradeButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const levelUpInfoRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  function isShapePowerUp(powerUp: AllPowerUps): powerUp is ShapePowerUp {
    return "shapeMultiplier" in powerUp;
  }

  const helperUpgrade = (helper: Helper, index: number) => {
    const upgradeButtonRef = upgradeButtonRefs.current[index];
    const levelUpInfoRef = levelUpInfoRefs.current[index];

    if (gold >= helper.cost) {
      if (helpersIntervals.includes(helper.level + 1)) {
        const matchedPowerUp = powerUps[helper.powerUps![index] as PowerUpKey];
        upgradeButtonRef!.style.backgroundColor = "#fd7860";
        levelUpInfoRef!.innerText = matchedPowerUp.description;
        helper.cost = helper.cost * matchedPowerUp.costMultiplier;
      } else {
        levelUpInfoRef!.innerText = `Magic: +${nf(helper.magicIncrease)}`;
      }

      if (helpersIntervals.includes(helper.level)) {
        const matchedPowerUp = powerUps[helper.powerUps![index] as PowerUpKey];
        upgradeButtonRef!.style.backgroundColor = "rgb(253 186 116)";
        helper.cost = helper.cost / matchedPowerUp.costMultiplier;
        if (isShapePowerUp(matchedPowerUp)) {
          helper.magic *= matchedPowerUp.shapeMultiplier;
        }
      }

      setGold(gold - helper.cost);
      helper.magic += helper.magicIncrease;
      helper.cost = Math.ceil(helper.cost * helper.costScaling);
      helper.level++;
      helper.magicIncrease *= helper.scaling;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-center text-lg font-bold">Helpers</h3>
      {helpers.map((helper: Helper, index: number) => (
        <button
          ref={(el) => (upgradeButtonRefs.current[index] = el)}
          className="px-4 py-2 bg-orange-300 rounded-md hover:opacity-80"
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
