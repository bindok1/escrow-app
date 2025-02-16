"use client";
import "@rainbow-me/rainbowkit/styles.css";
import HpHeader from "@/shared/header/HpHeader";
import { WalletProvider } from "../lib/wallet_provider/WalletProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WalletProvider>
      <HpHeader />
      {children}
    </WalletProvider>
  );
}
