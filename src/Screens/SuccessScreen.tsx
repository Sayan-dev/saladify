import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { CompositeScreenProps, useTheme } from '@react-navigation/native';

import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExtendedTheme } from '../types';
import { RootStackParamList } from '../RootNavigator';
import TopBar from '../components/orders/Topbar';
import OrderList from '../components/orders/OrderList';
import CheckoutBar from '../components/orders/Checkout';
import useOrderStore from '../store/order/selector';
import CheckoutModal from '../components/orders/CheckoutModal';
import Typography from '../components/common/Typography';
import Button from '../components/common/Button';
import Success from '../assets/images/Success.png';

type SuccessScreenProps = NativeStackScreenProps<RootStackParamList, 'Success'>;

const SuccessScreen: React.FC<SuccessScreenProps> = ({ navigation }: SuccessScreenProps) => {
  const theme = useTheme();
  const [orders, total] = useOrderStore();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTrackOrder = () => {
    navigation.navigate('Track');
  };

  const handleContinueShopping = () => {
    navigation.popToTop();
  };
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.message}>
        <Image source={Success} style={styles.image} />
        <Typography fontStyle="medium" fontSize={32}>
          Congratulations!!!
        </Typography>
        <Typography fontStyle="regular" fontSize={20} style={styles.messagebody}>
          Your order have been taken and is being attended to
        </Typography>
      </View>
      <Button fontSize="medium" style={styles.button} onPress={handleTrackOrder}>
        Track Order
      </Button>
      <Button
        fontSize="medium"
        borderWidth={1}
        backgroundColor="background"
        style={styles.continue}
        textColor="primary"
        onPress={handleContinueShopping}
      >
        Continue Shopping
      </Button>
    </SafeAreaView>
  );
};

export default SuccessScreen;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    message: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 64,
      marginBottom: 56,
    },
    messagebody: {
      textAlign: 'center',
    },
    image: {
      width: 164,
      height: 164,
      marginBottom: 56,
    },
    button: {
      marginBottom: 48,
      paddingHorizontal: 32,
      paddingVertical: 16,
    },
    continue: {
      paddingHorizontal: 32,
      paddingVertical: 16,
    },
  });
