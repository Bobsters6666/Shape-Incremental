import { prisma } from "@/lib/prisma";
import { AuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("No profile");
      }

      await prisma.user.upsert({
        where: {
          email: profile.email,
        },
        create: {
          email: profile.email,
          name: profile.name!,
          stage: 0,
          prestige: 0,
          attack: 0,
          magic: 0,
          gold: 0,
          crystal: 0,
          angel: 0,
          achievementPoints: 0,
          critChance: 5,
          critDamage: 120,
          goldMultiplier: 1,
          attackMultiplier: 1,
          magicMultiplier: 1,
          maxEnemyNumber: 10,
        },
        update: {
          name: profile.name,
        },
      });

      return true;
    },

    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }

      return token;
    },
  },
};
