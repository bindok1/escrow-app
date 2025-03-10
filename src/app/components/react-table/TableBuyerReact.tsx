import { createColumnHelper } from "@tanstack/react-table";
import {  Chip, Button } from "@mui/material";
import { IconCheck } from "@tabler/icons-react";
import { UITransaction } from "@/type/transaction";
import { TextCell } from "./utils/TextCell";
import { STATUS_CONFIG } from "./utils/statusConfig";
import { AddressCell } from "./utils/AddressCell";
import { BuyerActionCell } from "./utils/BuyerActionCell";

const columnHelper = createColumnHelper<UITransaction>();

export const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => <TextCell value={info.getValue()} />,
  }),
  columnHelper.accessor("productKey", {
    header: "Product",
    cell: (info) => <TextCell value={info.getValue()} />,
  }),
  columnHelper.accessor("seller", {
    header: "Seller",
    cell: (info) => <AddressCell address={info.getValue()} />,
  }),
  columnHelper.accessor("amount", {
    header: "Amount (BNB)",
    cell: (info) => <TextCell value={Number(info.getValue()) / 1e18} />,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = STATUS_CONFIG[info.getValue()];
      return <Chip label={status.label} color={status.color} size="small" />;
    },
  }),
  columnHelper.accessor("id", {
    id: "actions",
    header: "Action",
    cell: (info) => <BuyerActionCell transaction={info.row.original} />,
}),
  columnHelper.accessor("createdAt", {
    header: "Date",
    cell: (info) => (
      <TextCell 
        value={new Date(Number(info.getValue()) * 1000).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      />
    ),
  }),
];