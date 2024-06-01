import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../../../types';
import { getModifiedAmount } from '../../../utils/helper';

interface Props {
  total: number;
}

const Total = ({ total }: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Total</Text>
      <Text style={styles.cost}>$ {getModifiedAmount(total)}</Text>
    </View>
  );
};

export default Total;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flex: 2,
    },
    name: {
      ...theme.fonts.medium,
      fontSize: 16,
    },
    cost: {
      ...theme.fonts.medium,
      fontSize: 24,
    },
  });
