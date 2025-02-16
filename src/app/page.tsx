"use client";
import { getDefaultWallets, RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';
import '@rainbow-me/rainbowkit/styles.css';
import { Box, Container, Typography } from '@mui/material';
import HpHeader from '@/shared/header/HpHeader';

const queryClient = new QueryClient();

const { connectors } = getDefaultWallets({
  appName: 'Escrow Web3',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string
});

const config = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http()
  },
  connectors,
  ssr: true
});

export default function HomePage() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
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
              <ConnectButton />
            </Box>
          </Container>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}