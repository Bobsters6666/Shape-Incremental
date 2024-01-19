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

let costArray = helpers.map((helper) => {
  return helper.cost;
});
let increaseArray = helpers.map((helper) => {
  return helper.magicIncrease;
});
let levelArray = Array(helpers.length).fill(1);

let prevCostArray = costArray;
let prevIncreaseArray = increaseArray;

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

  // variable used to toggle the useEffect for setting costArray and increaseArray
  const [flick, setFlick] = useState(false);

  // bulk upgrade
  const [value, setValue] = useState("1");

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

  const showPowerup = (helper: Helper, i: number, level: number) => {
    const upgradeButtonRef = upgradeButtonRefs.current[i];
    const levelUpInfoRef = levelUpInfoRefs.current[i];
    if (level !== -1) {
      const matchedPowerUp = powerUps[helper.powerUps![0] as PowerUpKey];
      upgradeButtonRef!.style.backgroundColor = "#fd7860";
      levelUpInfoRef!.innerText = matchedPowerUp.description;
      helper.cost = helper.cost * matchedPowerUp.costMultiplier;
    } else {
      levelUpInfoRef!.innerText = `Magic: +${nf(helper.magicIncrease)}`;
    }
  };

  const hidePowerUp = (helper: Helper, i: number, level: number) => {
    const upgradeButtonRef = upgradeButtonRefs.current[i];
    if (level !== -1) {
      const matchedPowerUp = powerUps[helper.powerUps![0] as PowerUpKey];
      helper.powerUps!.splice(0, 1);

      upgradeButtonRef!.style.backgroundColor = "rgb(253 186 116)";
      helper.cost = helper.cost / matchedPowerUp.costMultiplier;
      if (isShapePowerUp(matchedPowerUp)) {
        helper.magic *= matchedPowerUp.shapeMultiplier;
      } else if (isGoldPowerUp(matchedPowerUp)) {
        setGoldMultiplier(goldMultiplier * matchedPowerUp.goldMultiplier);
      } else if (isAttackPowerUp(matchedPowerUp)) {
        setAttackMultiplier(attackMultiplier * matchedPowerUp.attackMultiplier);
      } else if (isMagicPowerUp(matchedPowerUp)) {
        setMagicMultiplier(magicMultiplier * matchedPowerUp.magicMultiplier);
      }
    }
  };

  const onHelperUpgrade = (helper: Helper, i: number, bulk = false) => {
    if (gold >= costArray[i]) {
      setGold(gold - costArray[i]);

      const level = helpersIntervals.indexOf(helper.level + 1);
      showPowerup(helper, i, level);

      const level2 = helpersIntervals.indexOf(helper.level);
      hidePowerUp(helper, i, level2);

      helper.level += levelArray[i];

      if (!bulk) {
        helper.magic += helper.magicIncrease;
        helper.cost = Math.ceil(helper.cost * helper.costScaling);
        helper.magicIncrease *= helper.scaling;
      } else {
        helper.magic += increaseArray[i];
        helper.cost = helper.costScaling * costArray[i];
        helper.magicIncrease = helper.scaling * increaseArray[i];
      }

      costArray[i] = helper.cost;
      increaseArray[i] = helper.magicIncrease;

      setFlick(!flick);
    } else return;
  };

  const calculateBulkUpgrade = () => {
    if (value === "1") {
      levelArray = Array(levelArray.length).fill(1);
    } else {
      levelArray = helpers.map((helper) => {
        let currentHelperLevelToGo =
          helpersIntervals.filter((interval) => {
            return interval > helper.level;
          })[0] - helper.level;

        if (parseFloat(value) < currentHelperLevelToGo) {
          currentHelperLevelToGo = parseFloat(value);
        }

        return currentHelperLevelToGo;
      });
    }

    costArray = helpers.map((helper) => {
      return helper.cost;
    });
    increaseArray = helpers.map((helper) => {
      return helper.magicIncrease;
    });

    levelArray.forEach((level, index) => {
      for (let i = 0; i < level; i++) {
        costArray[i] += prevCostArray[i];
        increaseArray[i] += prevIncreaseArray[i];

        prevCostArray[i] *= helpers[index].costScaling;

        prevIncreaseArray[i] *= helpers[index].scaling;
      }
    });
  };

  useEffect(() => {
    if (parseFloat(value) === 1) {
      costArray = helpers.map((helper) => {
        return helper.cost;
      });
      increaseArray = helpers.map((helper) => {
        return helper.magicIncrease;
      });
      levelArray = Array(helpers.length).fill(1);
      return;
    }

    calculateBulkUpgrade();
  }, [value, flick]);

  const helperUpgrade = (helper: Helper, i: number) => {
    let indices = helpers.map((helper, i) => {
      return helpersIntervals.indexOf(helper.level + levelArray[i] - 1);
    });
    let indices2 = helpers.map((helper, i) => {
      return helpersIntervals.indexOf(helper.level + levelArray[i]);
    });

    if (indices[i] === -1 && value !== "1") {
      onHelperUpgrade(helper, i, true);
    } else onHelperUpgrade(helper, i);

    if (gold >= costArray[i]) {
      if (indices2[i] !== -1 && value !== "1") {
        helper.cost = prevCostArray[i];
        helper.magicIncrease = prevIncreaseArray[i];
        showPowerup(helper, i, indices2[i]);
      } else if (indices[i] !== -1 && value !== "1") {
        hidePowerUp(helper, i, indices[i]);
      }
    }
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
          <p>Cost: {nf(costArray[index])}</p>
          <p ref={(el) => (levelUpInfoRefs.current[index] = el)}>
            Magic: +{nf(increaseArray[index])}
          </p>
        </button>
      ))}
    </div>
  );
};

export default Helpers;
