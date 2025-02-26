import { readContract, writeContract } from "@/app/contracts/contract";
import { parseEther } from "viem";
import { simulateContractCall } from "@/app/services/simulation/contractSimulation";
import {
  ConfirmReceiveParams,
  CreateTransactionParams,
  Transaction,
  TransactionArray,
} from "./types/transactionTypes";
import {
  isValidBuyerTransaction,
  mapToTransaction,
  validateConfirmReceipt,
  validateCreateTransaction,
  validateTransactionId,
} from "./utils/transactionUtils";

export const buyerService = {
  getTransactions: async (buyerAddress: string): Promise<Transaction[]> => {
    const count = (await readContract("transactionCount", [])) as number;
    const transactions: Transaction[] = [];

    for (let i = 1; i <= count; i++) {
      try {
        const txArray = (await readContract("transactions", [
          i,
        ])) as TransactionArray;
        const tx = mapToTransaction(txArray, i);

        if (isValidBuyerTransaction(tx, buyerAddress)) {
          transactions.push(tx);
        }
      } catch (err) {
        console.error(`Error at transaction ${i}:`, err);
        continue;
      }
    }

    return transactions;
  },

  createTransaction: async ({
    sellerAddress,
    productKey,
    amount,
  }: CreateTransactionParams) => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    validateCreateTransaction(sellerAddress, account, amount);
    return writeContract("createTransaction", [sellerAddress, productKey], {
      value: parseEther(amount),
    });
  },

  confirmReceive: async ({ transactionId }: ConfirmReceiveParams) => {
    validateTransactionId(transactionId);

    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const txArray = (await readContract("transactions", [
      transactionId,
    ])) as TransactionArray;
    const tx = mapToTransaction(txArray, transactionId);

    validateConfirmReceipt(tx, account);

    return writeContract("confirmReceive", [transactionId]);
  },
};

export type BuyerService = typeof buyerService;
