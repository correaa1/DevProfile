import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '../pages/SignIn/Index';
import { SignUp } from '../pages/SignUp';
import { Home } from '../pages/Home';

const App = createNativeStackNavigator();
export const AppRoutes: React.FunctionComponent = () => {
  return (
    <App.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <App.Screen name="Home" component={Home} />
    </App.Navigator>
  );
};
