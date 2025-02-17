import { useState } from "react";
import { sellerService } from "@/app/services/transaction/seller";
import { useAccount } from "wagmi";

export const useSellerTransaction = () => {
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

  const getSellerTransactions = async () => {
    if (!checkWallet()) return [];
    
    setIsLoading(true);
    try {
        const transactions = await sellerService.getTransactions(address!);
        return transactions; 
    } catch (err) {
      const message = handleError(err);
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deliverProduct = async (transactionId: number, proofImage: string) => {
    if (!checkWallet()) return;
    
    setIsLoading(true);
    try {
      return await sellerService.deliverProduct({ transactionId, proofImage });
    } catch (err) {
      const message = handleError(err);
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { getSellerTransactions, deliverProduct, isLoading, error };
};