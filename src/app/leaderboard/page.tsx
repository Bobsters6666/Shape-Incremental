import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { DataTable } from "@/app/leaderboard/DataTable";
import { Leaderboard, columns } from "./columns";

export default async function Leaderboard() {
  const session = await getServerSession(authOptions);
  const users = await prisma.user.findMany();

  const filteredUsers = users.map(({ name, avatar, stage, prestige }) => ({
    name,
    avatar,
    stage,
    prestige,
  }));

  console.log(filteredUsers);

  return (
    <div className="max-w-[1080px] mx-auto">
      {session ? (
        <div>
          <h3 className="text-2xl font-bold my-16 text-center">
            Community Leaderboard
          </h3>
          {users && (
            <div>
              <DataTable columns={columns} data={filteredUsers} />
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>Log in to access community leaderboard</p>
          <Link href="/api/auth/signin">Log in</Link>
        </div>
      )}
    </div>
  );
}
