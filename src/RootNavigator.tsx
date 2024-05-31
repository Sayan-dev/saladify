import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppTheme from './theme/theme';

import {navigationRef} from './utils/navigation';
import HomeDrawerNavigator from './HomeDrawerNavigation';
import GetStartedScreen from './Screens/GetStartedScreen';

export type RootStackParamList = {
  Start?: undefined;
  HomeDrawer?: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} theme={AppTheme}>
        <Stack.Navigator
          screenOptions={{animation: 'slide_from_bottom', headerShown: false}}
          initialRouteName="Start">
          <Stack.Screen name="Start" component={GetStartedScreen} />

          <Stack.Screen name="HomeDrawer" component={HomeDrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default RootNavigator;
