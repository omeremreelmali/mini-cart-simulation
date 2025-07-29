import React from 'react';
import { View, Text } from 'react-native';
import { Product } from '../model/product.types';
import { renderStars } from '../../../utils/renderStars';

interface ProductInfoSectionProps {
  product: Product;
}

const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({ product }) => {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <View className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      <View className="mb-3">
        <Text className="text-sm text-blue-600 font-semibold uppercase tracking-wide">
          {product.category}
        </Text>
      </View>

      <Text className="text-xl font-bold text-gray-900 mb-4 leading-6">
        {product.title}
      </Text>

      <View className="flex-row items-center mb-4">
        <Text className="text-yellow-400 text-lg mr-2">
          {renderStars(product.rating)}
        </Text>
        <Text className="text-sm text-gray-600 font-medium">
          ({product.rating.toFixed(1)})
        </Text>
      </View>

      <View className="mb-6">
        {product.discountPercentage > 0 && (
          <View className="flex-row items-center mb-2">
            <Text className="text-base text-gray-400 line-through mr-3">
              ₺{product.price.toFixed(2)}
            </Text>
            <View className="bg-red-500 rounded-full px-3 py-1">
              <Text className="text-xs text-white font-bold">
                -%{product.discountPercentage.toFixed(0)} İndirim
              </Text>
            </View>
          </View>
        )}
        <Text className="text-2xl font-bold text-green-600">
          ₺{discountedPrice.toFixed(2)}
        </Text>
      </View>

      <View>
        <Text className="text-base font-medium text-gray-900 mb-2">
          Ürün Açıklaması
        </Text>
        <Text className="text-sm text-gray-700 leading-6">
          {product.description}
        </Text>
      </View>
    </View>
  );
};

export default ProductInfoSection;
