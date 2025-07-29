import React from 'react';
import { View, Text } from 'react-native';
import { Product } from '../model/product.types';
import { getStockStatus } from '../../../utils/productUtils';

interface ProductDetailsSectionProps {
  product: Product;
}

const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({
  product,
}) => {
  const stockStatus = getStockStatus(product.stock);

  const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
      <Text className="text-sm font-medium text-gray-600">{label}</Text>
      <Text className="text-sm font-semibold text-gray-900">{value}</Text>
    </View>
  );

  return (
    <View className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      <Text className="text-lg font-bold text-gray-900 mb-4">
        Ürün Detayları
      </Text>

      <DetailRow label="Marka" value={product.brand || 'Belirtilmemiş'} />

      <View className="flex-row justify-between items-center py-3">
        <Text className="text-sm font-medium text-gray-600">Stok Durumu</Text>
        <View className={`px-3 py-1 rounded-full ${stockStatus.bgColor}`}>
          <Text className={`text-xs font-semibold ${stockStatus.color}`}>
            {stockStatus.text} ({product.stock} adet)
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailsSection;
