import { ContractTransaction, TransactionState } from "@/type/transaction";

import { isNotSelfTransaction } from "@/app/services/transaction/utils/transactionUtils";

export const filterSellerTransactions = (
  transactions: ContractTransaction[],
  sellerAddress?: string
) => {
  if (!sellerAddress) return [];
  
  return transactions.filter(tx => {
    const isSeller = tx.seller.toLowerCase() === sellerAddress.toLowerCase();
    return isSeller && isNotSelfTransaction(tx.buyer, tx.seller);
  });
};