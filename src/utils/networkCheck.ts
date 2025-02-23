import { readContract } from '@/app/contracts/contract';

export const checkNetworkConnection = async () => {
  try {
   
    await readContract("transactionCount", []);
    return true;
  } catch (error: any) {
    if (error?.message?.includes('522') || 
        error?.message?.includes('network') ||
        error?.message?.includes('connection')) {
      throw new Error('BSC Testnet is currently experiencing issues. Please try again later.');
    }
    throw error;
  }
};