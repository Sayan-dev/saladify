import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {ExtendedTheme} from '../../../types';
import useProductStore from '../../../store/product/selector';
import {getIngredientString} from '../../../utils/helper';

const InfoComponent = () => {
  const [selectedProduct] = useProductStore();

  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={[styles.body, styles.label]}>One Pack Contains:</Text>
      <Text style={[styles.body, styles.info]}>
        {getIngredientString(selectedProduct?.ingredients || [])}
        {/* Red Quinoa, Lime, Honey, Blueberries, Strawberries, Mango, Fresh mint. */}
      </Text>
    </View>
  );
};

export default InfoComponent;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      paddingTop: 32,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.border,
    },
    body: {
      fontSize: 16,
      color: theme.colors.text,
      ...theme.fonts.medium,
    },
    label: {
      fontSize: 20,
      color: theme.colors.text,
      ...theme.fonts.medium,
      paddingVertical: 2,
      borderBottomColor: theme.colors.primary,
      borderBottomWidth: 2,
      alignSelf: 'flex-start',
    },
    info: {
      paddingVertical: 18,
    },
  });
