"use client";

import { Box } from "@mui/material";
import "@rainbow-me/rainbowkit/styles.css";
import { WalletProvider } from "@/app/lib/wallet_provider/WalletProvider";
import HpHeader from "@/shared/header/HpHeader";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WalletProvider>
      <HpHeader />
      <Box sx={{ p: 3 }}>{children}</Box>
    </WalletProvider>
  );
}
