'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from '@/store/hooks';
import { AppState } from '@/store/store';
import { useTransaction } from '@/app/hooks/useTransaction';
import PurchaseInvoice from '@/app/components/ecommerce/purchaseInvoice/PurchaseInvoice';
import PageContainer from '@/app/components/container/PageContainer';
import { Box, Typography } from '@mui/material';
import { fetchProducts } from '@/store/apps/eCommerce/ECommerceSlice';
import { useDispatch } from '@/store/hooks';


const PurchasePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { buyProduct, isLoading } = useTransaction();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  

  // Get product ID from transaction ID
  const productId = id?.toString().split('-').pop();

  const product = useSelector((state: AppState) => {
    
    return state.ecommerceReducer.products.find(p => {
      return p.id.toString() === productId;
    });
  });

  const handleConfirmPurchase = async () => {
    if (!product) return;
    try {
      const priceInBNB = parseFloat(product.price).toFixed(18);
      await buyProduct(product.seller_address, product.id, priceInBNB);
      router.push('/buyer-transactions');
    } catch (err) {
      console.error('Purchase failed:', err);
    }
  };

  
  if (!product) {
    return (
      <PageContainer title="Loading..." description="Please wait">
        <Box sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <Typography>Loading product details...</Typography>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Purchase Confirmation" description="Confirm your purchase">
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '24px'
      }}>
        <PurchaseInvoice
          onClose={() => router.back()}
          onConfirm={handleConfirmPurchase}
          product={product}
          isProcessing={isLoading}
        />
      </Box>
    </PageContainer>
  );
};

export default PurchasePage;