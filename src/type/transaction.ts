export type TransactionStatus = 0 | 1 | 2 | 3 | 4;

export interface ContractTransaction {
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
    id: number;
    onDeliver?: (id: number) => Promise<void>;
}

export const TransactionStatusConfig = {
    0: { label: 'CREATED', color: 'warning' },
    1: { label: 'FUNDED', color: 'info' },
    2: { label: 'DELIVERED', color: 'info' },
    3: { label: 'COMPLETED', color: 'success' },
    4: { label: 'DISPUTED', color: 'error' }
} as const;