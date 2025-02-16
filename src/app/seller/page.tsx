"use client";
import { Box, Button, Container, Typography, Card, CardContent } from '@mui/material';
import CustomTextField from '../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../components/forms/theme-elements/CustomFormLabel';
import { useAccount } from 'wagmi';
import { useState, ChangeEvent } from 'react';
import { sellerService } from '../services/transaction/seller';
import { IconTruck } from '@tabler/icons-react';

export default function SellerPage() {
  const { address } = useAccount();
  const [balance, setBalance] = useState('0');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [proofImage, setProofImage] = useState('');

  const checkBalance = async () => {
    if (!address) return;
    const balance = await sellerService.getBalance(address);
    setBalance(balance.toString());
  };

  const handleWithdraw = async () => {
    try {
      await sellerService.withdraw({ amount: withdrawAmount });
      checkBalance();
      setWithdrawAmount('');
    } catch (error) {
      console.error('Withdraw failed:', error);
    }
  };

  const handleDeliverProduct = async () => {
    try {
      await sellerService.deliverProduct({
        transactionId: Number(transactionId),
        proofImage
      });
      setTransactionId('');
      setProofImage('');
    } catch (error) {
      console.error('Delivery failed:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Typography variant="h4" gutterBottom>
          Seller Dashboard
        </Typography>
        
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Balance</Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>{balance} BNB</Typography>
            <Button variant="contained" onClick={checkBalance}>
              Refresh Balance
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Withdraw Funds</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
              <Box>
                <CustomFormLabel htmlFor="amount">Amount</CustomFormLabel>
                <CustomTextField
                  id="amount"
                  label="Amount (BNB)"
                  type="number"
                  value={withdrawAmount}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setWithdrawAmount(e.target.value)}
                />
              </Box>
              <Button 
                variant="contained" 
                onClick={handleWithdraw}
                disabled={!withdrawAmount}
              >
                Withdraw
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Deliver Product</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <CustomFormLabel htmlFor="transactionId">Transaction ID</CustomFormLabel>
              <CustomTextField
                id="transactionId"
                type="number"
                value={transactionId}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTransactionId(e.target.value)}
              />
              <CustomFormLabel htmlFor="proofImage">Proof Image URL</CustomFormLabel>
              <CustomTextField
                id="proofImage"
                value={proofImage}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setProofImage(e.target.value)}
              />
              
              <Button 
                variant="contained" 
                startIcon={<IconTruck width={18} />}
                onClick={handleDeliverProduct}
                disabled={!transactionId || !proofImage}
              >
                Confirm Delivery
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}