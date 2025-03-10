export type TransactionStatus = 0 | 1 | 2 | 3 | 4;

export enum TransactionState {
    CREATED = 0,
    FUNDED = 1,
    DELIVERED = 2,
    COMPLETED = 3,
    DISPUTED = 4
}

export const isValidTransactionStatus = (status: number): status is TransactionStatus => {
    return status >= 0 && status <= 4;
};

export const getStatusLabel = (status: TransactionStatus): string => {
    return TransactionState[status];
};

export interface ContractTransaction {
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

export interface UITransaction extends ContractTransaction {
    onDeliver?: (id: number) => Promise<void>;
    onConfirmReceipt?: (id: number) => Promise<void>;
}

export const TransactionStatusConfig = {
    0: { label: 'CREATED', color: 'warning' },
    1: { label: 'FUNDED', color: 'info' },
    2: { label: 'DELIVERED', color: 'info' },
    3: { label: 'COMPLETED', color: 'success' },
    4: { label: 'DISPUTED', color: 'error' }
} as const;