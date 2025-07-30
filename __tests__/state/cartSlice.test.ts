import cartReducer, {
    addToCart,
    removeFromCart,
    clearCart,
  } from '../../src/features/cart/state/cartSlice';
import { mockProduct } from '../../src/mock/product';
  
  const initialState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  };
  

  describe('Sepet slice testi', () => {
    it('Ürünü sepete ekleme testi', () => {
      const action = addToCart(mockProduct);
      const result = cartReducer(initialState, action);
      
      expect(result.items).toHaveLength(1);
      expect(result.items[0].product.id).toBe(1);
      expect(result.items[0].quantity).toBe(1);
      expect(result.totalItems).toBe(1);
      expect(result.totalPrice).toBe(100);
    });
  
    it('Mevcut ürünün miktarını artırma testi', () => {
      const stateWithItem = {
        items: [{ id: 1, product: mockProduct, quantity: 1, totalPrice: 100 }],
        totalItems: 1,
        totalPrice: 100,
      };
      
              const action = addToCart(mockProduct);
      const result = cartReducer(stateWithItem, action);
      
      expect(result.items[0].quantity).toBe(2);
      expect(result.totalItems).toBe(2);
      expect(result.totalPrice).toBe(200);
    });
  
    it('Ürünü sepetten silme testi', () => {
      const stateWithItem = {
        items: [{ id: 1, product: mockProduct, quantity: 1, totalPrice: 100 }],
        totalItems: 1,
        totalPrice: 100,
      };
      
      const action = removeFromCart(1);
      const result = cartReducer(stateWithItem, action);
      
      expect(result.items).toHaveLength(0);
      expect(result.totalItems).toBe(0);
      expect(result.totalPrice).toBe(0);
    });
  
    it('Sepeti temizleme testi', () => {
      const stateWithItems = {
        items: [
          { id: 1, product: mockProduct, quantity: 2, totalPrice: 200 },
          { id: 2, product: { ...mockProduct, id: 2 }, quantity: 1, totalPrice: 100 },
        ],
        totalItems: 3,
        totalPrice: 300,
      };
      
      const action = clearCart();
      const result = cartReducer(stateWithItems, action);
      
      expect(result.items).toHaveLength(0);
      expect(result.totalItems).toBe(0);
      expect(result.totalPrice).toBe(0);
    });
  });