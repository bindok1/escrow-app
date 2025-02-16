'use client'
import "@rainbow-me/rainbowkit/styles.css";
import { WalletProvider } from "@/app/lib/wallet_provider/WalletProvider";
import HpHeader from "@/shared/header/HpHeader";
import Box from "@mui/material/Box";

export default function DetailLayout({
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
