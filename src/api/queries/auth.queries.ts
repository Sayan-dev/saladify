import {useMutation, useQuery} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import {User, UserRegisterRequest} from '../../types/entities';
import {ApiResponseError} from '../http';
import {getUser, login, registerWithEmail} from '../requests/auth.requests';

export const useRegister = () =>
  useMutation<
    User,
    ApiResponseError,
    {data: Omit<UserRegisterRequest, 'password'>; password: string}
  >({
    mutationFn: async ({data, password}) => {
      await auth().createUserWithEmailAndPassword(data.email, password);

      const response = await registerWithEmail({
        email: data.email,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
      });
      return response.data.user as User;
    },
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Congrats! 🎉',
        text2: '',
      });
    },
    onError: err => {
      Toast.show({
        type: 'error',
        text1: 'Oops!',
        text2: err?.message || 'Something went wrong',
      });
    },
  });
export const useLogin = () =>
  useMutation<User, ApiResponseError, {email: string; password: string}>({
    mutationFn: async ({email, password}) => {
      await auth().signInWithEmailAndPassword(email, password);
      const response = await login();
      return response.data.user as User;
    },
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Congrats! 🎉',
        text2: '',
      });
    },
    onError: err => {
      Toast.show({
        type: 'error',
        text1: 'Oops!',
        text2: err?.message || 'Something went wrong',
      });
    },
  });
export const useGetUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await getUser();
      return res?.data;
    },
  });
