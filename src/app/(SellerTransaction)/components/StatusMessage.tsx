import { Box, Typography, CircularProgress } from "@mui/material";
import { ViewState } from "../enum/enumTransaction";


interface StatusMessageProps {
  state: ViewState;
}

export function StatusMessage({ state }: StatusMessageProps) {
  const messages = {
    [ViewState.LOADING]: <CircularProgress />,
    [ViewState.EMPTY]: <Typography color="text.secondary">No transactions found</Typography>,
    [ViewState.WALLET_DISCONNECTED]: (
      <Typography color="text.secondary">Please connect your wallet first</Typography>
    ),
    [ViewState.DATA]: null,
  };

  return (
    <Box display="flex" justifyContent="center" p={3}>
      {messages[state]}
    </Box>
  );
}