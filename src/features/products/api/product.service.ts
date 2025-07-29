import { httpClient } from '../../../services/httpClient';
import { API_ENDPOINTS } from '../../../config/endpoints';
import { Product, ProductsListResponse } from '../model/product.types';

export interface ProductsQueryParams {
  limit?: number;
  skip?: number;
}

class ProductService {
  async getProducts(params?: ProductsQueryParams): Promise<ProductsListResponse> {
    const url = API_ENDPOINTS.PRODUCTS.GET_PRODUCTS(params ? `limit=${params.limit}&skip=${params.skip}` : '');
    const response = await httpClient.get<ProductsListResponse>(url);
    console.log('response', response.data);
    return response.data;
  }

  async getProductById(id: string): Promise<Product> {
    const url = API_ENDPOINTS.PRODUCTS.GET_PRODUCT_BY_ID(id);
    const response = await httpClient.get<Product>(url);
    return response.data;
  }
}

export const productService = new ProductService();
export default ProductService; 