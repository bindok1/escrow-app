import { publicClient } from "@/app/contracts/contract";
import DigitalEscrowABI from '@/app/contracts/escrow/DigitalEscrow.sol/DigitalEscrow.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

// Add balance check utility
export const checkTransactionFeasibility = async (
  account: string,
  value: bigint,
  estimatedGas: bigint = BigInt(200000)
) => {
  try {
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [account, "latest"],
    });

    const balanceWei = BigInt(balance);
    const gasPrice = BigInt(1000000000); 
    const totalNeeded = value + (estimatedGas * gasPrice);

    console.log('Transaction feasibility check:', {
      balance: balanceWei,
      value,
      gasCost: estimatedGas * gasPrice,
      totalNeeded,
      hasEnough: balanceWei >= totalNeeded
    });

    if (balanceWei < totalNeeded) {
      throw new Error(`Insufficient balance. Need ${totalNeeded}, have ${balanceWei}`);
    }

    return true;
  } catch (error) {
    console.error('Balance check failed:', error);
    throw error;
  }
};

export const simulateContractCall = async (
  functionName: string,
  args: any[],
  options: { 
    account?: string,
    value?: bigint 
  } = {}
) => {
  try {
    const formattedAccount = typeof options.account === 'string' 
      ? options.account as `0x${string}`
      : options.account;

    // Check balance if value transfer involved
    if (options.value && options.value > 0 && formattedAccount) {
      await checkTransactionFeasibility(formattedAccount, options.value);
    }

    const result = await publicClient.simulateContract({
      address: CONTRACT_ADDRESS,
      abi: DigitalEscrowABI.abi,
      functionName,
      args,
      account: formattedAccount,
      value: options.value
    });

    console.log(`Simulation success for ${functionName}:`, {
      args,
      result
    });

    return true;
  } catch (error: any) {
    console.error(`Simulation failed for ${functionName}:`, {
      args,
      error: error.message,
      shortError: error.shortMessage
    });
    
    throw new Error(`Transaction would fail: ${error.shortMessage || error.message}`);
  }
};