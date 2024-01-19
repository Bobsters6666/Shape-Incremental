import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { prizePool } from "@/constants/shop";
import { ArtifactKey, artifacts } from "@/constants/artifacts";
import {
  EquipmentPieceName,
  equipmentKeys,
  equipments,
  ownedEquipments,
} from "@/constants/equipment";

const Shop = ({ crystal, setCrystal, stage }: any) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prizes, setPrizes] = useState<string[]>([]);
  const tempPrizes: string[] = [];

  const lockedArtifacts = Object.keys(artifacts).filter((artifact) => {
    const a = artifacts[artifact as ArtifactKey];
    return (
      a.unlocked === false && (a.rarity === "epic" || a.rarity === "legendary")
    );
  });

  const openChest = (n: number, cost: number) => {
    if (crystal < cost) return;

    setIsLoading(true);
    setCrystal(crystal - cost);
    setIsDialogOpen(true);

    setTimeout(() => {
      setIsLoading(false);

      for (let i = 0; i < n; i++) {
        const prizeType =
          prizePool[Math.floor(Math.random() * prizePool.length)];

        if (prizeType === "piece") {
          const index = Math.floor(Math.random() * lockedArtifacts.length);
          const key = lockedArtifacts[index] as ArtifactKey;

          const nPieces = Math.ceil(Math.random() * 2.2);
          artifacts[key].piecesOwned! += nPieces;
          tempPrizes.push(`${nPieces} x ${key} pieces`);
        } else if (prizeType === "equipment") {
          const index = Math.floor(
            Math.random() * Object.keys(equipments).length
          );
          const key = Object.keys(equipments)[index] as EquipmentPieceName;

          const randomEquip =
            equipments[key][Math.floor(Math.random() * equipments[key].length)];

          randomEquip.scaled =
            (randomEquip.base * (1 + randomEquip.scaled / 60)) **
            Math.sqrt(stage);

          ownedEquipments[key].push(randomEquip);
          tempPrizes.push(randomEquip.name);
        }
      }

      setPrizes(tempPrizes);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center flex-col relative">
      <h3 className="text-center text-lg font-bold">Shop</h3>
      <div className="bg-orange-300 w-64 h-64 rounded-t-full mt-12 mb-8 text-center text-sm font-semibold grid place-items-center px-4 shadow-lg">
        <h4 className="font-bold text-[16px] pt-4">Secret Chest</h4>

        <div className="flex flex-col gap-2">
          <p>
            Open x 1: <span className="text-purple-700">60 crystal</span>
          </p>
          <p>
            Open x 10: <span className="text-purple-700">540 crystal</span>
          </p>
        </div>

        <p className="font-[400]">
          Receive one <strong>equipment</strong> or{" "}
          <strong>artifact shard</strong>, small chance to obtain a{" "}
          <strong>legendary artifact</strong>
        </p>
      </div>

      <div className="flex gap-12">
        <Button className="text-center" onClick={() => openChest(1, 60)}>
          Open x 1
        </Button>
        <Button className="text-center" onClick={() => openChest(10, 540)}>
          Open x 10
        </Button>
      </div>

      {isDialogOpen && (
        <Dialog defaultOpen onOpenChange={() => setIsDialogOpen(!isDialogOpen)}>
          <DialogTrigger></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center text-xl">
                Secret Chest
              </DialogTitle>
              <DialogDescription asChild>
                <div className="flex items-center justify-center flex-col">
                  {isLoading ? (
                    <Loader2 className="animate-spin my-12" size={"75px"} />
                  ) : (
                    <>
                      <div className="grid grid-cols-5">
                        {prizes.map((prize, i) => {
                          return (
                            <div
                              key={prize + i}
                              className="w-28 h-28 px-4 text-center font-bold my-12 bg-gray-100 shadow-md grid place-items-center"
                            >
                              {prize}
                            </div>
                          );
                        })}
                      </div>
                      <Button
                        onClick={() => {
                          setPrizes([]);
                          setIsDialogOpen(false);
                        }}
                      >
                        Close
                      </Button>
                    </>
                  )}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      <div className="absolute top-0 right-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"secondary"}>Inventory</Button>
          </DialogTrigger>
          <DialogContent className="pb-10">
            <DialogHeader>
              <DialogTitle className="text-center text-xl mb-8">
                Inventory
              </DialogTitle>
              <DialogDescription asChild>
                <>
                  <div className="flex items-center justify-center gap-6 text-sm">
                    {lockedArtifacts.map((a) => {
                      const artifact = artifacts[a as ArtifactKey];
                      const width = `${
                        (artifact.piecesOwned! / artifact.piecesToUnlock!) * 100
                      }px`;

                      return (
                        <div
                          key={a}
                          className="w-32 h-32 bg-gray-50 shadow-md grid place-items-center text-center font-semibold"
                        >
                          <p className="opacity-80">{a}</p>
                          <div>
                            <p>
                              {artifact.piecesOwned} / {artifact.piecesToUnlock}
                            </p>
                            <div className="relative w-24 mb-4 mt-1">
                              <div className="bg-orange-200 h-4 w-full absolute rounded-[4px]"></div>
                              <div
                                className={`bg-orange-500 h-4 absolute rounded-[4px]`}
                                style={{ width: width }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-center text-xs pt-4">
                    *Collect all pieces to unlock legendary artifact
                  </p>
                </>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Shop;
