import { writeContract } from '@/app/contracts/contract';
import { parseEther } from 'viem';

interface CreateTransactionParams {
  sellerAddress: string;
  productKey: string;
  amount: string;
}

interface ConfirmReceiveParams {
  transactionId: number;
}

export const buyerService = {
  createTransaction: async ({
    sellerAddress,
    productKey,
    amount
  }: CreateTransactionParams) => {
    return writeContract('createTransaction', 
      [sellerAddress, productKey], 
      { value: parseEther(amount) }
    );
  },
  
  confirmReceive: async ({
    transactionId
  }: ConfirmReceiveParams) => {
    return writeContract('confirmReceive', [transactionId]);
  }
};

export type BuyerService = typeof buyerService;