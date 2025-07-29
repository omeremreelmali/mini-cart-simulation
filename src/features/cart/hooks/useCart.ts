import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { 
  addToCart as addToCartAction, 
  removeFromCart as removeFromCartAction, 
  updateQuantity as updateQuantityAction, 
  clearCart as clearCartAction,
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice
} from '../state/cartSlice';
import { Product } from '../../products/model/product.types';

export const useCart = () => {
  const dispatch = useAppDispatch();

  const items = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectCartTotalItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const addToCart = (product: Product) => {
    dispatch(addToCartAction(product));
  };

  const removeFromCart = (productId: string | number) => {
    dispatch(removeFromCartAction(productId));
  };

  const updateQuantity = (productId: string | number, quantity: number) => {
    dispatch(updateQuantityAction({ id: productId, quantity }));
  };

  const clearCart = () => {
    dispatch(clearCartAction());
  };


  const isInCart = (productId: string | number) => {
    const item = items.find(item => item.id === productId);
    return !!item;
  };

  const getQuantity = (productId: string | number) => {
    const item = items.find(item => item.id === productId);
    return item?.quantity || 0;
  };

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getQuantity,
  };
}; 