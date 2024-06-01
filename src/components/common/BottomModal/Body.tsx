import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import type { ExtendedTheme, FontSize } from '../../types';

const ModalBody = ({ children }: { children?: React.ReactNode }) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return <View style={styles.body}>{children}</View>;
};

export default ModalBody;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    body: {
      justifyContent: 'center',
      paddingHorizontal: 15,
      minHeight: 100,
    },
  });
