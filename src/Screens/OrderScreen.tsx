import {StyleSheet} from 'react-native';
import React, {useState} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {RootStackParamList} from '../RootNavigator';

import OrderList from '../components/orders/OrderList';
import CheckoutBar from '../components/orders/Checkout';
import useOrderStore from '../store/order/selector';
import CheckoutModal from '../components/orders/CheckoutModal';
import {useCreateOrder} from '../api/queries/order.queries';
import {CheckoutDetails} from '../types/entities';
import Topbar from '../components/common/TopBar';
import Loading from '../components/common/Loader/LoadingModal';
import useProductStore from '../store/product/selector';

type OrderScreenProps = NativeStackScreenProps<RootStackParamList, 'Orders'>;

const schema = yup.object().shape({
  address: yup.string().max(200).required('Required'),
  contact: yup.string().max(11).required('Required'),
});

const OrderScreen: React.FC<OrderScreenProps> = ({
  navigation,
}: OrderScreenProps) => {
  const [, selectProduct] = useProductStore();

  const [orders, total] = useOrderStore();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const createOrder = useCreateOrder();
  const goBack = async () => {
    navigation.goBack();
  };

  const form = useForm<CheckoutDetails>({
    resolver: yupResolver(schema),
    defaultValues: {
      address: '',
      contact: '',
    },
  });

  const handlePressItem = (id: string) => {
    selectProduct(orders[id]);
    navigation.navigate('ItemDetails', {goBack: true});
  };

  const handleCheckout = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleBookOrder = form.handleSubmit(async ({address, contact}) => {
    const orderList = Object.keys(orders).map(id => ({
      productId: id,
      quantity: orders[id].quantity,
    }));

    createOrder.mutate(
      {
        orderItems: orderList,
        total,
        address,
        contact,
        mode: 'COD',
      },
      {
        onSuccess: async () => {
          handleCloseModal();
          navigation.navigate('Success');
        },
      },
    );
  });

  const styles = React.useMemo(() => createStyles(), []);
  return (
    <SafeAreaView style={styles.container}>
      <Loading
        loadingText="Please wait while we book your order"
        open={createOrder.isLoading}
      />
      <Topbar goBack={goBack} title="My Basket" />
      <OrderList handlePressItem={handlePressItem} orders={orders} />
      <CheckoutBar total={total} checkout={handleCheckout} />
      <CheckoutModal
        form={form}
        open={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleBookOrder}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;

const createStyles = () =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
    },
  });
