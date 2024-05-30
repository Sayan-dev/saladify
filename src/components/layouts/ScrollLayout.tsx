import {StatusBar, StyleSheet} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {useTheme} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';
import type {ExtendedTheme} from '../../types';

type ScrollLayoutProps = PropsWithChildren<{
  scrollViewProps?: React.ComponentProps<typeof KeyboardAwareScrollView>;
  statusBarProps?: React.ComponentProps<typeof StatusBar>;
  edges?: SafeAreaViewProps['edges'];
}>;

const ScrollLayout: React.FC<ScrollLayoutProps> = ({
  children,
  scrollViewProps,
  edges = ['left', 'right'],
}) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  return (
    <SafeAreaView style={styles.safeArea} edges={edges}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
        animated
      />

      <KeyboardAwareScrollView
        {...scrollViewProps}
        contentContainerStyle={[
          styles.scrollContainer,
          scrollViewProps?.contentContainerStyle,
        ]}>
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ScrollLayout;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    scrollContainer: {
      paddingHorizontal: theme.spacing.md,
      flexGrow: 1,
    },
  });
