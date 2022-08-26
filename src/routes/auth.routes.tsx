import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '../pages/SignIn/Index';
import { SignUp } from '../pages/SignUp';

const Auth = createNativeStackNavigator();
export const AuthRoutes: React.FunctionComponent = () => {
  return (
    <Auth.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
  );
};
