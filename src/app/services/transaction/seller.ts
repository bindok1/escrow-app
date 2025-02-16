import { readContract, writeContract } from '@/app/contracts/contract';
import { parseEther } from 'viem';

interface DeliverProductParams {
  transactionId: number;
  proofImage: string;
}

interface WithdrawParams {
  amount: string;
}

export const sellerService = {
  deliverProduct: async ({
    transactionId,
    proofImage
  }: DeliverProductParams) => {
    return writeContract('deliverProduct', [transactionId, proofImage]);
  },

  withdraw: async ({ amount }: WithdrawParams) => {
    return writeContract('withdraw', [parseEther(amount)], {});
  },

  // Get seller's available balance
  getBalance: async (address: string): Promise<bigint> => {
    const balance = await readContract('balances', [address]);
    return balance as bigint;
  }
};

export type SellerService = typeof sellerService;