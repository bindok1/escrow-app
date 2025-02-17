import { readContract, writeContract } from "@/app/contracts/contract";
import { parseEther } from "viem";

interface DeliverProductParams {
  transactionId: number;
  proofImage: string;
}

interface WithdrawParams {
  amount: string;
}

interface Transaction {
  buyer: string;
  seller: string;
  amount: bigint;
  productKey: string;
  proofImage: string;
  status: number;
  createdAt: bigint;
  disputeInitiatedAt: bigint;
}

export const sellerService = {
  deliverProduct: async ({
    transactionId,
    proofImage,
  }: DeliverProductParams) => {
    return writeContract("deliverProduct", [transactionId, proofImage]);
  },

  withdraw: async ({ amount }: WithdrawParams) => {
    return writeContract("withdraw", [parseEther(amount)], {});
  },

  // Get seller's available balance
  getBalance: async (address: string): Promise<bigint> => {
    const balance = await readContract("balances", [address]);
    return balance as bigint;
  },
  getTransactions: async (address: string): Promise<Transaction[]> => {
    const count = (await readContract("transactionCount", [])) as number;
    const transactions: Transaction[] = [];

    for (let i = 1; i <= count; i++) {
      try {
        const txArray = (await readContract("transactions", [i])) as any[];

        if (txArray && txArray.length >= 8) {
          const tx: Transaction = {
            seller: txArray[0],
            buyer: txArray[1],
            amount: txArray[2],
            productKey: txArray[3],
            proofImage: txArray[4],
            status: txArray[5],
            createdAt: txArray[6],
            disputeInitiatedAt: txArray[7],
          };

          if (tx.seller.toLowerCase() === address.toLowerCase()) {
            transactions.push(tx);
          }
        }
      } catch (err) {
        continue;
      }
    }

    return transactions;
  },
};

export type SellerService = typeof sellerService;
