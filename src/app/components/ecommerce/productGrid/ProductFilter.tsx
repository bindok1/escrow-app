import React from 'react';
import { useDispatch, useSelector } from '@/store/hooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import {
  sortByProducts,
  sortByPrice,
  filterReset,
} from '@/store/apps/eCommerce/ECommerceSlice';
import {
  IconSortAscending2,
  IconSortDescending2,
  IconAd2,
} from '@tabler/icons-react';

const ProductFilter = () => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.ecommerceReducer.filters);
  const checkactive = useSelector((state) => state.ecommerceReducer.sortBy);
  const customizer = useSelector((state) => state.customizer);
  const br = `${customizer.borderRadius}px`;

  const filterbySort = [
    { id: 1, value: 'newest', label: 'Newest', icon: IconAd2 },
    { id: 2, value: 'priceDesc', label: 'Price: High-Low', icon: IconSortAscending2 },
    { id: 3, value: 'priceAsc', label: 'Price: Low-High', icon: IconSortDescending2 },
  ];

  const filterbyPrice = [
    {
      id: 0,
      label: 'All',
      value: 'All',
    },
    {
      id: 1,
      label: '0-50',
      value: '0-50',
    },
    {
      id: 3,
      label: '50-100',
      value: '50-100',
    },
    {
      id: 4,
      label: '100-200',
      value: '100-200',
    },
    {
      id: 5,
      label: 'Over 200',
      value: '200-99999',
    },
  ];

  const handlerPriceFilter = (value: React.ChangeEvent<HTMLInputElement>) => {
    if (value.target.checked) {
      dispatch(sortByPrice({ price: value.target.value }));
    }
  };

  return (
    <List>
      <Typography variant="subtitle2" fontWeight={600} px={3} mt={3} pb={2}>
        Sort By
      </Typography>
      {filterbySort.map((filter) => (
        <ListItemButton
          sx={{ mb: 1, mx: 3, borderRadius: br }}
          selected={checkactive === `${filter.value}`}
          onClick={() => dispatch(sortByProducts(`${filter.value}`))}
          key={filter.id + filter.label + filter.value}
        >
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <filter.icon stroke="1.5" size={19} />
          </ListItemIcon>
          <ListItemText>{filter.label}</ListItemText>
        </ListItemButton>
      ))}
      
      <Divider />
      
      <Typography variant="h6" px={3} mt={3} pb={2}>
        By Pricing
      </Typography>
      <Box p={3} pt={0}>
        <FormGroup>
          {filterbyPrice.map((price) => (
            <FormControlLabel
              key={price.label}
              control={
                <Radio
                  value={price.value}
                  checked={active.price === price.value}
                  onChange={handlerPriceFilter}
                />
              }
              label={price.label}
            />
          ))}
        </FormGroup>
      </Box>
      
      <Divider />
      
      <Box p={3}>
        <Button variant="contained" onClick={() => dispatch(filterReset())} fullWidth>
          Reset Filters
        </Button>
      </Box>
    </List>
  );
};

export default ProductFilter;
