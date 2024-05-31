import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

// import { widthPercentageToDP } from 'react-native-responsive-screen';
import type {ExtendedTheme} from '../../../types';
import GreetUser from './GreetUser';
import {User} from '../../../types/entities';

interface Props {
  user?: User | null;
}

const Heading = ({user}: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        <GreetUser user={user} /> What fruit salad combo do you want today?
      </Text>
    </View>
  );
};

export default Heading;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      width: 280,
      // width: widthPercentageToDP(70),
    },
    heading: {
      fontSize: theme.fontSize.large,
      color: theme.colors.text,
      ...theme.fonts.medium,
    },
  });
