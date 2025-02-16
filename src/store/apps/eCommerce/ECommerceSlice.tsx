import axios from '../../../utils/axios';
import { filter, map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { supabase } from '@/app/lib/supabase/client';

const API_URL = '/api/data/eCommerce/ProductsData';

interface StateType {
  products: ProductType[];

  productSearch: string;
  sortBy: string;
  cart: ProductType[];

  total: number;
  filters: {
    category: string;
    color: string;
    gender: string;
    price: string;
    rating: string;
  };
  error: string;
}

interface ProductType {
  id: string;
  created_at: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
  seller_address: string;
}

const initialState: StateType = {
  products: [],
  productSearch: '',
  sortBy: 'newest',
  cart: [],
  total: 0,
  filters: {
    category: 'All',
    color: 'All',
    gender: 'All',
    price: 'All',
    rating: '',
  },
  error: '',
};

export const EcommerceSlice = createSlice({
  name: 'ecommerce',
  initialState,
  reducers: {
    hasError(state: StateType, action) {
      state.error = action.payload;
    },
    getProducts: (state, action: { payload: ProductType[] }) => {
      state.products = action.payload;
    },
    SearchProduct: (state, action) => {
      state.productSearch = action.payload;
    },
    addToCart(state: StateType, action: { payload: ProductType }) {
      const product = action.payload;
      state.cart = [...state.cart, product];
    },
    deleteCart(state: StateType, action) {
      const updateCart = filter(state.cart, (item) => item.id !== action.payload);
      state.cart = updateCart;
    },
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },
    sortByPrice(state, action) {
      state.filters.price = action.payload.price;
    },
    filterReset(state) {
      state.filters.category = 'All';
      state.filters.color = 'All';
      state.filters.gender = 'All';
      state.filters.price = 'All';
      state.sortBy = 'newest';
    }
  },
});

// Export actions
export const {
  hasError,
  getProducts,
  SearchProduct,
  addToCart,
  deleteCart,
  sortByPrice,
  sortByProducts,
  filterReset
} = EcommerceSlice.actions;

// Fetch products from Supabase
export const fetchProducts = () => async (dispatch: AppDispatch) => {
  try {
    const { data, error } = await supabase
      .from('coinrupiah')
      .select('*');
    
    if (error) throw error;
    dispatch(getProducts(data));
  } catch (error) {
    dispatch(hasError(error));
  }
};

export default EcommerceSlice.reducer;

