import { TransactionStatus } from "@/type/transaction";
import { Transaction, TransactionArray } from "../types/transactionTypes";


export const validateTransactionId = (id: number): void => {
  if (!id || id <= 0) {
    throw new Error("Invalid transaction ID");
  }
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

export const isValidSellerTransaction = (tx: Transaction, sellerAddress: string): boolean => 
  tx.seller.toLowerCase() === sellerAddress.toLowerCase() && 
  tx.status === 1 && 
  !tx.proofImage &&
  tx.buyer.toLowerCase() !== sellerAddress.toLowerCase();