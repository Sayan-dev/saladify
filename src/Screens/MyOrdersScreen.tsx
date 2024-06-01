import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {CompositeScreenProps, useTheme} from '@react-navigation/native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {RootStackParamList} from '../RootNavigator';

import {useGetOrders} from '../api/queries/order.queries';
import {DrawerParamList} from '../HomeDrawerNavigator';
import Topbar from '../components/common/TopBar';
import OrderList from '../components/myorders/OrderList';
import type {ExtendedTheme} from '../types';
import Loading from '../components/common/Loader/LoadingModal';

type MyOrderScreenProps = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'MyOrders'>,
  NativeStackScreenProps<RootStackParamList>
>;

const MyOrderScreen: React.FC<MyOrderScreenProps> = ({
  navigation,
}: MyOrderScreenProps) => {
  const theme = useTheme();

  const orders = useGetOrders();

  const goBack = () => {
    navigation.goBack();
  };

  const reloadPage = async () => {
    await orders.refetch();
  };

  const goToTrackOrderScreen = (orderId: string) => {
    navigation.navigate('Track', {
      orderId,
    });
  };

  useEffect(() => {
    orders.refetch();
  }, []);
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  return (
    <SafeAreaView style={styles.container}>
      <Loading
        loadingText="Please wait while we fetch yyour previous orders"
        open={orders.isLoading}
      />
      <Topbar
        willReload
        onReload={reloadPage}
        goBack={goBack}
        title="My Orders"
      />
      <OrderList
        onOrderPress={goToTrackOrderScreen}
        orders={orders.data || []}
      />
    </SafeAreaView>
  );
};

export default MyOrderScreen;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
    },
  });
