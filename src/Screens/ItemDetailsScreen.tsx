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
import {Order} from '../types/entities';

type ItemDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'ItemDetails'
>;

export type ItemDetailsScreenParams = {
  productId: string;
  goBack?: boolean;
};

const ItemDetailsScreen: React.FC<ItemDetailsProps> = ({navigation, route}) => {
  const theme = useTheme();
  const [productList, , addProduct, subProduct] = useProductStore();
  const [orders, , createOrder, addOrder, subOrder, removeOrder] =
    useOrderStore();
  const product = useProduct(route.params?.productId);

  let initialSelectedItem: Order = {
    _id: '',
    price: 0,
    quantity: 0,
    image_url: '',
    ingredients: [],
    liked: false,
    name: '',
    suggestions: '',
  };

  let selectedItem = {
    ...(productList.find(item => item._id === route.params.productId) ||
      initialSelectedItem),
    ...product,
  };

  if (orders[selectedItem._id]) {
    selectedItem = {
      ...selectedItem,
      ...orders[selectedItem._id],
    };
  }

  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const navigateToOrderScreen = () => {
    if (route.params?.goBack) {
      navigation.goBack();
    } else {
      navigation.replace('Orders');
    }
  };

  const handleCreateOrder = () => {
    if (orders[selectedItem._id]) {
      return;
    }
    createOrder(selectedItem);
  };

  const handleAddOrder = () => {
    if (selectedItem) {
      if (orders[selectedItem._id]) {
        addOrder(selectedItem._id);
      } else {
        addProduct(selectedItem._id);
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
        subProduct(selectedItem._id);
      }
    }
  };

  const handleAddToBasket = () => {
    handleCreateOrder();
    navigateToOrderScreen();
  };

  return (
    <BaseLayout>
      <View style={styles.heading}>
        <Topbar title="" goBack={navigation.goBack} />
      </View>
      <View style={styles.subContainer}>
        <View style={styles.preview}>
          <Preview url={selectedItem.image_url} style={styles.previewImage} />
        </View>
        <View style={styles.detailing}>
          <Text style={styles.label}>{selectedItem?.name}</Text>
          <Counter
            data={selectedItem && selectedItem}
            add={handleAddOrder}
            sub={handleSubOrder}
            count={selectedItem.quantity}
          />
          {selectedItem.ingredients && (
            <InfoComponent ingredients={selectedItem.ingredients} />
          )}
          {selectedItem.suggestions && (
            <Suggestions suggestions={selectedItem.suggestions} />
          )}
          <ActionArea
            orderExists={
              selectedItem ? orders[selectedItem._id] && true : false
            }
            productId={selectedItem?._id}
            basketAction={handleAddToBasket}
          />
        </View>
      </View>
    </BaseLayout>
  );
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
    previewImage: {
      width: 200,
      height: 200,
      borderRadius: 20,
      elevation: 1,
    },
    preview: {
      padding: 5,
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
