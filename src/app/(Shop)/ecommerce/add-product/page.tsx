"use client";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";

import GeneralCard from "@/app/components/ecommerce/productAdd/GeneralCard";
import MediaCard from "@/app/components/ecommerce/productAdd/Media";
import PricingCard from "@/app/components/ecommerce/productAdd/Pricing";
import BlankCard from "@/app/components/shared/BlankCard";
import { useState } from "react";
import { useAccount } from "wagmi";
import { supabase } from "@/app/lib/supabase/client";
import CustomAddress from "@/app/components/ecommerce/productAdd/CustomAddress";
import { uploadImage } from "@/app/lib/utils/imageUploadt";
import ContactInfo from "@/app/components/ecommerce/productAdd/ContactInfo";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Add Product",
  },
];

const EcommerceAddProduct = () => {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    seller_address: "",
    contact_info: "",
  });

  const handleImageUpload = (file: File) => {
    setLoading(true);
    uploadImage(file)
      .then((url) => setProduct({ ...product, image_url: url }))
      .catch((err) => {
        console.error(err);
        alert("Error uploading image");
      })
      .finally(() => setLoading(false));
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  // Update handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation checks
    const validationErrors = {
      wallet: !address && "Please connect your wallet first",
      fields:
        (!product.name || !product.price || !product.seller_address) &&
        "Please fill all the required fields",
    };

    const error = validationErrors.wallet || validationErrors.fields;
    if (error) {
      setAlertMessage(error);
      setSeverity("error");
      setShowAlert(true);
      return;
    }

    setLoading(true);
    try {
      const { error: supabaseError } = await supabase
        .from("coinrupiah")
        .insert([
          { ...product, seller_address: product.seller_address || address },
        ])
        .select();

      const isSuccess = !supabaseError;
      setAlertMessage(
        isSuccess ? "Product added successfully!" : "Failed to add product"
      );
      setSeverity(isSuccess ? "success" : "error");
      setShowAlert(true);

      if (isSuccess) {
        setTimeout(() => window.location.reload(), 4000);
      }
    } catch (err) {
      setAlertMessage("Failed to add product");
      setSeverity("error");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Add Product" description="this is Add Product">
      <Snackbar
        open={showAlert}
        autoHideDuration={4000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          variant="filled"
          severity={severity}
          onClose={() => setShowAlert(false)}
          sx={{ width: "100%" }}
        >
          <AlertTitle>
            {severity === "success" ? "Success" : "Error"}
          </AlertTitle>
          {alertMessage}
          {severity === "success" && <strong> — Refreshing page...</strong>}
        </Alert>
      </Snackbar>
      <>
        {showAlert ? (
          <Alert variant="filled" severity={severity} sx={{ mb: 2 }}>
            <AlertTitle>
              {severity === "success" ? "Success" : "Error"}
            </AlertTitle>
            {alertMessage}
            {severity === "success" && <strong> — Refreshing page...</strong>}
          </Alert>
        ) : null}
      </>

      {/* breadcrumb */}
      <Breadcrumb title="Add Product" items={BCrumb} />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item lg={8}>
            <Stack spacing={3}>
              <BlankCard>
                <GeneralCard
                  productName={product.name}
                  description={product.description}
                  onNameChange={(value) =>
                    setProduct({ ...product, name: value })
                  }
                  onDescriptionChange={(value) =>
                    setProduct({ ...product, description: value })
                  }
                />
              </BlankCard>

              <BlankCard>
                <MediaCard
                  imageUrl={product.image_url}
                  onImageUpload={handleImageUpload}
                />
              </BlankCard>

              <BlankCard>
                <PricingCard
                  price={product.price}
                  onPriceChange={(value) =>
                    setProduct({ ...product, price: value })
                  }
                />
              </BlankCard>

              <BlankCard>
                <CustomAddress
                  sellerAddress={product.seller_address}
                  onAddressChange={(value) =>
                    setProduct({ ...product, seller_address: value })
                  }
                />
              </BlankCard>

              <BlankCard>
                <ContactInfo
                  contactInfo={product.contact_info}
                  onContactInfoChange={(value) =>
                    setProduct({ ...product, contact_info: value })
                  }
                />
              </BlankCard>
            </Stack>
          </Grid>

          <Grid item lg={4}>
            <Stack spacing={3}>
              <BlankCard>
                <Box p={3}>
                  <Typography variant="h6" gutterBottom>
                    Welcome to CoinRupiah Marketplace
                  </Typography>
                  <Typography color="textSecondary" sx={{ mt: 2 }}>
                    Your trusted platform for secure crypto transactions. List
                    your products and reach buyers across Indonesia.
                  </Typography>
                  <Typography sx={{ pt: 8 }} variant="body2">
                    Remember to: • Provide accurate product details • Set
                    reasonable prices • Include clear images • Keep your wallet
                    connected
                  </Typography>
                </Box>
              </BlankCard>

              {/* <BlankCard>
                <StatusCard />
              </BlankCard> */}

              {/* <BlankCard>
                <ProductDetails />
              </BlankCard> */}

              {/* <BlankCard>
                <ProductTemplate />
              </BlankCard> */}
            </Stack>
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} mt={3}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Add Product"}
          </Button>
          <Button type="button" variant="outlined" color="error">
            Cancel
          </Button>
        </Stack>
      </form>
    </PageContainer>
  );
};

export default EcommerceAddProduct;
