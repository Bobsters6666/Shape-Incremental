"use client";

import { SessionProvider } from "next-auth/react";

type props = {
  children?: React.ReactNode;
};

export const AuthProviders = ({ children }: props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
