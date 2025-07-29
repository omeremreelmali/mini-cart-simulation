import React from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product } from '../model/product.types';
import { wp } from '../../../helpers/screen';
import ProductCard from '../components/ProductCard';
import { RootStackParamList } from '../../../navigation/types';
import { PublicRoutes } from '../../../navigation/ScreenNames';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ProductListSectionProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onLoadMore: () => void;
  hasMore: boolean;
}

const ProductListSection: React.FC<ProductListSectionProps> = ({
  products,
  loading,
  error,
  onRefresh,
  onLoadMore,
  hasMore,
}) => {
  const navigation = useNavigation<NavigationProp>();

  const handleProductPress = (productId: number) => {
    navigation.navigate(PublicRoutes.ProductDetail, { productId });
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard product={item} onPress={() => handleProductPress(item.id)} />
  );

  const renderFooter = () => {
    if (!hasMore || !loading) return null;

    return (
      <View className="flex-row justify-center items-center py-5">
        <ActivityIndicator size="small" color="#3498db" />
        <Text className="ml-2 text-sm text-gray-600">
          Daha fazla ürün yükleniyor...
        </Text>
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View className="flex-1 justify-center items-center p-10">
          <ActivityIndicator size="large" color="#3498db" />
          <Text className="ml-2 text-sm text-gray-600">
            Ürünler yükleniyor...
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View className="flex-1 justify-center items-center p-10">
          <Text className="text-lg font-bold text-red-500 text-center mb-2">
            Bir hata oluştu
          </Text>
          <Text className="text-sm text-gray-600 text-center">{error}</Text>
        </View>
      );
    }

    return (
      <View className="flex-1 justify-center items-center p-10">
        <Text className="text-base text-gray-600 text-center">
          Ürün bulunamadı
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          colors={['#3498db']}
        />
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={
        products.length === 0 ? styles.emptyContainer : styles.container
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp(2),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(5),
  },
});

export default ProductListSection;
