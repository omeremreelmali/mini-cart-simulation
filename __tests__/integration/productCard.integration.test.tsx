import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import ProductCard from '../../src/features/products/components/ProductCard';
import cartSlice from '../../src/features/cart/state/cartSlice';
import { mockProduct } from '../../src/mock/product';

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

jest.mock('react-native-responsive-screen', () => ({
  widthPercentageToDP: (width: number) => width,
  heightPercentageToDP: (height: number) => height,
}));

const createTestStore = () => {
  return configureStore({
    reducer: {
      cart: cartSlice,
    },
  });
};

describe('ProductCard Entegrasyon Testi', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  it('Ürün kartı render edilmeli ve title görünmeli', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>,
    );

    expect(getByText(mockProduct.title)).toBeTruthy();
    expect(getByText(mockProduct.title)).toBeVisible();
  });

  it('Sepete ekleme butonu redux store güncellemeli', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>,
    );

    expect(store.getState().cart.items).toHaveLength(0);

    const addButton = getByText('Sepete Ekle');
    fireEvent.press(addButton);

    const state = store.getState();
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].product.id).toBe(mockProduct.id);
    expect(state.cart.totalItems).toBe(1);
    expect(state.cart.totalPrice).toBe(mockProduct.price);
  });

  it('Aynı ürün tekrar eklediğinde miktar artmalı', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>,
    );

    fireEvent.press(getByText('Sepete Ekle'));

    const plusButton = getByText('+');
    fireEvent.press(plusButton);

    const state = store.getState();
    expect(state.cart.items[0].quantity).toBe(2);
    expect(state.cart.totalItems).toBe(2);
    expect(state.cart.totalPrice).toBe(mockProduct.price * 2);
  });
});
