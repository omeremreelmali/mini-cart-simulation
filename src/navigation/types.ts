import { PublicRoutes, TabRoutes } from './ScreenNames';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  [PublicRoutes.Home]: NavigatorScreenParams<TabParamList> | undefined;
  [PublicRoutes.Products]: undefined;
  [PublicRoutes.ProductDetail]: { productId: number };
  [PublicRoutes.Cart]: undefined;
};

export type TabParamList = {
  [TabRoutes.HomeTab]: undefined;
  [TabRoutes.ProductsTab]: undefined;
  [TabRoutes.CartTab]: undefined;
}; 