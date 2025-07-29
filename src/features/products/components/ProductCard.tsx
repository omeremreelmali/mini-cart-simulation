import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Product } from '../model/product.types';
import { wp } from '../../../helpers/screen';
import { renderStars } from '../../../utils/renderStars';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <TouchableOpacity
      className="bg-white rounded-2xl m-2 shadow-xl overflow-hidden border border-gray-100"
      style={{
        width: wp(45),
        height: 350,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      }}
      onPress={onPress}
    >
      <View className="relative">
        <Image
          source={{ uri: product.thumbnail }}
          className="w-full h-36"
          resizeMode="cover"
        />

        <View
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
          style={{
            backgroundColor: 'transparent',
          }}
        />

        {product.discountPercentage > 0 && (
          <View className="absolute top-2 right-2 bg-red-500 rounded-full px-3 py-1 shadow-md">
            <Text className="text-xs text-white font-bold">
              -%{product.discountPercentage.toFixed(2)}
            </Text>
          </View>
        )}

        <View className="absolute top-2 left-2 bg-black/70 rounded-full px-2 py-1">
          <Text className="text-xs text-white font-medium">
            {product.stock} stok
          </Text>
        </View>
      </View>

      <View className="p-4 flex-1 justify-between">
        <View>
          <View className="mb-2">
            <Text className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
              {product.category}
            </Text>
          </View>

          <Text
            className="text-sm font-bold text-gray-900 mb-3 leading-5"
            numberOfLines={2}
            style={{ minHeight: 40 }}
          >
            {product.title}
          </Text>

          <View className="flex-row items-center mb-3">
            <Text className="text-yellow-400 text-sm mr-1">
              {renderStars(product.rating)}
            </Text>
            <Text className="text-xs text-gray-600 font-medium">
              ({product.rating.toFixed(1)})
            </Text>
          </View>

          <View className="mb-4">
            {product.discountPercentage > 0 && (
              <Text className="text-xs text-gray-400 line-through mb-1">
                ₺{product.price.toFixed(2)}
              </Text>
            )}
            <View className="flex-row items-baseline">
              <Text className="text-lg font-bold text-green-600">
                ₺{discountedPrice.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <AddToCartButton product={product} />
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
