import {TextInput} from 'react-native';
import React from 'react';
import {useController, useFormContext, useWatch} from 'react-hook-form';
import FloatingTextInput, {FloatingTextInputProps} from '../FloatingTextInput';

export type ControlledFloatingTextInputProps = Omit<
  FloatingTextInputProps,
  'name'
> & {
  name: string;
  defaultValue?: string;
  onNext?: () => void;
};

const ControlledFloatingTextInput = React.forwardRef<
  TextInput,
  ControlledFloatingTextInputProps
>(({name, defaultValue = '', onNext, ...props}, ref) => {
  const form = useFormContext();

  const controller = useController({
    control: form.control,
    name,
    defaultValue: form.getValues(name) ?? defaultValue ?? '',
  });

  const value = useWatch({
    control: form.control,
    name,
    defaultValue: form.getValues(name) ?? defaultValue ?? '',
  });

  return (
    <FloatingTextInput
      {...props}
      name={name}
      value={
        (typeof value === 'number' ? String(value) : value) ??
        controller.field.value
      }
      onChangeText={controller.field.onChange}
      onSubmitEditing={onNext}
      blurOnSubmit={onNext === undefined}
      ref={ref}
      error={controller.fieldState.error?.message}
    />
  );
});

ControlledFloatingTextInput.displayName = 'ControlledFloatingTextInput';

export default ControlledFloatingTextInput;
