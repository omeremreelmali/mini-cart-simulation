import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchProducts } from '../state/productSlice';

export const useProductListViewModel = () => {
  const dispatch = useAppDispatch();
  
  const { 
    products, 
    productsLoading, 
    productsError, 
    pagination 
  } = useAppSelector(state => state.products);

  const loadProducts = (limit: number = 20, skip: number = 1) => {
    dispatch(fetchProducts({ limit, skip }));
  };

  const refreshProducts = () => {
    dispatch(fetchProducts({ limit: pagination.limit, skip: 1 }));
  };

  const loadMoreProducts = () => {
    if (products.length < pagination.total) {
      dispatch(fetchProducts({ 
        limit: pagination.limit, 
        skip: products.length 
      }));
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loading: productsLoading,
    error: productsError,
    pagination,
    loadProducts,
    refreshProducts,
    loadMoreProducts,
    hasMore: products.length < pagination.total
  };
}; 