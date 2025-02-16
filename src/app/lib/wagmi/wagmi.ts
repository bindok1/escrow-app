
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { createConfig, http } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';

const { connectors } = getDefaultWallets({
  appName: 'Escrow Web3',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string
});

export const wagmiConfig = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(process.env.NEXT_PUBLIC_BSC_TESTNET_RPC as string)
  },
  connectors,
  ssr: true
});