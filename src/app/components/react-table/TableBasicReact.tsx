import { createColumnHelper } from "@tanstack/react-table";
import { Typography, Chip, Button } from "@mui/material";
import { IconTruck } from "@tabler/icons-react";
import { UITransaction } from "@/type/transaction";




const columnHelper = createColumnHelper<UITransaction>();

export const columns = [
  columnHelper.accessor("id", {
    header: () => "ID",
    cell: (info) => (
      <Typography variant="body1">{info.getValue()}</Typography>
    ),
  }),
  columnHelper.accessor("productKey", {
    header: () => "Product",
    cell: (info) => (
      <Typography variant="body1">{info.getValue()}</Typography>
    ),
  }),
  columnHelper.accessor("buyer", {
    header: () => "Buyer",
    cell: (info) => (
      <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
        {`${info.getValue().slice(0, 6)}...${info.getValue().slice(-4)}`}
      </Typography>
    ),
  }),
  columnHelper.accessor("amount", {
    header: () => "Amount (BNB)",
    cell: (info) => (
      <Typography variant="body1">
        {Number(info.getValue()) / 1e18}
      </Typography>
    ),
  }),
  columnHelper.accessor("status", {
    header: () => "Status",
    cell: (info) => {
      const statusConfig = {
        0: { label: 'CREATED', color: 'warning' },
        1: { label: 'FUNDED', color: 'info' },
        2: { label: 'DELIVERED', color: 'info' },
        3: { label: 'COMPLETED', color: 'success' },
        4: { label: 'DISPUTED', color: 'error' }
      } as const;

      const status = statusConfig[info.getValue()];
      
      return (
        <Chip
          label={status.label}
          color={status.color}
          size="small"
        />
      );
    },
  }),
  columnHelper.accessor("id", {
    id: "actions",
    header: () => "Action",
    cell: (info) => {
      const status = info.row.original.status;
      const onDeliver = info.row.original.onDeliver;
      
      return status === 1 ? (
        <Button
          variant="contained"
          startIcon={<IconTruck />}
          onClick={() => onDeliver?.(info.getValue())}
          size="small"
        >
          Deliver
        </Button>
      ) : null;
    },
  }),
];