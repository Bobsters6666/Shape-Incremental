import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { achievements, upgrades } from "@/constants/achievements";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type AchievementKey = keyof typeof achievements;

const Achievements = ({
  achievementPoints,
  setAchievementPoints,
  setGoldMultiplier,
  setAttackMultiplier,
  setMagicMultiplier,
}: any) => {
  const [APrequired, setAPrequired] = useState(0);

  const putPoint = (u: any) => {
    if (achievementPoints > u.cost && achievementPoints > APrequired) {
      setAPrequired(APrequired + u.cost);
      u.pointText++;
      u.multiplierText = 1.24 ** u.pointText;
    }
  };

  const removePoint = (u: any) => {
    if (u.point > 0 && u.point < u.pointText) {
      setAPrequired(APrequired - u.cost);
      u.pointText--;
      u.multiplierText = u.multiplierText / 1.24;
    }
  };

  const setPoint = () => {
    upgrades.map((u) => {
      let diff = 0;

      let m = u.multiplier;

      u.multiplier = u.multiplierText;

      if (u.name === "attack") {
        setAttackMultiplier((prev: any) => (prev * u.multiplier) / m);
      } else if (u.name === "magic") {
        setMagicMultiplier((prev: any) => (prev * u.multiplier) / m);
      } else {
        setGoldMultiplier((prev: any) => (prev * u.multiplier) / m);
      }

      u.point = u.pointText;
    });

    setAchievementPoints(achievementPoints - APrequired);
    setAPrequired(0);
  };

  return (
    <>
      <div className="mb-6 text-center font-bold">
        Achievement Points: {achievementPoints}
      </div>
      <Dialog>
        <DialogTrigger className="mb-4" asChild>
          <Button>Points Shop</Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="mb-6 text-lg text-center">
              Achievement Points Shop
            </DialogTitle>
            <DialogDescription className="mx-auto text-center">
              <p className="text-[16px] mb-10">
                Points:{" "}
                <strong className="text-black">{achievementPoints}</strong>
              </p>
              <div className="flex flex-col gap-4 items-end  justify-center text-black font-semibold">
                {upgrades.map((u) => (
                  <span
                    className="flex justify-center items-center gap-16"
                    key={u.name}
                  >
                    <p>Increase {u.name}</p>
                    <div className="flex items-center gap-3">
                      <Button
                        className="rounded-full text-xl p-4"
                        onClick={() => removePoint(u)}
                      >
                        -
                      </Button>
                      <p>{u.pointText}</p>
                      <Button
                        className="rounded-full text-xl p-[14px]"
                        onClick={() => putPoint(u)}
                      >
                        +
                      </Button>
                      <p className="opacity-60 text-xs">
                        x {u.multiplierText.toFixed(2)}
                      </p>
                    </div>
                  </span>
                ))}
              </div>

              <div className="my-6">
                Achivement Points Required: <strong>{APrequired}</strong>
              </div>

              <Button onClick={() => setPoint()}>Confirm</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col gap-4 max-h-[600px] overflow-y-scroll pr-4">
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
};

export default Achievements;
