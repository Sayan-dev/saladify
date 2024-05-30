import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ExtendedTheme} from '../../../types';

import Hamburger from '../../../assets/icons/Hamburger';

type TopBarProps = {
  openDrawer: () => void;
};

const TopBar = ({openDrawer}: TopBarProps) => {
  const theme = useTheme();

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openDrawer}>
        <Hamburger />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',

      justifyContent: 'space-between',
      paddingTop: theme.spacing.md,
      paddingRight: theme.spacing.sm,

      paddingVertical: theme.spacing.sm,
    },
  });
