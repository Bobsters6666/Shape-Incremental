import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PlayerStats = ({
  goldMultiplier,
  attackMultiplier,
  magicMultiplier,
  critChance,
  critDamage,
}: any) => {
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
            <span>Gold Multiplier: {goldMultiplier.toFixed(2)}</span>
            <span>Attack Multiplier: {attackMultiplier.toFixed(2)}</span>
            <span>Magic Multiplier: {magicMultiplier.toFixed(2)}</span>
            <span>Critical Chance: {critChance.toFixed(2)}%</span>
            <span>Critical Damage: {critDamage.toFixed(2)}%</span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerStats;
