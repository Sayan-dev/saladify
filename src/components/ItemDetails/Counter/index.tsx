import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import type { ExtendedTheme } from '../../../types';
import Counter from './Counter';
import Price from './Price';
import { Product } from '../../../types/entities';

interface Props {
  add: () => void;
  sub: () => void;
  count: number;
  data: Product | null;
}

const CounterComponent = ({ data, add, sub, count }: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Counter add={add} sub={sub} count={count} />
      <Price price={data?.price || 0} />
    </View>
  );
};

export default CounterComponent;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 24,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.border,
    },
  });
