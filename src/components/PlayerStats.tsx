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
  gemMultiplier,
  critChance,
  critDamage,
  shinyChance,
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
          <DialogDescription className="flex flex-col gap-4 text-center ">
            <span>
              Gold Multiplier: <strong>{goldMultiplier.toFixed(2)}</strong>
            </span>
            <span>
              Attack Multiplier: <strong>{attackMultiplier.toFixed(2)}</strong>
            </span>
            <span>
              Magic Multiplier: <strong>{magicMultiplier.toFixed(2)}</strong>
            </span>
            <span>
              Gem Multiplier: <strong>{gemMultiplier.toFixed(2)}</strong>
            </span>
            <span>
              Shiny Chance: <strong>{shinyChance.toFixed(2)}%</strong>
            </span>
            <span>
              Critical Chance: <strong>{critChance.toFixed(2)}%</strong>
            </span>
            <span>
              Critical Damage: <strong>{critDamage.toFixed(2)}%</strong>
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerStats;
