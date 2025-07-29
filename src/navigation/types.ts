import { PublicRoutes, TabRoutes } from './ScreenNames';

export type RootStackParamList = {
  [PublicRoutes.Home]: undefined;
  [PublicRoutes.Products]: undefined;
  [PublicRoutes.Cart]: undefined;
};

export type TabParamList = {
  [TabRoutes.HomeTab]: undefined;
  [TabRoutes.ProductsTab]: undefined;
  [TabRoutes.CartTab]: undefined;
}; 