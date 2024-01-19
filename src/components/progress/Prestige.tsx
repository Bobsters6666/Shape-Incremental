import React from "react";
import { Button } from "../ui/button";
import { hero } from "@/constants/hero";
import { helpers } from "@/constants/helpers";
import { companions } from "@/constants/companions";
import { artifacts, newArtifact } from "@/constants/artifacts";
import { equipped, ownedEquipments } from "@/constants/equipment";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Prestige = ({
  setAttack,
  setMagic,
  setGold,
  setAngel,
  stage,
  setStage,
  setPrestige,
  setCritChance,
  setCritDamage,
  setCurrentEnemy,
  setCurrentEnemyNumber,
}: any) => {
  const angelGranted = Math.ceil((stage - 75) / 3);

  const prestige = () => {
    setAngel((prev: number) => prev + angelGranted);

    setAttack(1);
    setMagic(0);
    setGold(1);
    setStage(1);
    setPrestige((prev: number) => prev + 1);
    setCritChance(5);
    setCritDamage(120);
    setCurrentEnemy((prev: object) => ({ ...prev, health: 8, maxHealth: 8 }));
    setCurrentEnemyNumber(1);

    Object.assign(hero, JSON.parse(localStorage.getItem("defaultHero")!));
    Object.assign(helpers, JSON.parse(localStorage.getItem("defaultHelpers")!));
    Object.assign(
      companions,
      JSON.parse(localStorage.getItem("defaultCompanions")!)
    );
    Object.assign(
      artifacts,
      JSON.parse(localStorage.getItem("defaultArtifacts")!)
    );
    Object.assign(
      newArtifact,
      JSON.parse(localStorage.getItem("defaultNewArtifact")!)
    );
  };

  return (
    <>
      {stage > 75 && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="block mt-4">Prestige</Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="mb-10 text-lg text-center">
                Are you sure you want to prestige, everything will reset (except
                permanent stat bonuses)
              </DialogTitle>
              <DialogDescription className=" text-center text-lg">
                <p>
                  Angels Received upon Prestige: <strong>{angelGranted}</strong>
                </p>
                <Button
                  className="w-fit self-center mt-12"
                  onClick={() => prestige()}
                >
                  Confirm
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Prestige;
