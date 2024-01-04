import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { DataTable } from "@/app/leaderboard/DataTable";
import { Leaderboard, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export default async function Leaderboard() {
  const session = await getServerSession(authOptions);
  const users = await prisma.user.findMany();

  const filteredUsers = users.map(({ name, stage, prestige }) => ({
    name,
    stage,
    prestige,
  }));

  if (session) {
    const user = await prisma.user.update({
      where: {
        email: session.user?.email!,
      },
      data: {
        stage: parseFloat(getCookie("stage", { cookies })!),
        prestige: parseFloat(getCookie("prestige", { cookies })!),
      },
    });
  }

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
          <Button variant={"link"} className="mt-4">
            <Link href="/">Back</Link>
          </Button>
        </div>
      ) : (
        <div>
          <p>Log in to access community leaderboard</p>
          <Button>
            <Link href="/api/auth/signin">Log in</Link>
          </Button>
          <Button variant={"link"}>
            <Link href="/">Back</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
