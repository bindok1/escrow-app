import { useState } from "react";
import { buyerService } from "@/app/services/transaction/buyer";
import { useAccount } from "wagmi";

export const useTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isConnected } = useAccount();

  const buyProduct = async (
    sellerAddress: string,
    productKey: string,
    amount: string
  ) => {
    if (!isConnected) {
      setError("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const tx = await buyerService.createTransaction({
        sellerAddress,
        productKey,
        amount,
      });
      return tx;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transaction failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    buyProduct,
    isLoading,
    error,
  };
};
