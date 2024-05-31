import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute, useTheme} from '@react-navigation/native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import {RootStackParamList} from '../RootNavigator';
import type {ExtendedTheme} from '../types';
import Preview from '../components/common/Images/PreviewImage';
import BaseLayout from '../components/layouts/BaseLayout';
import Counter from '../components/ItemDetails/Counter';
import Suggestions from '../components/ItemDetails/Suggestion';
import ActionArea from '../components/ItemDetails/ActionArea';
import useProductStore from '../store/product/selector';
import useOrderStore from '../store/order/selector';
import Topbar from '../components/common/TopBar';
import {useProduct} from '../api/queries/product.queries';
import InfoComponent from '../components/ItemDetails/Info';

type ItemDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'ItemDetails'
>;

export type ItemDetailsScreenParams = {
  goBack: boolean;
};

const ItemDetailsScreen: React.FC<ItemDetailsProps> = ({navigation}) => {
  const route = useRoute<RouteProp<RootStackParamList, 'ItemDetails'>>();

  const theme = useTheme();
  const [count, setCount] = useState(0);
  const [selectedItem, setSelectedItem, , addProduct, subProduct] =
    useProductStore();
  const [orders, , createOrder, addOrder, subOrder, removeOrder] =
    useOrderStore();
  const product = useProduct(selectedItem?._id);

  const styles = React.useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    if (selectedItem) {
      if (orders[selectedItem._id]) setCount(orders[selectedItem._id].quantity);
      else setCount(selectedItem.quantity || 0);
    } else setCount(0);
  }, [orders, selectedItem]);

  const navigateToOrderScreen = () => {
    if (route.params?.goBack) navigation.goBack();
    else navigation.replace('Orders');
  };

  const handleCreateOrder = () => {
    if (selectedItem) {
      if (orders[selectedItem._id]) return;
      createOrder(selectedItem);
    }
  };

  const handleAddOrder = () => {
    if (selectedItem) {
      if (orders[selectedItem._id]) addOrder(selectedItem._id);
      else {
        addProduct();
      }
    }
  };
  const handleSubOrder = () => {
    if (selectedItem) {
      if (orders[selectedItem._id]) {
        if (orders[selectedItem._id].quantity === 1) {
          navigation.goBack();
          removeOrder(selectedItem._id);
          Toast.show({text1: 'The Item has been removed'});
        } else {
          subOrder(selectedItem._id);
        }
      } else {
        subProduct();
      }
    }
  };

  const handleAddToBasket = () => {
    handleCreateOrder();
    navigateToOrderScreen();
  };
  useEffect(() => {
    if (product.data) {
      setSelectedItem({
        ...selectedItem,
        quantity: selectedItem?.quantity || 0,
        ...product.data,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.data]);

  if (product.data) {
    return (
      <BaseLayout>
        <View style={styles.heading}>
          <Topbar title="" goBack={navigation.goBack} />
        </View>
        <View style={styles.subContainer}>
          <View style={styles.preview}>
            <Preview />
          </View>
          <View style={styles.detailing}>
            <Text style={styles.label}>{selectedItem?.name}</Text>
            <Counter
              data={selectedItem && selectedItem}
              add={handleAddOrder}
              sub={handleSubOrder}
              count={count}
            />
            <InfoComponent />
            <Suggestions />
            <ActionArea
              orderExists={
                selectedItem ? orders[selectedItem._id] && true : false
              }
              liked={selectedItem?.liked || false}
              basketAction={handleAddToBasket}
            />
          </View>
        </View>
      </BaseLayout>
    );
  }
  return <View />;
};

export default ItemDetailsScreen;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
    },
    heading: {},

    subContainer: {
      flex: 1,

      backgroundColor: theme.colors.primary,
    },
    preview: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    detailing: {
      flex: 2.2,
      paddingTop: heightPercentageToDP(3),
      alignItems: 'stretch',
      paddingHorizontal: widthPercentageToDP(5),
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: theme.colors.background,
    },
    label: {
      fontSize: 32,
      color: theme.colors.text,
      ...theme.fonts.medium,
    },
  });
