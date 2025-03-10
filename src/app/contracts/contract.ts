import { ethers } from "ethers";
import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { bsc } from 'viem/chains';
import DigitalEscrowABI from './escrow/DigitalEscrow.sol/DigitalEscrow.json';


const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

if (!CONTRACT_ADDRESS) {
  throw new Error('Contract address not found in environment variables');
}

export const publicClient = createPublicClient({
  chain: bsc,
  transport: http(process.env.NEXT_PUBLIC_BSC_MAINNET_RPC)
});

export const getWalletClient = () => {
  if (!window.ethereum) throw new Error('No wallet found');
  
  return createWalletClient({
    chain: bsc,
    transport: custom(window.ethereum)
  });
};

// Read operations
export const readContract = async (functionName: string, args: any[] = []) => {
  return publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: DigitalEscrowABI.abi,
    functionName,
    args
  });
};

// Write operations
export const writeContract = async (
  functionName: string, 
  args: any[] = [], 
  options: { value?: bigint } = {}
) => {
  const walletClient = await getWalletClient();
  const [account] = await walletClient.getAddresses();

  return walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi: DigitalEscrowABI.abi,
    functionName,
    args,
    account,
    ...options,
  });
};