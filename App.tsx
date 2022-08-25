import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { StyleSheet, Text, View } from 'react-native';
import { Home } from './src/pages/Home';
import theme from './src/global/styles/theme';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}
