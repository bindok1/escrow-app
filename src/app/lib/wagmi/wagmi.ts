
import { connectorsForWallets, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { createConfig, http } from 'wagmi';
import { bsc } from 'wagmi/chains';
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
  chains: [bsc],
  transports: {
    [bsc.id]: http('https://bsc-dataseed.defibit.io')
  },
  connectors,
  ssr: true
});