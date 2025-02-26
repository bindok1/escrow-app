import { TransactionStatus } from "@/type/transaction";

export interface DeliverProductParams {
  transactionId: number;
  proofImage: string;
}

export interface WithdrawParams {
  amount: string;
}

export interface Transaction {
  id: number;
  buyer: string;
  seller: string;
  amount: bigint;
  productKey: string;
  proofImage: string;
  status: TransactionStatus;
  createdAt: bigint;
  disputeInitiatedAt: bigint;
}

//for buyer
export interface CreateTransactionParams {
  sellerAddress: string;
  productKey: string;
  amount: string;
}

export interface ConfirmReceiveParams {
  transactionId: number;
}

export type TransactionArray = [string, string, bigint, string, string, number, bigint, bigint];