import { companions } from "@/constants/companions";
import { nf } from "@/utils/utils";
import React from "react";

const Companions = ({ companionUpgrade }: any) => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-center text-lg font-bold">Companion</h3>
      {companions.map((companion) => (
        <button
          className="px-4 py-2 bg-orange-300 rounded-md hover:opacity-80"
          key={companion.name}
        >
          <strong>{companion.name}</strong> <br />
          Level: {nf(companion.level)} <br />
          Faces: {nf(companion.faces)} <br />
          Vertex: {nf(companion.vertex)}
        </button>
      ))}
    </div>
  );
};

export default Companions;
