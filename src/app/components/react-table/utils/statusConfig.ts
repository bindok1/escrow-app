import { TransactionState } from "@/type/transaction";

export const STATUS_CONFIG = {
  [TransactionState.CREATED]: { label: "CREATED", color: "warning" as const },
  [TransactionState.FUNDED]: { label: "FUNDED", color: "info" as const },
  [TransactionState.DELIVERED]: { label: "DELIVERED", color: "info" as const },
  [TransactionState.COMPLETED]: { label: "COMPLETED", color: "success" as const },
  [TransactionState.DISPUTED]: { label: "DISPUTED", color: "error" as const },
} as const;