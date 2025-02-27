"use client";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { Box, Container, Typography } from "@mui/material";
import HpHeader from "@/shared/header/HpHeader";
import { wagmiConfig } from "@/app/lib/wagmi/wagmi";
import { bscTestnet } from "viem/chains";
import Banner from "./(HomePage)/components/Banner";

const queryClient = new QueryClient();

export default function HomePage() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={bscTestnet}>
          <HpHeader />
          
            <Banner />

        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
