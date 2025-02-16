import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";

interface CustomAddressProps {
  sellerAddress: string;
  onAddressChange: (value: string) => void;
}

const CustomAddress = ({ sellerAddress, onAddressChange }: CustomAddressProps) => {
  return (
    <Box p={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="seller_address" sx={{ mt: 0 }}>
              Seller Address
              <Typography color="error.main" component="span">
                *
              </Typography>
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              id="seller_address"
              placeholder="Enter BSC wallet address"
              fullWidth
              value={sellerAddress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onAddressChange(e.target.value)}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Please enter a valid BSC wallet address for receiving payments.
            </Typography>
          </Grid>
        </Grid>
    </Box>
  );
};

export default CustomAddress;