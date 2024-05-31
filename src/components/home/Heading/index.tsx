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
        <GreetUser user={user} />
        What fruit salad combo do you want today?
      </Text>
    </View>
  );
};

export default Heading;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      // width: widthPercentageToDP(70),
    },
    heading: {
      fontSize: 20,
      color: theme.colors.text,
      ...theme.fonts.medium,
    },
  });
