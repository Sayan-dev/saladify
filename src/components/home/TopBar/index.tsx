import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ExtendedTheme} from '../../../types';
import Icon from 'react-native-vector-icons/FontAwesome';
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
      {/* <FAIcon name="shopping-basket" color={theme.colors.primary} size={20} /> */}
      <Icon name="shopping-basket" color={theme.colors.primary} size={24} />
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
      marginTop: theme.spacing.lg,
      paddingVertical: theme.spacing.lg,
    },
  });
