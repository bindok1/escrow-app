import { ColumnDef } from "@tanstack/react-table";
import { UITransaction, TransactionState } from "@/type/transaction";

export const getBuyerColumns = (handleConfirmReceipt: (id: number) => Promise<void>): ColumnDef<UITransaction>[] => [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "productKey", header: "Product" },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "status", header: "Status" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      row.original.status === TransactionState.DELIVERED && (
        <button onClick={() => handleConfirmReceipt(row.original.id)}>
          Confirm Receipt
        </button>
      )
    ),
  },
];