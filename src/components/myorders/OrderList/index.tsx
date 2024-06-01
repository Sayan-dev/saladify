import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Order from './Order';
import { PreviousOrder } from '../../../types/entities';
import type { ExtendedTheme } from '../../../types';

interface Props {
  orders: PreviousOrder[];
  onOrderPress: (orderId: string) => void;
}

const OrderList = ({ orders, onOrderPress }: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {orders.map(order => (
          <Order onPress={onOrderPress} data={order} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderList;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 24,
    },
  });
