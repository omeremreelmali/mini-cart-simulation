import { useEffect, useState } from 'react';
import { Product } from '../model/product.types';
import { productService } from '../api/product.service';

interface UseProductDetailViewModel {
  product: Product | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useProductDetailViewModel = (productId: number): UseProductDetailViewModel => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const productData = await productService.getProductById(
        productId.toString(),
      );
      setProduct(productData);
    } catch (err) {
      setError('Ürün detayları yüklenirken bir hata oluştu');
      console.error('Product detail fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchProductDetail();
  };

  useEffect(() => {
    if (productId) {
      fetchProductDetail();
    }
  }, [productId]);

  return {
    product,
    loading,
    error,
    refetch,
  };
}; 