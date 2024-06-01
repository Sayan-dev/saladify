import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ExtendedTheme } from '../../../types';
import Preview from '../../common/Images/PreviewImage';
import Cost from './Cost';
import Details from './Details';
import { Order as OrderEntity } from '../../../types/entities';

interface Props {
  data: OrderEntity;
  handlePressItem: () => void;
}

const Order = ({ data, handlePressItem }: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <TouchableOpacity onPress={handlePressItem} style={styles.container}>
      <View style={styles.info}>
        <View style={styles.image}>
          <Preview height={40} width={40} />
        </View>
        <Details data={data} />
      </View>

      <Cost data={data} />
    </TouchableOpacity>
  );
};

export default Order;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 16,
      marginBottom: 30,
      borderBottomWidth: 1,
      paddingHorizontal: 24,
      borderBottomColor: theme.colors.border,
    },
    image: {
      height: 64,
      width: 65,
      borderRadius: 10,
      padding: 12,
      marginRight: 16,
      borderColor: theme.colors.primary,
      borderWidth: 1,
      backgroundColor: theme.colors.lightBackground,
    },
    info: {
      flexDirection: 'row',
    },
  });
