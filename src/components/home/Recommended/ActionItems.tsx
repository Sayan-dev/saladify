import { StyleSheet, Text, Touchable, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ExtendedTheme } from '../../../types';
import { Product } from '../../../types/entities';
import Typography from '../../common/Typography';
import { getModifiedAmount } from '../../../utils/helper';

type Props = {
  selectItem: (product: Product) => void;
  itemDetails: Product;
};
const ActionItems = ({ selectItem, itemDetails }: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  const handleSelectProduct = () => {
    selectItem(itemDetails);
  };
  return (
    <View style={styles.container}>
      <View style={styles.price}>
        <Typography fontStyle="medium" color="primary">
          $
        </Typography>
        <Typography fontStyle="medium" color="primary">
          {getModifiedAmount(itemDetails.price)}
        </Typography>
      </View>
      <TouchableOpacity>
        <Typography onPress={handleSelectProduct} style={styles.add}>
          +
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

export default ActionItems;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      paddingVertical: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    price: {
      flexDirection: 'row',
    },
    add: {
      backgroundColor: theme.colors.lightBackground,
      color: theme.colors.primary,
      justifyContent: 'center',
      lineHeight: 34,
      alignItems: 'center',
      textAlign: 'center',
      height: 24,
      width: 24,
      fontSize: 30,

      borderRadius: 24,
    },
  });
