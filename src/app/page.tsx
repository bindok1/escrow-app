"use client";
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import { Box, Container, Typography } from '@mui/material';
import HpHeader from '@/shared/header/HpHeader';
import { wagmiConfig } from '@/app/lib/wagmi/wagmi';
import { bscTestnet } from 'viem/chains';

const queryClient = new QueryClient();

export default function HomePage() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={bscTestnet}>
          <HpHeader />
          <Container maxWidth="lg">
            <Box sx={{
                  minHeight: '100vh',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3}}>
              <Typography variant="h3" component="h1" gutterBottom>
                Escrow Web3
              </Typography>
            </Box>
          </Container>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}