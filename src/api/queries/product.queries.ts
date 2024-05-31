import {useMutation, useQuery} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {
  LikeProductRequest,
  dislikeProduct,
  fetchAllProducts,
  fetchProduct,
  likeProduct,
} from '../requests/product.requests';
import {ApiResponseError} from '../http';

export const useProduct = (productId?: string) =>
  useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const res = await fetchProduct(productId);
      return res?.data;
    },
  });

export const useProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetchAllProducts();
      return res?.data;
    },
  });

export const useLikeDislikeProduct = () =>
  useMutation<null, ApiResponseError, LikeProductRequest>({
    mutationFn: async data => {
      let res;
      if (data.like) {
        res = await likeProduct(data);
      } else {
        res = await dislikeProduct(data);
      }
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
