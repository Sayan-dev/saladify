import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {ExtendedTheme} from '../../../types';
import Preview from '../Images/PreviewImage';
import {Product} from '../../../types/entities';
import Typography from '../Typography';

type options = {
  card?: {
    width?: number;
    height?: number;
    paddingHorizontal?: number;
  };
  image?: {
    width: number;
    height: number;
  };
  logo?: {
    flex: number;
  };
};

type Props = {
  data: Product;
  ActionItems: JSX.Element;
  options?: options;
};

const ItemCard = ({data, ActionItems, options}: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View
      style={[
        styles.container,
        {
          width: options?.card?.width || 160,
          height: options?.card?.height || 185,
          paddingHorizontal: options?.card?.paddingHorizontal || 20,
        },
      ]}>
      <View style={[styles.logo, {flex: options?.logo?.flex || 3}]}>
        <Preview
          width={options?.image?.width || 80}
          height={options?.image?.height || 80}
        />
      </View>
      <View style={styles.content}>
        <Typography numberOfLines={1} ellipsizeMode="tail" style={styles.body}>
          {data.name}
        </Typography>
        {ActionItems && ActionItems}
      </View>
    </View>
  );
};

export default ItemCard;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      paddingHorizontal: 20,
      borderRadius: 20,
      marginRight: 10,
    },
    body: {
      fontSize: 16,
      color: theme.colors.text,
      ...theme.fonts.medium,
    },
    logo: {
      justifyContent: 'flex-end',
      flex: 3,
      alignItems: 'center',
    },
    content: {
      flex: 2,
      paddingTop: 5,
      alignItems: 'flex-start',
    },
  });
