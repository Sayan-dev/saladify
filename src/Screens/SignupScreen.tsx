import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import * as yup from 'yup';
import {useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {SignUpRequest, UserRegisterRequest} from '../types/entities';
import {RootStackParamList} from '../RootNavigator';
import type {ExtendedTheme} from '../types';
import ScrollLayout from '../components/layouts/ScrollLayout';
import Button from '../components/common/Button';
import Typography from '../components/common/Typography';
import ControlledFloatingTextInput from '../components/common/form/ControlledFloatingTextInput';
import PasswordInput from '../components/common/form/PasswordInput';
import {useRegister} from '../api/queries/auth.queries';
import {remove} from '../utils/storage';
import {useUser} from '../store/selector';

const schema = yup.object().shape({
  email: yup.string().email('Must be a valid email').required('Required'),
  firstName: yup.string(),
  middleName: yup.string(),
  lastName: yup.string(),
  password: yup.string().required('Required'),
});

type SignupScreenProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<SignupScreenProps> = ({navigation}) => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  const [, updateUser] = useUser();

  const form = useForm<UserRegisterRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      firstName: '',
      middleName: '',
      lastName: '',
      password: '',
    },
  });

  const signUp = useRegister();
  const onSubmit = form.handleSubmit(async data => {
    signUp.mutate(
      {data, password: data.password},
      {
        onSuccess: async userData => {
          updateUser(userData || null);

          await remove('@intro');
          navigation.reset({index: 1, routes: [{name: 'HomeDrawer'}]});
        },
      },
    );
  });

  const inputs = React.useRef<Record<keyof SignUpRequest, TextInput | null>>({
    email: null,
    firstName: null,
    middleName: null,
    lastName: null,
    password: null,
  });
  return (
    <ScrollLayout
      scrollViewProps={{style: styles.container}}
      edges={['top', 'left', 'right']}>
      <FormProvider {...form}>
        <View style={styles.form}>
          <Typography fontStyle="medium" fontSize="h1" style={styles.heading}>
            Sign Up
          </Typography>

          <ControlledFloatingTextInput
            ref={el => {
              inputs.current.email = el;
            }}
            name="email"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onNext={() => inputs.current.firstName?.focus()}
          />

          <ControlledFloatingTextInput
            ref={el => {
              inputs.current.firstName = el;
            }}
            name="firstName"
            label="First name"
            keyboardType="name-phone-pad"
            autoCapitalize="none"
            returnKeyType="next"
            onNext={() => inputs.current.middleName?.focus()}
          />
          <ControlledFloatingTextInput
            ref={el => {
              inputs.current.middleName = el;
            }}
            name="middleName"
            label="Middle name"
            keyboardType="name-phone-pad"
            autoCapitalize="none"
            returnKeyType="next"
            onNext={() => inputs.current.lastName?.focus()}
          />
          <ControlledFloatingTextInput
            ref={el => {
              inputs.current.lastName = el;
            }}
            name="lastName"
            label="Last name"
            keyboardType="name-phone-pad"
            autoCapitalize="none"
            returnKeyType="next"
            onNext={() => inputs.current.password?.focus()}
          />
          <PasswordInput
            ref={el => {
              inputs.current.password = el;
            }}
            name="password"
            label="Password"
            autoCapitalize="none"
            returnKeyType="done"
            onNext={() => inputs.current.password?.blur()}
          />

          <View style={styles.buttonContainer}>
            <Button
              onPress={onSubmit}
              style={styles.button}
              RightIconName="arrow-right"
              // isLoading={login.isLoading}
            >
              Sign Up
            </Button>
          </View>
        </View>
      </FormProvider>
    </ScrollLayout>
  );
};

export default SignupScreen;
const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.md,
    },
    heading: {
      ...theme.fonts.bold,
      fontSize: 42,
      marginBottom: theme.spacing.sm,
    },
    form: {
      marginBottom: theme.spacing.lg,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textButton: {
      ...theme.fonts.medium,
    },
    button: {
      marginTop: 'auto',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    signUpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginTop: 'auto',
      marginBottom: theme.spacing.md,
    },
  });
