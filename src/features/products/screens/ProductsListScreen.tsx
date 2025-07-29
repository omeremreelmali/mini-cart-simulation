import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useProductListViewModel } from '../hooks/useProductListViewModel';
import ProductListSection from '../sections/ProductListSection';

const ProductsScreen = () => {
  const {
    products,
    loading,
    error,
    refreshProducts,
    loadMoreProducts,
    hasMore,
  } = useProductListViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ProductListSection
          products={products}
          loading={loading}
          error={error}
          onRefresh={refreshProducts}
          onLoadMore={loadMoreProducts}
          hasMore={hasMore}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
});

export default ProductsScreen;
