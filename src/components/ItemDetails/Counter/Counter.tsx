import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { ExtendedTheme } from '../../../types';
import Typography from '../../common/Typography';

interface Props {
  add: () => void;
  sub: () => void;
  count: number;
}

const Counter = ({ add, sub, count }: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Icon name="minus" onPress={sub} style={[styles.body, styles.sub]} />
      <Typography style={[styles.body, styles.count]}>{count}</Typography>
      <Icon name="plus" onPress={add} style={[styles.body, styles.add]} />
    </View>
  );
};

export default Counter;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    body: {
      fontSize: 30,
      height: 32,
      width: 32,

      justifyContent: 'center',
      alignItems: 'center',
      color: theme.colors.text,

      ...theme.fonts.medium,
    },
    sub: {
      borderRadius: 32,
      borderColor: theme.colors.text,
      borderWidth: 1,
      textAlign: 'center',
    },
    count: {
      marginHorizontal: 20,
      fontSize: 24,

      textAlign: 'center',
    },
    add: {
      backgroundColor: theme.colors.lightBackground,
      color: theme.colors.primary,
      textAlign: 'center',
      borderRadius: 32,
      borderColor: theme.colors.primary,
      borderWidth: 1,
    },
  });
