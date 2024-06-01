import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import Typography from '../common/Typography';
import OrderStep1 from '../../assets/images/order_step_1.png';
import success from '../../assets/images/progress_success.png';
import { ExtendedTheme } from '../../types';

interface Props {}

const DottedBorder = ({}: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.border}>
        <View style={styles.dotted} />
      </View>
    </View>
  );
};

export default DottedBorder;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    border: {
      width: 65,
      height: 48,
      paddingVertical: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dotted: {
      height: '100%',
      width: 0,
      borderStyle: 'dashed',
      borderLeftWidth: 1.5,
      borderColor: theme.colors.primary,
    },
  });
