import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import type { ExtendedTheme } from '../../../types';
import Preview from '../../common/Images/PreviewImage';
import { Order, PreviousOrder } from '../../../types/entities';
import Typography from '../../common/Typography';

interface Props {
  data: PreviousOrder;
}

const Details = ({ data }: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Typography numberOfLines={1} ellipsizeMode="tail" style={styles.address}>
        {data.address}
      </Typography>
      <Typography>+91 {data.contact}</Typography>
    </View>
  );
};

export default Details;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      paddingRight: 5,
    },
    address: {
      ...theme.fonts.medium,
      fontSize: 16,
      width: '80%',
    },
  });
