import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CompositeScreenProps, useTheme} from '@react-navigation/native';

import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {ExtendedTheme} from '../types';
import {RootStackParamList} from '../RootNavigator';
import TopBar from '../components/orders/Topbar';
import OrderList from '../components/orders/OrderList';
import CheckoutBar from '../components/orders/Checkout';
import useOrderStore from '../store/order/selector';
import CheckoutModal from '../components/orders/CheckoutModal';
import Typography from '../components/common/Typography';
import TrackRow from '../components/track/TrackRow';

import progressSuccess from '../assets/images/progress_success.png';
import OrderStep1 from '../assets/images/order_step_1.png';
import OrderStep2 from '../assets/images/order_step_2.png';
import OrderStep3 from '../assets/images/order_step_3.png';
import Success from '../assets/images/BigSuccess.png';
import DottedBorder from '../components/track/DottedBorder';
import Map from '../assets/images/maps_preview.png';
import Topbar from '../components/common/TopBar';
import BaseLayout from '../components/layouts/BaseLayout';
import useSocket from '../hooks/useSocket';
import {OrderEvent} from '../types/entities';
import {useGetOrder} from '../api/queries/order.queries';

type TrackOrderScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Track'
>;

const TrackOrderScreen: React.FC<TrackOrderScreenProps> = ({
  navigation,
  route,
}: TrackOrderScreenProps) => {
  const socket = useSocket();
  const theme = useTheme();
  const orderId = route.params?.orderId;
  const [orders, total] = useOrderStore();
  const [takeOrder, setTakeOrder] = useState(false);
  const [progress, setProgress] = useState(false);
  const [partnerRecieve, setPartnerRecieve] = useState(false);
  const [partnerDeliver, setPartnerDeliver] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const orderDetails = useGetOrder(orderId);

  const handleGoBack = () => {
    navigation.popToTop();
  };

  useEffect(() => {
    switch (orderDetails.data?.trackingStatus) {
      case OrderEvent.take_order:
        setTakeOrder(true);
        break;
      case OrderEvent.prepare_order:
        setTakeOrder(true);
        setProgress(true);
        break;
      case OrderEvent.picked_up_order:
        setTakeOrder(true);
        setProgress(true);
        setPartnerRecieve(true);
        break;
      case OrderEvent.received_order:
        setTakeOrder(true);
        setProgress(true);
        setPartnerRecieve(true);
        setPartnerDeliver(true);
        break;

      default:
        break;
    }
  }, [orderDetails.data]);

  useEffect(() => {
    if (socket) {
      socket.on(OrderEvent.take_order, () => {
        setTakeOrder(true);
      });
      socket.on(OrderEvent.prepare_order, () => {
        setProgress(true);
      });
      socket.on(OrderEvent.picked_up_order, () => {
        setPartnerRecieve(true);
      });
      socket.on(OrderEvent.received_order, () => {
        setPartnerDeliver(true);
      });
    }
  }, [socket]);

  const styles = React.useMemo(() => createStyles(theme), [theme]);
  return (
    <BaseLayout backgroundColor={theme.colors.primary}>
      <Topbar title="Delivery Status" goBack={handleGoBack} />
      <View style={styles.order}>
        <TrackRow
          name="Order Taken"
          status={takeOrder}
          backgroundColor="#FFFAEB"
          image={OrderStep1}
          imageStyles={styles.orderStep1Image}
          imageBackgroundStyles={styles.orderstep1}
          progressImage={progressSuccess}
        />
        <DottedBorder />
        <TrackRow
          name="Order Is Being Prepared"
          status={progress}
          backgroundColor="#F1EFF6"
          image={OrderStep2}
          progressImage={progressSuccess}
        />
        <DottedBorder />

        <TrackRow
          name="Order Is Being Delivered"
          description="Your delivery agent is coming"
          status={partnerRecieve}
          backgroundColor="#FEF0F0"
          image={OrderStep3}
          progressImage={progressSuccess}
        />
        <DottedBorder />

        <Image source={Map} />
        <DottedBorder />

        <TrackRow
          name="Order Received"
          status={partnerDeliver}
          backgroundColor="#F0FEF8"
          imageStyles={styles.orderReceived}
          imageBackgroundStyles={styles.orderReceivedBackground}
          image={Success}
          progressImage={progressSuccess}
        />
      </View>
    </BaseLayout>
  );
};

export default TrackOrderScreen;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    order: {
      width: widthPercentageToDP(100),

      paddingHorizontal: 24,
      paddingVertical: 40,
    },
    orderstep1: {
      width: 65,
      height: 64,
      paddingVertical: 10,
      paddingHorizontal: 8,
    },
    orderStep1Image: {
      width: 48,
      heght: 43,
    },
    orderReceived: {
      width: 40,
      heght: 40,
    },
    orderReceivedBackground: {
      width: 65,
      height: 64,
      paddingVertical: 12,
      paddingHorizontal: 12,
    },
  });
