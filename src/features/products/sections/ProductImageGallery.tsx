import React, { useState } from 'react';
import {
  View,
  Image,
  FlatList,
  Dimensions,
  Text,
  ListRenderItem,
} from 'react-native';

interface ProductImageGalleryProps {
  images: string[];
}

const { width: screenWidth } = Dimensions.get('window');
const imageHeight = screenWidth * 0.8;

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(currentIndex);
  };

  const renderImage: ListRenderItem<string> = ({ item: imageUrl, index }) => (
    <Image
      key={index}
      source={{ uri: imageUrl }}
      style={{
        width: screenWidth,
        height: imageHeight,
      }}
      resizeMode="cover"
    />
  );

  const getItemLayout = (_: any, index: number) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  if (!images || images.length === 0) {
    return (
      <View
        className="bg-gray-200 justify-center items-center"
        style={{ height: imageHeight }}
      >
        <Text className="text-gray-500">Resim bulunamadı</Text>
      </View>
    );
  }

  return (
    <View className="bg-white">
      <FlatList
        data={images}
        renderItem={renderImage}
        keyExtractor={(item, index) => `image-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={10}
        removeClippedSubviews={true}
      />

      {images.length > 1 && (
        <View className="absolute bottom-4 left-0 right-0">
          <View className="flex-row justify-center space-x-2">
            {images.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </View>
        </View>
      )}

      <View className="absolute top-4 right-4 bg-black/70 rounded-full px-3 py-1">
        <Text className="text-white text-xs font-medium">
          {currentIndex + 1} / {images.length}
        </Text>
      </View>
    </View>
  );
};

export default ProductImageGallery;
