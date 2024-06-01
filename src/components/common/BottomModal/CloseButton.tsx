import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { ExtendedTheme } from '../../../types';

interface Props {
  onClose: () => void;
}

const CloseButton = ({ onClose }: Props) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.close}>
        <Icon color={theme.colors.text} name="close" size={32} onPress={onClose} />
      </View>
    </TouchableOpacity>
  );
};

export default CloseButton;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    close: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 48,
      height: 48,
      borderRadius: 48,
      backgroundColor: theme.colors.background,
    },
  });
