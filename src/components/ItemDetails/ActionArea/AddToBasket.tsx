import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import type { ExtendedTheme } from '../../../types';
import Button from '../../common/Button';

interface Props {
  onPress: () => void;
  orderExists: boolean;
}

const AddToBasketButton = ({ onPress, orderExists }: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Button onPress={onPress} style={styles.addButton}>
        {orderExists ? 'Go to Basket' : 'Add to basket'}
      </Button>
    </View>
  );
};

export default AddToBasketButton;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flex: 2,
    },
    body: {
      fontSize: 16,
      color: theme.colors.text,
      ...theme.fonts.medium,
    },
    addButton: {
      width: '100%',
      justifyContent: 'center',
      paddingVertical: theme.spacing.md,
      borderRadius: 10,
    },
    info: {
      paddingVertical: 18,
    },
  });
