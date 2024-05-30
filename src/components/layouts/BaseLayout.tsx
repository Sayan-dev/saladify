import {useTheme} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import type {ExtendedTheme} from '../../types';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';

type BaseLayoutProps = PropsWithChildren;

const BaseLayout: React.FC<BaseLayoutProps> = ({children}) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
        animated
      />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

export default BaseLayout;

const createStyles = (_theme: ExtendedTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flexGrow: 1,
    },
  });
