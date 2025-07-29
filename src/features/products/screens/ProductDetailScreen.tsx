import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { PublicRoutes } from '../../../navigation/ScreenNames';
import AddToCartButton from '../components/AddToCartButton';
import ProductImageGallery from '../sections/ProductImageGallery';
import ProductInfoSection from '../sections/ProductInfoSection';
import ProductDetailsSection from '../sections/ProductDetailsSection';
import { useProductDetailViewModel } from '../hooks/useProductDetailViewModel';

type ProductDetailRouteProp = RouteProp<
  RootStackParamList,
  typeof PublicRoutes.ProductDetail
>;

const ProductDetailScreen: React.FC = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const { productId } = route.params;

  const { product, loading, error, refetch } =
    useProductDetailViewModel(productId);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#007AFF" />
          <Text className="mt-4 text-gray-600">
            Ürün detayları yükleniyor...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-lg font-bold text-red-500 text-center mb-2">
            Bir hata oluştu
          </Text>
          <Text className="text-gray-600 text-center mb-4">
            {error || 'Ürün bulunamadı'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <ProductImageGallery images={product.images} />

        <View className="p-4 space-y-4">
          <ProductInfoSection product={product} />
          <ProductDetailsSection product={product} />
        </View>
      </ScrollView>

      <View className="bg-white p-4 border-t border-gray-200 shadow-lg">
        <AddToCartButton product={product} />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;
