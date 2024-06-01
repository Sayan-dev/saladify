import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../../../types';
import { Order } from '../../../types/entities';
import { getModifiedAmount } from '../../../utils/helper';

interface Props {
  data: Order;
}

const Cost = ({ data }: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.cost}>${getModifiedAmount(data.price)}</Text>
    </View>
  );
};

export default Cost;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cost: {
      ...theme.fonts.medium,
      fontSize: 16,
    },
  });
