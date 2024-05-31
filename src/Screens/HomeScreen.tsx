import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {CompositeScreenProps, useTheme} from '@react-navigation/native';
import ScrollLayout from '../components/layouts/ScrollLayout';
import type {ExtendedTheme} from '../types';
import TopBar from '../components/home/TopBar';
import Heading from '../components/home/Heading';
import {DrawerParamList} from '../HomeDrawerNavigation';
import {RootStackParamList} from '../RootNavigator';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Loading from '../components/common/Loader/LoadingModal';
import useProductList from '../hooks/useProductList';
import RecommendedComponent from '../components/home/Recommended';
import FilterComponent from '../components/home/Filters';
import {Product} from '../types/entities';
import useProductStore from '../store/product/selector';

type HomeScreenProps = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [, selectProduct] = useProductStore();

  const theme = useTheme();
  const [products, , isProductsLoading] = useProductList();
  const selectItem = async (product: Product) => {
    selectProduct({...product, quantity: 1});
    // navigation.navigate('ItemDetails');
  };

  const styles = React.useMemo(() => createStyles(theme), [theme]);
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <ScrollLayout
      scrollViewProps={{style: styles.container}}
      edges={['top', 'left', 'right']}>
      <Loading
        loadingText="Fetching all products. It might delay due to server restart. Please be patient"
        open={isProductsLoading}
      />
      <TopBar openDrawer={openDrawer} />
      <Heading user={{firstName: 'Sayanta'}} />
      <RecommendedComponent selectItem={selectItem} products={products || []} />
      <FilterComponent selectItem={selectItem} products={products || []} />
    </ScrollLayout>
  );
};

export default HomeScreen;

const createStyles = (_theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {},
  });
