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

export type TransactionArray = [string, string, bigint, string, string, number, bigint, bigint];