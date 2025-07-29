import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductsScreen from '../features/products/screens/ProductsListScreen';
import CartScreen from '../features/cart/screens/CartScreen';
import ProductDetailScreen from '../features/products/screens/ProductDetailScreen';
import { RootStackParamList } from './types';
import TabNavigator from './TabNavigator';
import { PublicRoutes, TabRoutes } from './ScreenNames';
import { Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../features/cart/hooks/useCart';
import Icon from '../components/icons';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { items } = useCart();
  const cartItemCount = items?.length || 0;
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={PublicRoutes.Home}
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(PublicRoutes.Home, {
                  screen: TabRoutes.CartTab,
                })
              }
            >
              <View className="pr-5 py-2">
                <Icon name="ShoppingCart" color="black" size={20} />
                {cartItemCount > 0 && (
                  <View className="absolute top-0 right-1 bg-zinc-950 rounded-full w-4 h-4 items-center justify-center">
                    <Text className="text-white text-xs text-center">
                      {cartItemCount}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ),
        })}
      >
        <Stack.Screen
          name={PublicRoutes.Home}
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={PublicRoutes.Products}
          component={ProductsScreen}
          options={{ title: 'Ürünler', headerShown: false }}
        />
        <Stack.Screen
          name={PublicRoutes.ProductDetail}
          component={ProductDetailScreen}
          options={{ title: 'Ürün Detayı' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
