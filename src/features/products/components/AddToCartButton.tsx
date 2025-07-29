import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface AddToCartButtonProps {
  productId: string | number;
  onAddToCart?: (productId: string | number, quantity: number) => void;
  onRemoveFromCart?: (productId: string | number) => void;
  onUpdateQuantity?: (productId: string | number, quantity: number) => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
  const [cartCount, setCartCount] = useState(0);
  const isInCart = cartCount > 0;

  const handleAddToCart = () => {
    const newCount = 1;
    setCartCount(newCount);
  };

  const handleIncrement = () => {
    const newCount = cartCount + 1;
    setCartCount(newCount);
  };

  const handleDecrement = () => {
    const newCount = cartCount > 0 ? cartCount - 1 : 0;
    setCartCount(newCount);
  };

  return (
    <View>
      {!isInCart ? (
        <TouchableOpacity
          className="bg-zinc-950 rounded-lg items-center py-3 px-4 shadow-lg active:bg-green-700"
          onPress={handleAddToCart}
        >
          <Text className="text-sm text-white font-bold">Sepete Ekle</Text>
        </TouchableOpacity>
      ) : (
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            className="bg-red-500 rounded-md w-8 h-8 items-center justify-center active:bg-red-600"
            onPress={handleDecrement}
          >
            <Text className="text-white font-bold text-lg">-</Text>
          </TouchableOpacity>

          <View className="bg-white rounded-lg px-4 py-2 mx-3 min-w-[50px] items-center">
            <Text className="text-gray-900 font-bold text-base">
              {cartCount}
            </Text>
          </View>

          <TouchableOpacity
            className="bg-green-500 rounded-md w-8 h-8 items-center justify-center active:bg-green-600"
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
