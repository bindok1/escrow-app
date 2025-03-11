'use client'
import React from 'react';
import { Box, Container, Stack, Typography, Paper } from '@mui/material';
import Image from 'next/image';

const DonateBox = () => {
  return (
    <Container maxWidth="lg">
      <Stack spacing={3} alignItems="center" py={8}>
        <Typography variant="h3" textAlign="center" fontWeight={600}>
          Buy me a coffee ☕
        </Typography>
        <Typography color="text.secondary" textAlign="center" maxWidth={600}>
          If you find this service helpful, consider buying me a coffee. Any donation is appreciated!
        </Typography>
        
        <Paper 
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            border: '1px solid rgba(0, 116, 186, 0.1)',
            backgroundColor: 'rgb(245 247 255)',
            width: { xs: '100%', sm: '400px' },
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box
            sx={{
              width: '300px',
              height: '300px',
              backgroundColor: '#f5f5f5',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              mb: 2
            }}
          >
            {/* Place for QR Code Image */}
            <Image
              src="/images/qr/donation-qr.jpeg"
              alt="Donation QR Code"
              fill
              style={{ objectFit: 'contain' }}
              quality={100}
            />
          </Box>
          <Typography variant="caption" color="text.secondary">
            Scan to donate with any amount
          </Typography>
        </Paper>
      </Stack>
    </Container>
  );
};

export default DonateBox;