/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import RootNavigator from './RootNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={styles.container}>
      <RootNavigator />
      {/* <View>
        <Text>Hello</Text>
      </View> */}
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
