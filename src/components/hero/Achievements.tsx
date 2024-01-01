import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { achievements } from "@/constants/achievements";
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

const Achievements = ({ achivementPoints }: any) => {
  return (
    <>
      <div className="mb-6 text-center font-bold">
        Achievement Points: {achivementPoints}
      </div>
      <Dialog>
        <DialogTrigger className="mb-4">
          <Button>Points Shop</Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="mb-10 text-lg text-center">
              Achievement Points Shop
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-4 text-center"></DialogDescription>
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
