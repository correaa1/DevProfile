import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { NavigationContainer } from '@react-navigation/native';

import theme from './src/global/styles/theme';
import AppLoading from 'expo-app-loading';
import { Routes } from './src/routes';
import { AuthProvider } from './src/context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar backgroundColor="transparent" translucent />
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
