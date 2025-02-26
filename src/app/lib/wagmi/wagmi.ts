
import { connectorsForWallets, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { createConfig, http } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';
import {
  metaMaskWallet,
  phantomWallet,
} from '@rainbow-me/rainbowkit/wallets';


const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;


const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
     wallets: [
      ({ projectId }) => metaMaskWallet({ projectId, }),
      () => phantomWallet()
    ]
  }
], {
  projectId,
  appName: 'Escrow Web3',
  appDescription: 'Escrow Web3 Application',
});

export const wagmiConfig = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(process.env.NEXT_PUBLIC_BSC_TESTNET_RPC as string)
  },
  connectors,
  ssr: true
});