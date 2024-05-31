import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import type {ExtendedTheme} from '../../../types';
import ControlledFloatingTextInput, {
  ControlledFloatingTextInputProps,
} from './ControlledFloatingTextInput';

export type PasswordInputProps = Omit<
  ControlledFloatingTextInputProps,
  'secureTextEntry'
> & {};

const PasswordInput = React.forwardRef<TextInput, PasswordInputProps>(
  ({...props}, ref) => {
    const theme = useTheme();
    const styles = React.useMemo(() => createStyles(theme), [theme]);

    const [isVisible, setVisible] = React.useState(false);

    const toggle = React.useCallback(() => {
      setVisible(value => !value);
    }, [isVisible]);

    return (
      <View style={styles.container}>
        <ControlledFloatingTextInput
          ref={ref}
          {...props}
          secureTextEntry={!isVisible}
          containerStyle={styles.input}
          right={
            <TouchableOpacity onPress={toggle} style={styles.button}>
              <Icon
                name={isVisible ? 'eye-off' : 'eye'}
                size={24}
                color={isVisible ? theme.colors.text : theme.colors.text}
              />
            </TouchableOpacity>
          }
        />
      </View>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
    },
    button: {
      paddingHorizontal: theme.spacing.md,
      marginLeft: theme.spacing.md,
    },
  });
