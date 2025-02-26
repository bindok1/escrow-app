import { readContract, writeContract } from "@/app/contracts/contract";
import { parseEther} from "viem";
import { DeliverProductParams, Transaction, TransactionArray, WithdrawParams } from "./types/transactionTypes";
import { validateTransactionId, validateProofImage, mapToTransaction, isValidSellerTransaction } from "./utils/transactionUtils";


export const sellerService = {
  deliverProduct: async ({ transactionId, proofImage }: DeliverProductParams) => {
    validateTransactionId(transactionId);
    validateProofImage(proofImage);

    try {
      const txArray = (await readContract("transactions", [transactionId])) as TransactionArray;
      const currentStatus = txArray[5];

      if (currentStatus !== 1) {
        throw new Error(`Cannot deliver: Invalid status (current=${currentStatus}, required=${1})`);
      }

      return writeContract("deliverProduct", [transactionId, proofImage]);
    } catch (err) {
      throw err;
    }
  },

  withdraw: async ({ amount }: WithdrawParams) => {
    return writeContract("withdraw", [parseEther(amount)], {});
  },

  getBalance: async (address: string): Promise<bigint> => {
    return readContract("balances", [address]) as Promise<bigint>;
  },

  getTransactions: async (address: string): Promise<Transaction[]> => {
    try {
      const count = (await readContract("transactionCount", [])) as number;
      const transactions: Transaction[] = [];

      for (let i = 1; i <= count; i++) {
        const txArray = (await readContract("transactions", [i])) as TransactionArray;
        
        if (txArray?.length >= 8) {
          const transaction = mapToTransaction(txArray, i);
          
          if (isValidSellerTransaction(transaction, address)) {
            transactions.push(transaction);
          }
        }
      }

      return transactions;
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      return [];
    }
  }
};

export type SellerService = typeof sellerService;