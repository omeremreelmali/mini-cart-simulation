import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../features/products/state/productSlice';
import cartSlice from '../features/cart/state/cartSlice';
import appSlice from './slices/appSlice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    products: productSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 