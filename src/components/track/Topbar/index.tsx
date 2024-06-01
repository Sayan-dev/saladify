import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ExtendedTheme } from '../../../types';
import Button from '../../common/Button';

interface Props {
  goBack?: () => void;
}
const Topbar = ({ goBack }: Props) => {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Button onPress={goBack}>Go back</Button>
      <Text>Delivery Status</Text>
      <Text />
    </View>
  );
};

export default Topbar;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      width: widthPercentageToDP(100),
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      paddingVertical: 30,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.secondary,
    },
  });
