import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {ExtendedTheme} from '../../../types';
import ItemCard from '../../common/Card/ItemCard';
import ActionItems from './ActionItems';
import {Product} from '../../../types/entities';

type Props = {
  selectItem: (product: Product) => void;
  products: Product[];
};

const RecommendedComponent = ({selectItem, products}: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.label}>Recommended Combo</Text>
        <LinearGradient
          style={styles.productContainer}
          colors={[
            theme.colors.background,
            '#E5E5E5',
            theme.colors.background,
          ]}>
          <ScrollView horizontal style={styles.products}>
            {products.map(product => (
              <ItemCard
                key={product._id}
                data={product}
                ActionItems={
                  <ActionItems itemDetails={product} selectItem={selectItem} />
                }
                options={{
                  image: {width: 80, height: 80},
                  card: {paddingHorizontal: 15},
                }}
              />
            ))}
          </ScrollView>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default RecommendedComponent;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
    },
    body: {
      fontSize: 16,
      color: theme.colors.text,
      ...theme.fonts.medium,
    },
    label: {
      fontSize: 24,
      color: theme.colors.text,
      ...theme.fonts.medium,
      paddingVertical: 2,
    },
    productContainer: {
      paddingVertical: 30,
    },
    products: {},
  });
