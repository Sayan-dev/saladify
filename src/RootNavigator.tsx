import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppTheme from './theme/theme';

import {navigationRef} from './utils/navigation';
import HomeDrawerNavigator from './HomeDrawerNavigation';
import GetStartedScreen from './Screens/GetStartedScreen';
import LoginScreen from './Screens/LoginScreen';
import ItemDetailsScreen, {
  ItemDetailsScreenParams,
} from './Screens/ItemDetailsScreen';
import OrderScreen from './Screens/OrderScreen';
import SuccessScreen from './Screens/SuccessScreen';
import TrackOrderScreen from './Screens/TrackOrderScreen';
import SignupScreen from './Screens/SignupScreen';
import SplashScreen from './Screens/SplashScreen';

export type RootStackParamList = {
  Splash?: undefined;
  Start?: undefined;
  Login?: undefined;
  Signup?: undefined;
  ItemDetails: ItemDetailsScreenParams;
  HomeDrawer?: undefined;
  Orders?: undefined;
  Success?: undefined;
  Track?: {orderId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} theme={AppTheme}>
        <Stack.Navigator
          screenOptions={{animation: 'slide_from_bottom', headerShown: false}}
          initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Start" component={GetStartedScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />

          <Stack.Screen name="HomeDrawer" component={HomeDrawerNavigator} />

          <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} />

          <Stack.Group>
            <Stack.Screen name="Orders" component={OrderScreen} />
            <Stack.Screen name="Success" component={SuccessScreen} />
            <Stack.Screen name="Track" component={TrackOrderScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default RootNavigator;
