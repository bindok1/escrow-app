"use client";
import { Box, Container, Typography } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useAccount } from "wagmi";
import { useBuyerTransaction } from "@/app/hooks/useBuyerTransaction";

import { StatusMessage } from "../components/StatusMessage";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { UITransaction, TransactionStatus, ContractTransaction, TransactionState } from "@/type/transaction";
import { ViewState } from "../enum/enumBuyerTransaction";
import { useViewState } from "../hooks/useViewState";
import DownloadCard from "@/app/components/shared/DownloadCard";
import { TransactionTable } from "../components/TransactionTable";
import { columns } from "@/app/components/react-table/TableBuyerReact";
import { checkNetworkConnection } from "@/utils/networkCheck";

export default function BuyerTransactions() {
  const [transactions, setTransactions] = useState<UITransaction[]>([]);
  const [ networkError, setNetworkError] = useState <string | null>(null);
  const { getBuyerTransactions, confirmReceipt, isLoading } = useBuyerTransaction();
  const { address, isConnected } = useAccount();

  const handleConfirmReceipt = useCallback(async (transactionId: number): Promise<void> => {
    try {
      await confirmReceipt(transactionId);
      await loadTransactions();
    } catch (err) {
      console.error("Confirmation failed:", err instanceof Error ? err.message : String(err));
    }
  }, [confirmReceipt]); 

  const loadTransactions = useCallback(async (): Promise<void> => {
    if (!address) return;
    try {
        setNetworkError(null);
      console.log('Checking network connection...');
      await checkNetworkConnection();
      console.log('Network connection OK');
      
      const data = await getBuyerTransactions() as ContractTransaction[] ;
      console.log('Raw Data:', data)
      const enhancedData: UITransaction[] = data.map((tx: ContractTransaction, index: number) => ({
        ...tx,
        id: index + 1,
        status: tx.status as TransactionStatus,
        onConfirmReceipt: handleConfirmReceipt,
      }));
      console.log('Enhanced transactions:', enhancedData);
      setTransactions(enhancedData);
    } catch (err) {
      console.error("Failed to load transactions:", err instanceof Error ? err.message : String(err));
    }
  }, [getBuyerTransactions, handleConfirmReceipt]);

  useEffect(() => {
    if (isConnected && address) {
      loadTransactions();
    }
  }, [isConnected, address,]); 

  const table = useReactTable({
    data: transactions,
    columns, 
    getCoreRowModel: getCoreRowModel(),
  });

  const viewState = useViewState({
    isConnected,
    isLoading,
    dataLength: transactions.length
  });

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Purchases
        </Typography>
        <DownloadCard title="Purchase History">
          {viewState === ViewState.DATA ? (
            <TransactionTable table={table} />
          ) : (
            <StatusMessage state={viewState} />
          )}
        </DownloadCard>
      </Box>
    </Container>
  );
}