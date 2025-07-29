import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { CartItem as CartItemType } from '../model/cart.types';
import { renderStars } from '../../../utils/renderStars';

interface CartItemProps {
  item: CartItemType;
  onIncrement: (productId: string | number, currentQuantity: number) => void;
  onDecrement: (productId: string | number, currentQuantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrement,
  onDecrement,
}) => {
  return (
    <View className="bg-white rounded-lg mb-3 p-4 shadow-sm">
      <View className="flex-row">
        <Image
          source={{ uri: item.product.thumbnail }}
          className="w-20 h-20 rounded-lg bg-gray-200"
          resizeMode="cover"
        />

        <View className="flex-1 ml-4">
          <Text className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-1">
            {item.product.category}
          </Text>

          <Text
            className="text-sm font-bold text-gray-900 mb-2"
            numberOfLines={2}
          >
            {item.product.title}
          </Text>

          <View className="flex-row items-center mb-2">
            <Text className="text-yellow-400 text-xs mr-1">
              {renderStars(item.product.rating)}
            </Text>
            <Text className="text-xs text-gray-600">
              ({item.product.rating.toFixed(1)})
            </Text>
          </View>

          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-lg font-bold text-green-600">
                ₺{item.totalPrice.toFixed(2)}
              </Text>
              <Text className="text-xs text-gray-500">
                ₺{item.product.price.toFixed(2)} / adet
              </Text>
            </View>

            <View className="flex-row items-center">
              <TouchableOpacity
                className="bg-red-500 rounded-md w-8 h-8 items-center justify-center active:bg-red-600"
                onPress={() => onDecrement(item.id, item.quantity)}
              >
                <Text className="text-white font-bold text-lg">-</Text>
              </TouchableOpacity>

              <View className="bg-gray-100 rounded-lg px-4 py-2 mx-3 min-w-[50px] items-center">
                <Text className="text-gray-900 font-bold text-base">
                  {item.quantity}
                </Text>
              </View>

              <TouchableOpacity
                className="bg-green-500 rounded-md w-8 h-8 items-center justify-center active:bg-green-600"
                onPress={() => onIncrement(item.id, item.quantity)}
              >
                <Text className="text-white font-bold text-lg">+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
