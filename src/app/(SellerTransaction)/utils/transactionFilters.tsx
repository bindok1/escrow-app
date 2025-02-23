import { ContractTransaction, TransactionState } from "@/type/transaction";

export const filterSellerTransactions = (
  transactions: ContractTransaction[],
  sellerAddress?: string
) => {
  if (!sellerAddress) return [];
  
  return transactions.filter(tx => {
    const isSeller = tx.seller.toLowerCase() === sellerAddress.toLowerCase();
    const notSelfTransaction = tx.seller.toLowerCase() !== tx.buyer.toLowerCase();
    
    return isSeller && notSelfTransaction;
  });
};