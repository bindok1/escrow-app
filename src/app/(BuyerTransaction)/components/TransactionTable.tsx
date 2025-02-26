import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { flexRender } from "@tanstack/react-table";
import type { Table as TableType } from "@tanstack/react-table";
import { UITransaction } from "@/type/transaction";

interface TransactionTableProps {
  table: TableType<UITransaction>;
}

export function TransactionTable({ table }: TransactionTableProps) {
  return (
    <TableContainer>
      <Table sx={{ whiteSpace: "nowrap" }}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}