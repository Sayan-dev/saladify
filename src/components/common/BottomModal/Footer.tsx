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

const ModalFooter = ({ children }: { children?: React.ReactNode }) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return <View style={styles.footer}>{children}</View>;
};

export default ModalFooter;
const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    footer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      flexDirection: 'row',
    },
  });
