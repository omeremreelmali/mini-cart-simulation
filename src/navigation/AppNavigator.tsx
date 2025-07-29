import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductsScreen from '../features/products/screens/ProductsListScreen';
import CartScreen from '../features/cart/screens/CartScreen';
import { RootStackParamList } from './types';
import TabNavigator from './TabNavigator';
import { PublicRoutes } from './ScreenNames';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name={PublicRoutes.Home}
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={PublicRoutes.Products}
          component={ProductsScreen}
          options={{ title: 'Ürünler' }}
        />
        <Stack.Screen
          name={PublicRoutes.Cart}
          component={CartScreen}
          options={{ title: 'Sepetim' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
