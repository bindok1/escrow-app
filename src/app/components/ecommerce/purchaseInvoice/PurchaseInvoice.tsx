import React, { useState } from 'react';
import {
  Button,
  Typography,
  Box,
  Stack,
  Divider,
  Paper,
  Tooltip,
  IconButton,
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';

import Image from 'next/image';
import { ProductType } from '@/app/(DashboardLayout)/types/apps/eCommerce';

interface PurchaseInvoiceProps {
  onClose: () => void;
  onConfirm: () => void;
  product: ProductType | null;
  isProcessing: boolean;
}

const PurchaseInvoice = ({
  onClose,
  onConfirm,
  product,
  isProcessing
}: PurchaseInvoiceProps) => {
  const [copyTooltip, setCopyTooltip] = useState({
    address: 'Copy Address',
    contact: 'Copy Contact'
  });

  const handleCopy = async (text: string, type: 'address' | 'contact') => {
    await navigator.clipboard.writeText(text);
    setCopyTooltip(prev => ({
      ...prev,
      [type]: 'Copied!'
    }));
    setTimeout(() => {
      setCopyTooltip(prev => ({
        ...prev,
        [type]: type === 'address' ? 'Copy Address' : 'Copy Contact'
      }));
    }, 1500);
  };

  if (!product) return null;

  return (
    <Box sx={{ p: 3, maxWidth: '600px', mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Stack spacing={3}>
          <Typography variant="h4" align="center" gutterBottom>
            Purchase Invoice
          </Typography>

          <Box display="flex" justifyContent="center" p={2}>
            <Image
              src={product.image_url}
              alt={product.name}
              width={200}
              height={200}
              style={{ objectFit: "contain" }}
            />
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" color="primary" gutterBottom>
              Price: {product.price} BNB
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Seller Details
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" color="text.secondary" sx={{ 
                bgcolor: 'action.hover', 
                p: 1, 
                borderRadius: 1,
                flex: 1
              }}>
                Address: {product.seller_address}
              </Typography>
              <Tooltip title={copyTooltip.address}>
                <IconButton 
                  size="small"
                  onClick={() => handleCopy(product.seller_address, 'address')}
                >
                  <ContentCopy fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1} mt={1}>
              <Typography variant="body2" color="text.secondary" sx={{ 
                bgcolor: 'action.hover', 
                p: 1, 
                borderRadius: 1,
                flex: 1
              }}>
                Contact: {product.contact_info}
              </Typography>
              <Tooltip title={copyTooltip.contact}>
                <IconButton 
                  size="small"
                  onClick={() => handleCopy(product.contact_info, 'contact')}
                >
                  <ContentCopy fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

          <Box bgcolor="primary.light" p={2} borderRadius={1}>
            <Typography variant="subtitle1" color="primary.main" gutterBottom>
              Escrow Protection & Transaction Steps
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              • Your payment will be held securely in smart contract
              <br />
              • Full protection against fraud
            </Typography>
            
            <Typography variant="subtitle2" color="primary.dark" gutterBottom>
              Next Steps:
            </Typography>
            <Typography variant="body2">
              1. After payment, contact the seller using the provided information above
              <br />
              2. Discuss and agree on delivery/service details with the seller
              <br />
              3. Once agreement is reached, seller will initiate the service/delivery
              <br />
              4. Verify that you have received the product/service as agreed
              <br />
              5. Both parties can then release the funds from smart contract
              <br />
              6. Transaction complete - funds will be transferred to seller
            </Typography>
            
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
              Note: Funds are safely locked in smart contract until both parties confirm completion
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
            <Button 
              onClick={onClose} 
              variant="outlined" 
              color="secondary"
            >
              Cancel
            </Button>
            <Button 
              onClick={onConfirm} 
              variant="contained"
              disabled={isProcessing}
              sx={{ minWidth: 150 }}
            >
              {isProcessing ? "Processing..." : "Create Transaction"}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default PurchaseInvoice;