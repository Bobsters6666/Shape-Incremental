"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Leaderboard = {
  name: string;
  avatar: string;
  stage: number;
  prestige: number;
};

export const columns: ColumnDef<Leaderboard>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "stage",
    header: "Stage",
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
  },
  {
    accessorKey: "prestige",
    header: "Prestige",
  },
];
