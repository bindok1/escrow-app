"use client";
import "@rainbow-me/rainbowkit/styles.css";
import HpHeader from "@/shared/header/HpHeader";
import { WalletProvider } from "@/app/lib/wallet_provider/WalletProvider";
import { Box } from "@mui/material";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WalletProvider>
      <HpHeader />
      <Box sx={{p:3}}>
      {children}
    </Box>
    </WalletProvider>
  );
}
