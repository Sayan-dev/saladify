import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppTheme from './theme/theme';

import {navigationRef} from './utils/navigation';
import HomeScreen from './Screens/HomeScreen';

export type RootStackParamList = {
  Home?: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} theme={AppTheme}>
        <Stack.Navigator
          screenOptions={{animation: 'slide_from_bottom', headerShown: false}}
          initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default RootNavigator;
