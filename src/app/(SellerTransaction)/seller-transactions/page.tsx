"use client";

import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useSellerTransaction } from "@/app/hooks/useSellerTransaction";
import { TransactionStatus, UITransaction } from "@/type/transaction";
import { checkNetworkConnection } from "@/utils/networkCheck";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { ViewState } from "../enum/enumTransaction";
import { columns } from "@/app/components/react-table/TableSellerReact";
import DownloadCard from "@/app/components/shared/DownloadCard";
import { TransactionTable } from "../components/TransactionTable";
import { StatusMessage } from "../components/StatusMessage";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<UITransaction[]>([]);
  const { getSellerTransactions, deliverProduct, isLoading, error } = useSellerTransaction();
  const [networkError, setNetworkError] = useState<string | null>(null);
  const { isConnected, address } = useAccount();

  const handleDeliver = async (transactionId: number) => {
    try {
      const proofImage = "proof-url";
      await deliverProduct(transactionId, proofImage);
      await loadTransactions();
    } catch (err) {
      console.error("Delivery failed:", err);
    }
  };

  const loadTransactions = async () => {
    try {
      setNetworkError(null);
      await checkNetworkConnection();
      
      const contractTransactions = await getSellerTransactions();
      const enhancedTransactions: UITransaction[] = contractTransactions.map((transaction) => ({
        ...transaction,
        status: transaction.status as TransactionStatus,
        onDeliver: handleDeliver,
      }));
    
      setTransactions(enhancedTransactions);
    } catch (err) {
      console.error("Failed to load transactions:", err);
      setNetworkError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  useEffect(() => {
    if (isConnected && address) {
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