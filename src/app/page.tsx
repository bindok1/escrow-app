"use client";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { Box, Container, Typography } from "@mui/material";
import HpHeader from "@/shared/header/HpHeader";
import { wagmiConfig } from "@/app/lib/wagmi/wagmi";
import { bsc } from "viem/chains";
import Banner from "./(HomePage)/homepage/Banner";


import UseCases from "./(HomePage)/homepage/UseCases";
import FaqAccordion from "./(HomePage)/homepage/FaqAccordion";

import "@rainbow-me/rainbowkit/styles.css";
import DonateBox from "./(HomePage)/homepage/DonateBox";
import HowItWorks from "./(HomePage)/homepage/HowItWorks";
import WhyChooseUs from "./(HomePage)/homepage/WhyChooseUs";

const queryClient = new QueryClient();

export default function HomePage() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={bsc}>
          <HpHeader />
          
            <Banner />
            <Box 
              sx={{
                height: {
                  xs: 100,  
                  sm: 300,  
                  md: 500,
                }
              }}
            />
            <HowItWorks />
            <WhyChooseUs />
            <UseCases />
            <FaqAccordion />
            <DonateBox />

        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
