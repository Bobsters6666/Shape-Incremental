interface Artifact {
  description: string;
  level: number;
  power: number;
  scaling: number;
}

type ArtifactKey = "scorching disc";

const artifacts: Record<ArtifactKey, Artifact> = {
  "scorching disc": {
    description: "Permanently increase your attack",
    level: 0,
    power: 1,
    scaling: 1.32,
  },
};
