import { Alert, AlertTitle, Snackbar, Box, Fade } from '@mui/material';

interface AlertNotificationProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
  onClose: () => void;
  autoHideDuration?: number;
  showRefreshMessage?: boolean;
}

export const AlertNotification = ({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 4000,
  showRefreshMessage = false,
}: AlertNotificationProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={Fade}
    >
      <Alert
        variant="filled"
        severity={severity}
        onClose={onClose}
        sx={{
          width: "100%",
          minWidth: "300px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          "& .MuiAlert-icon": {
            fontSize: "24px"
          },
          "& .MuiAlert-message": {
            flex: 1
          }
        }}
      >
        <AlertTitle sx={{ fontSize: "1rem", fontWeight: 600, mb: 0.5 }}>
          {severity === "success" ? "Success" : "Error"}
        </AlertTitle>
        {message}
        {showRefreshMessage && severity === "success" && (
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            mt: 1,
            color: "rgba(255,255,255,0.9)",
            fontSize: "0.875rem",
            fontStyle: "italic"
          }}>
            <strong>Refreshing page...</strong>
          </Box>
        )}
      </Alert>
    </Snackbar>
  );
};