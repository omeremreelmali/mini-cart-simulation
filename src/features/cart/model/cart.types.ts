import { Product } from '../../products/model/product.types';

export interface CartItem {
  id: string | number;
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
} 