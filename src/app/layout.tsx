import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { AuthProviders } from "@/providers/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Incremental Game",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: // session,
{
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProviders>
        <body className={inter.className}>{children}</body>
      </AuthProviders>
    </html>
  );
}
