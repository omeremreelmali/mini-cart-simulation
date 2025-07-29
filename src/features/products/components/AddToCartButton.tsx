import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Product } from '../model/product.types';
import { useCart } from '../../cart/hooks/useCart';

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addToCart, updateQuantity, removeFromCart, getQuantity, isInCart } =
    useCart();

  const quantity = getQuantity(product.id);
  const productInCart = isInCart(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity <= 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <View>
      {!productInCart ? (
        <TouchableOpacity
          className="bg-zinc-950 rounded-lg items-center py-3 px-4 shadow-lg active:bg-zinc-800"
          onPress={handleAddToCart}
        >
          <Text className="text-sm text-white font-bold">Sepete Ekle</Text>
        </TouchableOpacity>
      ) : (
        <View className="flex-row items-center justify-center">
          <TouchableOpacity
            className="bg-red-500 rounded-md w-8 h-8 items-center justify-center active:bg-red-600 mr-2"
            onPress={handleDecrement}
          >
            <Text className="text-white font-bold text-lg">-</Text>
          </TouchableOpacity>

          <View className="bg-white rounded-lg px-4 py-2 mx-3 min-w-[50px] items-center border border-gray-200">
            <Text className="text-gray-900 font-bold text-base">
              {quantity}
            </Text>
          </View>

          <TouchableOpacity
            className="bg-green-500 rounded-md w-8 h-8 items-center justify-center active:bg-green-600 ml-2"
            onPress={handleIncrement}
          >
            <Text className="text-white font-bold text-lg">+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddToCartButton;
