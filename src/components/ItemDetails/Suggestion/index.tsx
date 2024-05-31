import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '../../../types';
import useProductStore from '../../../store/product/selector';

const Suggestions = () => {
  const [selectedProduct] = useProductStore();

  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.body}>{selectedProduct?.suggestions}</Text>
    </View>
  );
};

export default Suggestions;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: 24,
    },
    body: {
      fontSize: 14,
      color: theme.colors.text,
      ...theme.fonts.regular,
    },
  });
