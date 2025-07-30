/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import LoadingOverlay from './src/components/LoadingOverlay';
import { useApp } from './src/store/hooks';
import './global.css';
import Toast from 'react-native-toast-message';

const AppContent = () => {
  const { isLoading, error, clearError } = useApp();

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: error,
        visibilityTime: 2000,
        autoHide: true,
        onHide: () => {
          clearError();
        },
      });
    }
  }, [error, clearError]);

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <AppNavigator />
      <LoadingOverlay visible={isLoading} />
      <Toast />
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
