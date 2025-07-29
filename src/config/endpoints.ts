export const BASE_URL = 'https://dummyjson.com';

export const API_ENDPOINTS = {
  PRODUCTS: {
    GET_PRODUCTS: (params?: string) => `/products${params ? `?${params}` : ''}`,
    GET_PRODUCT_BY_ID: (id: string) => `/products/${id}`,
  },
};
