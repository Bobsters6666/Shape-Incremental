import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PlayerStatsProps {
  goldMultiplier: number;
  setGoldMultiplier: (goldMultiplier: number) => void;
  critChance: number;
  setCritChance: (goldMultiplier: number) => void;
  critDamage: number;
  setCritDamage: (goldMultiplier: number) => void;
}

const PlayerStats = ({
  goldMultiplier,
  setGoldMultiplier,
  critChance,
  setCritChance,
  critDamage,
  setCritDamage,
}: PlayerStatsProps) => {
  return (
    <Dialog>
      <DialogTrigger className="px-3 py-1 bg-zinc-300 mt-4 rounded-[4px] text-[14px] hover:opacity-80">
        Stats
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="mb-10 text-lg text-center">
            Player Stats:
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-4 text-center">
            <span>Gold Multiplier: {goldMultiplier}</span>
            <span>Critical Chance: {critChance}%</span>
            <span>Critical Damage: {critDamage}%</span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerStats;