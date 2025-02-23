import { Button, Chip } from "@mui/material";
import { IconTruck } from "@tabler/icons-react";
import { useAccount } from "wagmi";
import { UITransaction, TransactionState } from "@/type/transaction";

export const ActionCell = ({ transaction }: { transaction: UITransaction }) => {
  const { status, seller, proofImage, id, onDeliver } = transaction;
  const { address } = useAccount();

  const canDeliver = 
    status === TransactionState.FUNDED &&
    onDeliver &&
    seller.toLowerCase() === address?.toLowerCase() &&
    !proofImage;

  switch (status) {
    case TransactionState.CREATED:
      return <Chip label="Waiting for Payment" color="warning" size="small" />;
    case TransactionState.FUNDED:
      return canDeliver ? (
        <Button
          variant="contained"
          startIcon={<IconTruck />}
          onClick={() => onDeliver(id)}
          size="small"
        >
          Deliver
        </Button>
      ) : null;
    case TransactionState.DELIVERED:
      return <Chip label="Waiting Confirmation" color="info" size="small" />;
    case TransactionState.COMPLETED:
      return <Chip label="Transaction Complete" color="success" size="small" />;
    case TransactionState.DISPUTED:
      return <Chip label="In Dispute" color="error" size="small" />;
    default:
      return null;
  }
};