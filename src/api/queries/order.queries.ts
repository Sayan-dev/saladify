import Toast from 'react-native-toast-message';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  OrderRequest,
  createOrder,
  fetchAllOrders,
  fetchOrder,
} from '../requests/order.requests';
import {ApiResponseError} from '../http';

export const useCreateOrder = () =>
  useMutation<null, ApiResponseError, OrderRequest>({
    mutationFn: async data => {
      const res = await createOrder(data);
      return res.data;
    },
    onError: err => {
      Toast.show({
        type: 'error',
        text1: 'Oops!',
        text2: err?.message || 'Something went wrong',
      });
    },
  });

export const useGetOrders = () =>
  useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await fetchAllOrders();
      return res?.data;
    },
  });

export const useGetOrder = (orderId?: string) =>
  useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const res = await fetchOrder(orderId);
      return res?.data;
    },
  });
