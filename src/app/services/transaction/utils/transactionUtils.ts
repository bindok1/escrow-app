import { TransactionStatus } from "@/type/transaction";
import { Transaction, TransactionArray } from "../types/transactionTypes";

//Seller Transaction Utils
export const validateTransactionId = (id: number): void => {
  if (!id || id <= 0) {
    throw new Error("Invalid transaction ID");
  }
};

export const MAX_TRANSACTION_DURATION = 10 * 24 * 60 * 60;

export const DISPUTE_TIMEOUT = 7 * 24 * 60 * 60;

export const isTransactionExpired = (tx: Transaction): boolean => {
  const currentTime = BigInt(Math.floor(Date.now() / 1000));
  return currentTime > tx.createdAt + BigInt(MAX_TRANSACTION_DURATION);
};

export const validateProofImage = (proof: string): void => {
  if (!proof?.trim()) {
    throw new Error("Proof image is required");
  }
};

export const mapToTransaction = (txArray: TransactionArray, id: number): Transaction => ({
  id,
  buyer: txArray[0],
  seller: txArray[1],
  amount: txArray[2],
  productKey: txArray[3],
  proofImage: txArray[4],
  status: txArray[5] as TransactionStatus,
  createdAt: txArray[6],
  disputeInitiatedAt: txArray[7],
});

export const isNotSelfTransaction = (buyer: string, seller: string): boolean => 
  buyer.toLowerCase() !== seller.toLowerCase();

export const isValidSellerTransaction = (tx: Transaction, sellerAddress: string): boolean => {
  const isExpired = isTransactionExpired(tx);
  const isSeller = tx.seller.toLowerCase() === sellerAddress.toLowerCase();
  const isValidStatus = tx.status === 1 || (isExpired && tx.status < 3);
  
  return isSeller && 
         isValidStatus && 
         isNotSelfTransaction(tx.buyer, tx.seller);
};
  

  // Buyer-specific validations
export const validateCreateTransaction = (
  sellerAddress: string, 
  buyerAddress: string, 
  amount: string
): void => {
  if (!sellerAddress || !amount) {
    throw new Error("Missing required parameters");
  }
  
  if (sellerAddress.toLowerCase() === buyerAddress.toLowerCase()) {
    throw new Error("Cannot create transaction with yourself as seller");
  }

  const amountValue = parseFloat(amount);
  if (isNaN(amountValue) || amountValue <= 0) {
    throw new Error("Invalid amount");
  }
};

export const validateConfirmReceipt = (
  tx: Transaction, 
  buyerAddress: string
): void => {
  if (isTransactionExpired(tx)) {
    throw new Error("Cannot confirm: Transaction has expired");
  }
  if (tx.buyer.toLowerCase() !== buyerAddress.toLowerCase()) {
    throw new Error("Unauthorized: Only buyer can confirm receipt");
  }
  
  if (tx.status !== 2) {
    throw new Error("Product must be delivered before confirmation");
  }
};

export const isValidBuyerTransaction = (
  tx: Transaction, 
  buyerAddress: string
): boolean => {
  const isBuyer = tx.buyer.toLowerCase() === buyerAddress.toLowerCase();
  const isNotSelf = tx.buyer.toLowerCase() !== tx.seller.toLowerCase();
  const hasValidStatus = tx.status > 0;
  const isNotExpired = !isTransactionExpired(tx);

  return isBuyer && isNotSelf && hasValidStatus && isNotExpired;
};