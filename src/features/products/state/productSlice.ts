import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../model/product.types';
import { productService, ProductsQueryParams } from '../api/product.service';

export interface ProductState {
  products: Product[];
  product: Product | null;
  productsLoading: boolean;
  productsError: string | null;
  productLoading: boolean;
  productError: string | null;
  pagination: {
    total: number;
    skip: number;
    limit: number;
  };
}

const initialState: ProductState = {
  products: [],
  product: null,
  productsLoading: false,
  productsError: null,
  productLoading: false,
  productError: null,
  pagination: {
    total: 0,
    skip: 1,
    limit: 20,
  },
};

// Async Thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: ProductsQueryParams, { rejectWithValue }) => {
    try {
      const response = await productService.getProducts(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await productService.getProductById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch product');
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProduct: state => {
      state.product = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.productsLoading = true;
        state.productsError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsLoading = false;
        if (action.payload.skip > 1) {
          state.products = [...state.products, ...action.payload.products];
        } else {
          state.products = action.payload.products;
        }
        state.pagination = {
          total: action.payload.total,
          skip: action.payload.skip,
          limit: action.payload.limit,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsLoading = false;
        state.productsError = action.payload as string;
      })
      .addCase(fetchProductById.pending, state => {
        state.productLoading = true;
        state.productError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = action.payload as string;
      });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
