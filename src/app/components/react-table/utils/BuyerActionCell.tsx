import { Button, Chip } from "@mui/material";
import { IconCheck } from "@tabler/icons-react";
import { UITransaction, TransactionState } from "@/type/transaction";
import { isTransactionExpired } from "@/app/services/transaction/utils/transactionUtils";

export const BuyerActionCell = ({ transaction }: { transaction: UITransaction }) => {
  const { status, id, onConfirmReceipt } = transaction;
  if (isTransactionExpired(transaction)) {
    return <Chip label="Transaction Expired" color="error" size="small" />;
  }

  switch (status) {
    case TransactionState.CREATED:
      return <Chip label="Processing Payment" color="warning" size="small" />;
    case TransactionState.FUNDED:
      return <Chip label="Waiting Delivery / Timeout" color="info" size="small" />;
    case TransactionState.DELIVERED:
      return (
        <Button
          variant="contained"
          startIcon={<IconCheck />}
          onClick={() => onConfirmReceipt?.(id)}
          size="small"
        >
          Confirm Receipt
        </Button>
      );
    case TransactionState.COMPLETED:
      return <Chip label="Transaction Complete" color="success" size="small" />;
    case TransactionState.DISPUTED:
      return <Chip label="In Dispute" color="error" size="small" />;
    default:
      return null;
  }
};