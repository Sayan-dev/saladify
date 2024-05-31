import {StyleSheet, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

import React from 'react';
import type {ExtendedTheme} from '../../../types';
import {User} from '../../../types/entities';

interface Props {
  user?: User | null;
}

const GreetUser = ({user}: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return <Text style={styles.text}>Hello {user?.firstName},</Text>;
};

export default GreetUser;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    text: {
      color: theme.colors.text,
      ...theme.fonts.regular,
      fontSize: 20,
    },
  });
