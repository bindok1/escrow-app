import React, { useEffect } from "react";
import { filter, orderBy } from "lodash";
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Fab from '@mui/material/Fab'
import Grid from '@mui/material/Grid'
import Rating from '@mui/material/Rating'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import Link from "next/link";
import { useSelector, useDispatch } from "@/store/hooks";
import {
  fetchProducts,
  addToCart,
  filterReset,
} from "@/store/apps/eCommerce/ECommerceSlice";
import ProductSearch from "./ProductSearch";
import { IconBasket, IconMenu2 } from "@tabler/icons-react";
import AlertCart from "../productCart/AlertCart";
import emptyCart from "/public/images/products/empty-shopping-cart.svg";


import Image from "next/image";
import BlankCard from "../../shared/BlankCard";
import { ProductType } from "@/app/(DashboardLayout)/types/apps/eCommerce";

interface Props {
  onClick: (event: React.SyntheticEvent | Event) => void;
}

const ProductList = ({ onClick }: Props) => {
  const dispatch = useDispatch();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const getVisibleProduct = (
    products: ProductType[],
    sortBy: string,
    filters: any,
    search: string
  ) => {
    // SORT BY
    if (sortBy === "newest") {
      products = orderBy(products, ["created_at"], ["desc"]); 
    }
    if (sortBy === "priceDesc") {
      products = orderBy(products, ["price"], ["desc"]);
    }
    if (sortBy === "priceAsc") {
      products = orderBy(products, ["price"], ["asc"]);
    }

    //FILTER PRODUCTS BY Search
    if (search !== "") {
      products = products.filter((_product) =>
        _product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
      );
    }

    //FILTER PRODUCTS BY Price
    if (filters.price !== "All") {
      const minMax = filters.price ? filters.price.split("-") : "";
      products = products.filter((_product) =>
        filters.price
          ? parseFloat(_product.price) >= parseFloat(minMax[0]) && 
            parseFloat(_product.price) <= parseFloat(minMax[1]) 
          : true
      );
    }

    return products;
  };

  const getProducts = useSelector((state) =>
    getVisibleProduct(
      state.ecommerceReducer.products,
      state.ecommerceReducer.sortBy,
      state.ecommerceReducer.filters,
      state.ecommerceReducer.productSearch
    )
  );

  // for alert when added something to cart
  const [cartalert, setCartalert] = React.useState(false);

  const handleClick = () => {
    setCartalert(true);
  };

  const handleClose = (reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setCartalert(false);
  };

  // skeleton
  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      {/* ------------------------------------------- */}
      {/* Header Detail page */}
      {/* ------------------------------------------- */}
      <Stack direction="row" justifyContent="space-between" pb={3}>
        {lgUp ? (
          <Typography variant="h5">Products</Typography>
        ) : (
          <Fab onClick={onClick} color="primary" size="small">
            <IconMenu2 width="16" />
          </Fab>
        )}
        <Box>
          <ProductSearch />
        </Box>
      </Stack>

      {/* ------------------------------------------- */}
      {/* Page Listing product */}
      {/* ------------------------------------------- */}
      <Grid container spacing={3}>
        {getProducts.length > 0 ? (
          <>
            {getProducts.map((product) => (
              <Grid
                item
                xs={12}
                lg={4}
                md={4}
                sm={6}
                display="flex"
                alignItems="stretch"
                key={product.id}
              >
                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    width={270}
                    height={300}
                    sx={{
                      borderRadius: (theme) => theme.shape.borderRadius / 5,
                    }}
                  />
                ) : (
                  <BlankCard className="hoverCard">
                    <Typography
                      component={Link}
                      href={`/ecommerce/detail/${product.id}`}
                    >
                      <Image 
                        src={product.image_url} 
                        alt={product.name}
                        width={250} 
                        height={268} 
                        style={{ width: "100%",objectFit: 'contain' }} 
                      />
                    </Typography>
                    <Tooltip title="Add To Cart">
                      <Fab
                        size="small"
                        color="primary"
                        onClick={() =>
                          dispatch(addToCart(product)) && handleClick()
                        }
                        sx={{
                          bottom: "75px",
                          right: "15px",
                          position: "absolute",
                        }}
                      >
                        <IconBasket size="16" />
                      </Fab>
                    </Tooltip>
                    <CardContent sx={{ p: 3, pt: 2 }}>
                      <Typography variant="h6">{product.name}</Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mt={1}
                      >
                        <Stack direction="row" alignItems="center">
                          <Typography variant="h6">${product.price}</Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </BlankCard>
                )}
                <AlertCart
                  handleClose={handleClose}
                  openCartAlert={cartalert}
                />
              </Grid>
            ))}
          </>
        ) : (
          <>
            <Grid item xs={12} lg={12} md={12} sm={12}>
              <Box textAlign="center" mt={6}>
                <Image src={emptyCart} alt="cart" width={200} />
                <Typography variant="h2">There is no Product</Typography>
                <Typography variant="h6" mb={3}>
                  The Product you are searching is no longer available.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => dispatch(filterReset())}
                >
                  Try Again
                </Button>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default ProductList;
