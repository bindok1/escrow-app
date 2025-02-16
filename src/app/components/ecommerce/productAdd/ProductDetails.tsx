"use client";
import React from "react";
import Box from "@mui/material/Box";
import { Autocomplete, Button, Grid, Typography } from "@mui/material";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import { IconPlus } from "@tabler/icons-react";

const new_category = [
  { label: "Digital Product" },
  { label: "Other" },
];

const new_tags = [
  { label: "New" },
  { label: "Digital Product" },
];

const ProductDetails = () => {
  return (
    <Box p={3}>
      <Typography variant="h5">Product Details</Typography>
      <Grid container mt={3}>
        {/* 1 */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="p_cat" sx={{ mt: 0 }}>
            Categories
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            fullWidth
            id="new-category"
            options={new_category}
            getOptionLabel={(option) => option.label}
            filterSelectedOptions
            renderInput={(params) => (
              <CustomTextField {...params} placeholder="Categories" />
            )}
          />

          {/* <CustomTextField id="p_cat" fullWidth /> */}
          <Typography sx={{mt:1}} variant="body2" mb={2}>
            Add product to a category.
          </Typography>
        </Grid>
        {/* <Grid item xs={12}>
          <Button variant="text" startIcon={<IconPlus size={18} />}>
            Create New Category
          </Button>
        </Grid> */}
        {/* 1 */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="p_tag">Tags</CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            fullWidth
            id="new-tags"
            options={new_tags}
            getOptionLabel={(option) => option.label}
            filterSelectedOptions
            renderInput={(params) => (
              <CustomTextField {...params} placeholder="Tags" />
            )}
          />
          {/* <CustomTextField id="p_tag" fullWidth /> */}
          <Typography sx={{mt:1}} variant="body2" mb={2}>
            Add product to a category.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
