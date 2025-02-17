import * as React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface Props {
  handleClose: (event: React.SyntheticEvent | any) => void;
  openCartAlert: boolean;
  severity? : 'success' | 'error' | 'warning' | 'info';
  message?: string;
}

const AlertCart = ({ handleClose, openCartAlert, severity='success', message = 'Transactoin initiated!' }: Props) => {
  return (
    <React.Fragment>
      <Snackbar
        open={openCartAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert severity={severity} variant="filled" sx={{ width: '100%', color: 'white' }}>
          {message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default AlertCart;
