import {
  EquipmentPiece,
  EquipmentPieceName,
  equipments,
  equipmentsInfo,
  equipped,
  ownedEquipments,
} from "@/constants/equipment";
import React, { useState } from "react";
import { Button } from "../ui/button";

const Equipment = ({
  setGoldMultiplier,
  setAttackMultiplier,
  setMagicMultiplier,
  setGemMultiplier,
  setShinyChance,
  stage,
}: any) => {
  const [equipmentCategory, setEquipmentCategory] = useState("head");

  const equipItem = (equip: EquipmentPiece, equipType: EquipmentPieceName) => {
    const prevEquipPower = equipped[equipType].scaled;
    equipped[equipType] = equip;

    Object.keys(ownedEquipments).forEach((equipmentType) => {
      ownedEquipments[equipmentType as EquipmentPieceName].forEach(
        (equipment) => {
          if (equipment.name === equip.name) {
            equipment.equipped = true;
          } else equipment.equipped = false;
        }
      );
    });

    if (equipType === "head") {
      setGoldMultiplier((prev: number) => prev / prevEquipPower);
      setGoldMultiplier((prev: number) => prev * equipped[equipType].scaled);
    } else if (equipType === "overall") {
      setShinyChance((prev: number) => prev / prevEquipPower);
      setShinyChance((prev: number) => prev * equipped[equipType].scaled);
    } else if (equipType === "weapon") {
      setAttackMultiplier((prev: number) => prev / prevEquipPower);
      setAttackMultiplier((prev: number) => prev * equipped[equipType].scaled);
    } else if (equipType === "secondary") {
      setMagicMultiplier((prev: number) => prev / prevEquipPower);
      setMagicMultiplier((prev: number) => prev * equipped[equipType].scaled);
    } else {
      setGemMultiplier((prev: number) => prev / prevEquipPower);
      setGemMultiplier((prev: number) => prev * equipped[equipType].scaled);
    }
  };

  return (
    <div className="max-w-[300px]">
      <h3 className="mb-8 text-center font-bold ">Equipments</h3>
      <div className="flex gap-4">
        <div className="flex  flex-col gap-6 max-h-[600px]">
          {Object.keys(equipped).map((equip) => {
            const object = equipped[equip as EquipmentPieceName];

            return (
              <div
                key={equip + "1"}
                className="w-36 h-36 bg-zinc-200 shadow-md flex justify-between items-center flex-col py-2"
              >
                <h4 className="text-sm text-center p-2">
                  {object.name !== "none" ? `${object.name}` : "None"}
                </h4>
              </div>
            );
          })}
        </div>
        <div>
          <div className="flex flex-wrap text-xs font-semibold mb-4">
            {Object.keys(equipments).map((equipment) => {
              return (
                <div
                  key={equipment + "2"}
                  className={`py-2 px-4 bg-orange-200 ${
                    equipment === equipmentCategory ? "" : "bg-opacity-50"
                  }`}
                  onClick={() => setEquipmentCategory(equipment)}
                >
                  {equipment}
                </div>
              );
            })}
          </div>
          <div>
            <p className="text-xs mb-4">
              <strong>Effect:</strong>{" "}
              {equipmentsInfo[equipmentCategory as EquipmentPieceName]}
            </p>
            {Object.keys(ownedEquipments).map((equipment) => {
              const equipmentArray =
                ownedEquipments[equipment as EquipmentPieceName];

              return (
                <div
                  key={equipment + "3"}
                  className="text-sm flex flex-wrap gap-2 max-h-[400px] overflow-y-auto"
                >
                  {equipmentArray.map((equip, i) => (
                    <div
                      key={equip.name + "4"}
                      className={`h-32 w-32 text-center shadow-sm border-1 border-zinc-500 rounded-[8px] place-items-center flex justify-center items-center flex-col gap-4 ${
                        equipment === equipmentCategory ? "block" : "hidden"
                      } ${
                        equip.equipped === true ? "bg-green-300" : "bg-zinc-100"
                      }`}
                    >
                      <p>{equip.name}</p>
                      <p>Power: {equip.scaled.toFixed(2)}</p>
                      {!equip.equipped && (
                        <Button
                          variant={"link"}
                          className="text-green-600"
                          onClick={() =>
                            equipItem(equip, equipment as EquipmentPieceName)
                          }
                        >
                          Equip
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipment;
