"use client";
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSellerTransaction } from "@/app/hooks/useSellerTransaction";
import DownloadCard from "@/app/components/shared/DownloadCard";
import { columns } from "@/app/components/react-table/TableBasicReact";
import { ViewState } from "../enum/enumTransaction";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { UITransaction, TransactionStatus } from "@/type/transaction";
import { TransactionTable } from "../components/TransactionTable";
import { StatusMessage } from "../components/StatusMessage";
import { useAccount } from "wagmi";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<UITransaction[]>([]);
  const { getSellerTransactions, deliverProduct, isLoading, error } = useSellerTransaction();
  const {isConnected, address} = useAccount();

  const handleDeliver = async (transactionId: number) => {
    try {
      await deliverProduct(transactionId, "proof-url");
      await loadTransactions();
    } catch (err) {
      console.error("Delivery failed:", err);
    }
  };

  const loadTransactions = async () => {
    try {
      const data = await getSellerTransactions();
      const enhancedData: UITransaction[] = data.map((tx, index) => ({
        ...tx,
        id: index + 1,
        status: tx.status as TransactionStatus,
        onDeliver: handleDeliver,
      }));
      setTransactions(enhancedData);
    } catch (err) {
      console.error("Failed to load transactions:", err);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      console.log('Loading transactions for:', address);
      loadTransactions();
    }
  }, [isConnected, address, error]);

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const getViewState = (): ViewState => {
    if (!isConnected) return ViewState.WALLET_DISCONNECTED;
    if (isLoading) return ViewState.LOADING;
    if (transactions.length === 0) return ViewState.EMPTY;
    return ViewState.DATA;
  };

  const renderContent = () => {
    const state = getViewState();
    return state === ViewState.DATA ? 
      <TransactionTable table={table} /> : 
      <StatusMessage state={state} />;
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Transactions
        </Typography>
        <DownloadCard title="Transaction History">
          {renderContent()}
        </DownloadCard>
      </Box>
    </Container>
  );
}
