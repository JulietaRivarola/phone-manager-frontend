import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductDetail {
  price: number;
  color: string;
}

interface Product {
  name: string;
  model: string;
  brand: string;
  data: ProductDetail[];
}

interface ProductsState {
  items: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
      state.isLoading = false;
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    logoutRequest(state) {
      state.items = [];
      state.error = null;
      state.isLoading = false;
    }
  }
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  logoutRequest
} = productSlice.actions;

export default productSlice.reducer;
