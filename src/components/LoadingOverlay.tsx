import React, { useEffect, useRef } from 'react';
import { View, Animated, ActivityIndicator } from 'react-native';

interface LoadingOverlayProps {
  visible: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 20,
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    </View>
  );
};

export default LoadingOverlay;
