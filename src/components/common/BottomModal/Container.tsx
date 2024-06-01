import * as React from 'react';
import {
  TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { transform } from 'lodash';
import type { ExtendedTheme, FontSize } from '../../types';
import Typography from './Typography';

const ModalContainer = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return <View style={styles.container}>{children}</View>;
};

export default ModalContainer;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderStyle: 'solid',
    },
  });
