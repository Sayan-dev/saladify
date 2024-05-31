import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Controller, useFormContext} from 'react-hook-form';
import type {ExtendedTheme} from '../../../types';
import ControlledFloatingTextInput from './ControlledFloatingTextInput';
import {FloatingTextInputProps} from '../FloatingTextInput';

interface ContactNumberFieldProps extends Omit<FloatingTextInputProps, 'name'> {
  name: string;
  onNext?: () => void;
}

const ContactNumberField: React.FC<ContactNumberFieldProps> = ({
  label = 'Contact Number',
  name,
  onNext,
  ...props
}) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme, false), [theme]);

  const form = useFormContext();

  return (
    <View style={styles.container}>
      <Controller
        name={`${name}.countryCode`}
        control={form.control}
        defaultValue="+91"
        render={({field}) => (
          <TextInput
            selectionColor={theme.colors.primary}
            value={field.value}
            onChangeText={field.onChange}
            editable={false}
            style={styles.countryCode}
          />
        )}
      />
      <ControlledFloatingTextInput
        {...props}
        keyboardType="phone-pad"
        label={label}
        name={`${name}.number`}
        containerStyle={styles.number}
        onNext={onNext}
      />
    </View>
  );
};

export default ContactNumberField;

const createStyles = (theme: ExtendedTheme, isError?: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    countryCode: {
      ...theme.fonts.regular,
      backgroundColor: theme.colors.lightBackground,
      color: theme.colors.text,
      fontSize: theme.fontSize.large,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      margin: 0,
      marginTop: 30,
      marginRight: theme.spacing.xs,
      borderColor: isError ? theme.colors.error : theme.colors.lightBackground,
      borderWidth: 1,
      borderRadius: 15,
    },
    number: {
      flex: 1,
    },
  });
