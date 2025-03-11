import { useState } from "react";
import { buyerService } from "@/app/services/transaction/buyer";
import { useAccount } from "wagmi";
import { ContractTransaction } from "@/type/transaction";

export const useBuyerTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address, isConnected } = useAccount();

  const handleError = (err: unknown) =>
    err instanceof Error ? err.message : "Operation failed";

  const checkWallet = () => {
    if (!isConnected || !address) {
      setError("Please connect your wallet first");
      return false;
    }
    return true;
  };

  const getBuyerTransactions = async () => {
    if (!checkWallet()) return [];

    setIsLoading(true);
    try {
      const transactions = await buyerService.getTransactions(address!);
      return transactions as ContractTransaction[];
    } catch (err) {
      const message = handleError(err);
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const confirmReceipt = async (transactionId: number) => {
    if (!checkWallet()) return;

    setIsLoading(true);
    try {
     
      const hash = await buyerService.confirmReceive({
        transactionId,
      });

      return hash;
    } catch (err) {
      const message = handleError(err);
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { getBuyerTransactions, confirmReceipt, isLoading, error };
};
