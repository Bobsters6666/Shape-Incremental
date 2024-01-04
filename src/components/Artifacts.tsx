import { artifacts, newArtifact } from "@/constants/artifacts";
import { nf } from "@/utils/utils";
import React from "react";
import { Artifact } from "@/constants/artifacts";

type ArtifactKey = keyof typeof artifacts;

const Artifacts = ({
  angel,
  setAngel,
  setAttackMultiplier,
  setMagicMultiplier,
  setGoldMultiplier,
}: any) => {
  const artifactUpgrade = (artifact: string) => {
    const matchedArtifact = artifacts[artifact as ArtifactKey];

    if (angel >= matchedArtifact.cost) {
      matchedArtifact.level++;

      grantArtifactBonus(artifact, matchedArtifact);

      setAngel(angel - matchedArtifact.cost);
      matchedArtifact.cost =
        matchedArtifact.costScaling ** matchedArtifact.level;
    }
  };

  const unlockArtifact = () => {
    if (angel >= newArtifact.cost) {
      const lockedArtifacts = Object.keys(artifacts).filter(
        (artifact) => artifacts[artifact as ArtifactKey].unlocked === false
      );
      const index = Math.floor(Math.random() * lockedArtifacts.length);
      const key = lockedArtifacts[index] as ArtifactKey;

      const artifactUnlocked = artifacts[key];
      artifactUnlocked.unlocked = true;

      grantArtifactBonus(key, artifactUnlocked);

      setAngel(angel - newArtifact.cost);
      newArtifact.number++;
      newArtifact.cost = newArtifact.scaling ** newArtifact.number;
    }
  };

  const grantArtifactBonus = (key: string, artifact: Artifact) => {
    if (key === "scorching disc") {
      setAttackMultiplier(artifact.scaling ** artifact.level);
    } else if (key === "forgotten wand") {
      setMagicMultiplier(artifact.scaling ** artifact.level);
    } else if (key === "musa's hand") {
      setGoldMultiplier(artifact.scaling ** artifact.level);
    }
  };

  const unlockedArtifacts = Object.keys(artifacts).filter(
    (artifact) => artifacts[artifact as ArtifactKey].unlocked === true
  );

  return (
    <div className="flex flex-col gap-6 max-h-[600px] overflow-y-auto pr-4">
      <h3 className="text-center font-semibold">Angels: {nf(angel)}</h3>
      <div
        className={`px-4 py-2 bg-orange-500 text-white rounded-md hover:opacity-80 max-w-[300px] text-center`}
      >
        <button onClick={() => unlockArtifact()}>
          <p>
            <strong>Unlock new Artifact</strong>
          </p>
          <p>Cost: {nf(newArtifact.cost)}</p>
        </button>
      </div>
      {unlockedArtifacts.map((artifact) => {
        const key = artifacts[artifact as ArtifactKey];
        return (
          <div
            className={`px-4 py-2 bg-orange-300 rounded-md hover:opacity-80 max-w-[300px] text-center`}
            key={artifact}
          >
            <button onClick={() => artifactUpgrade(artifact)}>
              <p>
                <strong>{artifact}</strong>
              </p>
              <p>Level: {nf(key.level)}</p>
              <p>Cost: {nf(key.cost)}</p>
              <p>Power: {(key.scaling ** key.level).toFixed(2)}</p>
              <p className="text-wrap">{key.description}</p>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Artifacts;
