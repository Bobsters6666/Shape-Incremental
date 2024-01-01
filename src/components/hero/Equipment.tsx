import { equipments, equipped, ownedEquipments } from "@/constants/equipment";
import React, { useState } from "react";
import { Button } from "../ui/button";

type EquippedKey = keyof typeof equipped;
type EquipmentKey = keyof typeof equipments;

const Equipment = () => {
  const [equipmentCategory, setEquipmentCategory] = useState("head");

  const unequip = (equip: string) => {
    equipped[equip as EquippedKey].name = "none";
  };

  return (
    <div className="max-w-[300px]">
      <h3 className="mb-8 text-center font-bold ">Equipments</h3>
      <div className="flex gap-4">
        <div className="flex  flex-col gap-6 max-h-[600px]">
          {Object.keys(equipped).map((equip) => {
            const object = equipped[equip as EquippedKey];

            return (
              <div
                key={equip}
                className="w-36 h-36 bg-zinc-200 shadow-md flex justify-between items-center flex-col py-2"
              >
                <h4 className="text-sm text-center p-2">
                  {object.name !== "none" ? `${object.name}` : "None"}
                </h4>
                {object.name !== "none" && (
                  <Button
                    variant={"link"}
                    className="text-red-600"
                    onClick={() => unequip(equip)}
                  >
                    Unequip
                  </Button>
                )}
              </div>
            );
          })}
        </div>
        <div>
          <div className="flex flex-wrap text-xs font-semibold mb-4">
            {Object.keys(equipments).map((equipment) => {
              return (
                <div
                  key={equipment}
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
            {Object.keys(ownedEquipments).map((equipment) => {
              const equipmentArray = ownedEquipments[equipment as EquipmentKey];

              return (
                <div key={equipment} className="text-xs flex flex-wrap gap-2">
                  {equipmentArray.map((equip, i) => (
                    <div
                      key={equip.name}
                      className={`h-16 w-16 text-center shadow-sm border-1 border-zinc-500 rounded-[8px] grid place-items-center ${
                        equipment === equipmentCategory ? "block" : "hidden"
                      } ${
                        equip.equipped === true ? "bg-green-300" : "bg-zinc-100"
                      }`}
                    >
                      <p>{equip.name}</p>
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
