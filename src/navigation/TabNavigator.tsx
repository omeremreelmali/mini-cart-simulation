import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from './types';
import { TabRoutes } from './ScreenNames';
import HomeScreen from '../features/home/screens/HomeScreen';
import ProductsScreen from '../features/products/screens/ProductsListScreen';
import CartScreen from '../features/cart/screens/CartScreen';
import Icon from '../components/icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../features/cart/hooks/useCart';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  const { items } = useCart();
  const cartItemCount = items?.length || 0;
  return (
    <Tab.Navigator
      initialRouteName={TabRoutes.ProductsTab}
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 10,
          paddingTop: 5,
          height: 90,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={TabRoutes.HomeTab}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => (
            <Icon name="House" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={TabRoutes.ProductsTab}
        component={ProductsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          tabBarLabel: 'Ürünler',
          headerTitle: 'Ürünler',
          tabBarIcon: ({ color, size }) => (
            <Icon name="Box" color={color} size={size} />
          ),

          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate(TabRoutes.CartTab)}
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
      />
      <Tab.Screen
        name={TabRoutes.CartTab}
        component={CartScreen}
        options={{
          tabBarLabel: 'Sepet',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Icon name="ShoppingCart" color={color} size={size} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
