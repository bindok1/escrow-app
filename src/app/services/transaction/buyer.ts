import { readContract, writeContract } from "@/app/contracts/contract";
import { parseEther } from "viem";
import { simulateContractCall } from "@/app/services/simulation/contractSimulation";

interface CreateTransactionParams {
  sellerAddress: string;
  productKey: string;
  amount: string;
}

interface ConfirmReceiveParams {
  transactionId: number;
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

export const buyerService = {
  getTransactions: async (buyerAddress: string): Promise<Transaction[]> => {
    const count = (await readContract("transactionCount", [])) as number;
    const transactions: Transaction[] = [];

    for (let i = 1; i <= count; i++) {
      try {
        const txArray = (await readContract("transactions", [i])) as any[];

        if (txArray && txArray.length >= 8) {
          const tx: Transaction = {
            buyer: txArray[0],
            seller: txArray[1],
            amount: txArray[2],
            productKey: txArray[3],
            proofImage: txArray[4],
            status: txArray[5],
            createdAt: txArray[6],
            disputeInitiatedAt: txArray[7],
          };

          if (
            tx.buyer.toLowerCase() === buyerAddress.toLowerCase() &&
            tx.buyer.toLowerCase() !== tx.seller.toLowerCase() &&
            tx.status > 0
          ) {
            transactions.push(tx);
          }
        }
      } catch (err) {
        continue;
      }
    }

    return transactions;
  },



  //Create Transaction
  createTransaction: async ({
    sellerAddress,
    productKey,
    amount,
  }: CreateTransactionParams) => {
    try {
      // Get current address
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Validate inputs
      if (!sellerAddress || !productKey || !amount) {
        throw new Error("Missing required parameters");
      }

      // Prevent self-transaction
      if (sellerAddress.toLowerCase() === account.toLowerCase()) {
        throw new Error("Cannot create transaction with yourself as seller");
      }

      // Validate amount
      const amountValue = parseFloat(amount);
      if (isNaN(amountValue) || amountValue <= 0) {
        throw new Error("Invalid amount");
      }

      console.log('Creating transaction:', {
        buyer: account,
        seller: sellerAddress,
        amount: amount,
        productKey
      });

      // Simulate transaction first
      await simulateContractCall(
        'createTransaction',
        [sellerAddress, productKey],
        {
          account: account as `0x${string}`,
          value: parseEther(amount)
        }
      );

      // If simulation successful, proceed with actual transaction
      return writeContract(
        "createTransaction", 
        [sellerAddress, productKey], 
        { value: parseEther(amount) }
      );
    } catch (error) {
      console.error("Create transaction failed:", error);
      throw error;
    }
  },

  confirmReceive: async ({ transactionId }: ConfirmReceiveParams) => {
    try {
      if (typeof transactionId !== "number") {
        throw new Error("Invalid transaction ID");
      }
      const txArray = (await readContract("transactions", [
        transactionId,
      ])) as any[];
      const buyer = txArray[0];
      const status = txArray[5];

      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Confirm validation:", {
        transactionId,
        buyer,
        currentAddress: account,
        status,
      });
      if (buyer.toLowerCase() !== account.toLowerCase()) {
        throw new Error("Unauthorized: Only buyer can confirm receipt");
      }
      if (status !== 2) {
        throw new Error("Product must be delivered before confirmation");
      }

      const hash = await writeContract("confirmReceive", [transactionId]);

      return hash;
    } catch (error) {
      throw error;
    }
  },
};

export type BuyerService = typeof buyerService;
