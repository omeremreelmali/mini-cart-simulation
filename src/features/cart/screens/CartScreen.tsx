import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ListRenderItem,
} from 'react-native';
import { useCart } from '../hooks/useCart';
import { CartItem as CartItemType } from '../model/cart.types';
import CartItem from '../components/CartItem';

const CartScreen: React.FC = () => {
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const handleIncrement = (
    productId: string | number,
    currentQuantity: number,
  ) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecrement = (
    productId: string | number,
    currentQuantity: number,
  ) => {
    if (currentQuantity <= 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  const renderCartItem: ListRenderItem<CartItemType> = ({ item }) => (
    <CartItem
      item={item}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
    />
  );

  const keyExtractor = (item: CartItemType) => item.id.toString();

  if (items.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Sepetiniz Boş
          </Text>
          <Text className="text-gray-600 text-center">
            Ürün eklemek için alışverişe başlayın
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        <View className="bg-white px-4 py-3 border-b border-gray-200">
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-bold text-gray-900">
              Sepetim ({totalItems} Ürün)
            </Text>
            {items.length > 0 && (
              <TouchableOpacity onPress={clearCart}>
                <Text className="text-red-500 font-medium">Temizle</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <FlatList
          data={items}
          renderItem={renderCartItem}
          keyExtractor={keyExtractor}
          className="flex-1 px-4 py-2"
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={10}
          contentContainerStyle={{ paddingBottom: 16 }}
        />

        <View className="bg-white border-t border-gray-200 px-4 py-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-900">Toplam</Text>
            <Text className="text-2xl font-bold text-green-600">
              ₺{totalPrice.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity className="bg-zinc-950 rounded-lg py-4 items-center active:bg-zinc-800">
            <Text className="text-white font-bold text-lg">
              Siparişi Tamamla
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
