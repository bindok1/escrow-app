'use client'
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { IconPencil } from '@tabler/icons-react';
import ChildCard from '../../shared/ChildCard';
import { useSelector } from "@/store/hooks";
import { usePathname } from "next/navigation";
import { ProductType } from "@/app/(DashboardLayout)/types/apps/eCommerce";

interface ProductCardProps {
  like: number;
  star: number;
  value?: number;
}

interface TabProps {
  children: React.ReactNode;
  index: number;
  value?: number;
}

// progress
function ProgressBar({ like, star, value, ...others }: ProductCardProps) {
  return (
    <Box display={'flex'} alignItems="center" gap="20px">
      <Box sx={{ minWidth: 50 }}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(star)} Stars`}</Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
        <LinearProgress value={value} variant="determinate" color="primary" {...others} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="subtitle2">{`(${Math.round(like)})`}</Typography>
      </Box>
    </Box>
  );
}

const cleanHtmlContent = (html: string | undefined) => {
  if (!html) return '';
  return html.replace(/<\/?p>/g, '').replace(/&nbsp;/g, ' ');
};

const TabPanel = (props: TabProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const ProductDesc = () => {
  const [value, setValue] = React.useState(0);
  const pathName = usePathname();
  const getTitle = pathName.split('/').pop();

  // Get product data from Redux store
  const product: ProductType | undefined = useSelector(
    (state) => state.ecommerceReducer.products.find(
      (p: ProductType) => p.id.toString() === getTitle
    )
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ChildCard>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'grey.100' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="primary"
            allowScrollButtonsMobile
            scrollButtons
            indicatorColor="primary"
          >
            <Tab label="Description" {...a11yProps(0)} />
            {/* <Tab label="Reviews" {...a11yProps(1)} /> */}
          </Tabs>
        </Box>
        {/* Description Tab */}
        <TabPanel value={value} index={0}>
          <Typography variant="h5">
            {product?.name}
          </Typography>
          <Typography color="textSecondary" mt={4}>
            {cleanHtmlContent( product?.description)}
          </Typography>
          <Typography color="textSecondary" variant="body1" fontWeight={400} mt={4}>
            Seller: {product?.seller_address}
          </Typography>
        </TabPanel>
        {/* ------------------------------------------- */}
        {/* Reviews Tab */}
        {/* ------------------------------------------- */}
        {/* <TabPanel value={value} index={1}>
          <Grid container spacing={3}>
            {/* ------------------------------------------- */}
            {/* Average Rate Tab */}
            {/* ------------------------------------------- */}
            {/* <Grid item xs={12} lg={4}>
              <Paper variant="outlined" sx={{ height: '100%', p: 3 }}>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}
                  sx={{ height: '100%' }}
                > */}
                  {/* <Typography variant="subtitle1">Average Rating</Typography>
                  <Typography variant="h1" color="primary" fontWeight={600}>
                    4/5
                  </Typography>
                  <Rating name="rate" value={4} />
                </Stack>
              </Paper>
            </Grid> */}
            {/* ------------------------------------------- */}
            {/* Progrees Rate Tab */}
            {/* ------------------------------------------- */}
            {/* <Grid item xs={12} lg={4}>
              <Paper variant="outlined" sx={{ p: 3 }}>
                <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                  <Grid item xs={12}>
                    <ProgressBar star={1} value={45} like={485} />
                  </Grid>
                  <Grid item xs={12}>
                    <ProgressBar star={2} value={25} like={215} />
                  </Grid>
                  <Grid item xs={12}>
                    <ProgressBar star={3} value={20} like={110} />
                  </Grid> */}
                  {/* <Grid item xs={12}>
                    <ProgressBar star={4} value={80} like={620} />
                  </Grid>
                  <Grid item xs={12}>
                    <ProgressBar star={5} value={12} like={160} />
                  </Grid>
                </Grid>
              </Paper>
            </Grid> */}
            {/* ------------------------------------------- */}
            {/* Button */}
            {/* ------------------------------------------- */}
            {/* <Grid item xs={12} lg={4}>
              <Paper sx={{ height: '100%', p: 3 }} variant="outlined">
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}
                  sx={{ height: '100%' }}
                > */}
                  {/* <Button variant="outlined" size="large" startIcon={<IconPencil />}>
                    Write an Review */}
                  {/* </Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid> */}
        {/* </TabPanel> */} 
      </Box>
    </ChildCard>
  );
};

export default ProductDesc;
