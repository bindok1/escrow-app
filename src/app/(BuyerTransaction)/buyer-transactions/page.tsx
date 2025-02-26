"use client";
import { Box, Container, Typography } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useAccount } from "wagmi";
import { useBuyerTransaction } from "@/app/hooks/useBuyerTransaction";
import { StatusMessage } from "../components/StatusMessage";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { UITransaction, TransactionStatus, ContractTransaction } from "@/type/transaction";
import { ViewState } from "../enum/enumBuyerTransaction";
import { useViewState } from "../hooks/useViewState";
import DownloadCard from "@/app/components/shared/DownloadCard";
import { TransactionTable } from "../components/TransactionTable";
import { columns } from "@/app/components/react-table/TableBuyerReact";
import { checkNetworkConnection } from "@/utils/networkCheck";
import { AlertNotification } from "@/app/components/alert-notif/AlertNotification";

export default function BuyerTransactions() {
  const [transactions, setTransactions] = useState<UITransaction[]>([]);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const { getBuyerTransactions, confirmReceipt, isLoading } = useBuyerTransaction();
  const { address, isConnected } = useAccount();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const loadTransactions = useCallback(async (): Promise<void> => {
    if (!address) return;
    
    try {
      setNetworkError(null);
      await checkNetworkConnection();
      
      const data = await getBuyerTransactions() as ContractTransaction[];
      const enhancedData: UITransaction[] = data.map((tx: ContractTransaction) => ({
        ...tx,
        status: tx.status as TransactionStatus,
        onConfirmReceipt: handleConfirmReceipt,
      }));
      
      setTransactions(enhancedData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load transactions";
      setNetworkError(errorMessage);
    }
  }, [address, getBuyerTransactions]);

  const handleConfirmReceipt = useCallback(async (transactionId: number): Promise<void> => {
    try {
      await confirmReceipt(transactionId);
      const data = await getBuyerTransactions() as ContractTransaction[];
      const enhancedData: UITransaction[] = data.map((tx: ContractTransaction) => ({
        ...tx,
        status: tx.status as TransactionStatus,
        onConfirmReceipt: handleConfirmReceipt,
      }));
      setTransactions(enhancedData);
      setAlertMessage("Product delivered successfully!");
      setSeverity("success");
      setShowAlert(true);
      setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to confirm receipt";
      throw new Error(errorMessage);
    }
  }, [confirmReceipt, getBuyerTransactions]);

  useEffect(() => {
    if (isConnected && address) {
      loadTransactions();
    }
  }, [isConnected, address]);

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
        <AlertNotification
        open={showAlert}
        message={alertMessage}
        severity={severity}
        onClose={() => setShowAlert(false)}
        showRefreshMessage={severity === "success"}
      />
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