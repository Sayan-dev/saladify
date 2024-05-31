import {ApiResponse, Product} from '../../types/entities';
import http from '../http';

const BASE_URL = '/api/product';

export type LikeProductRequest = {
  productId: string;
  like: boolean;
};

export const fetchAllProducts = async () => {
  const response = await http.get<ApiResponse<[Product]>>(`${BASE_URL}`);
  return response;
};
export const fetchProduct = async (productId?: string) => {
  const response = await http.get<ApiResponse<Product>>(
    `${BASE_URL}/${productId}`,
  );
  return response;
};

export const likeProduct = async ({productId}: LikeProductRequest) => {
  const response = await http.post<ApiResponse<null>>(
    `${BASE_URL}/like/${productId}`,
  );
  return response;
};

export const dislikeProduct = async ({productId}: LikeProductRequest) => {
  const response = await http.post<ApiResponse<null>>(
    `${BASE_URL}/dislike/${productId}`,
  );
  return response;
};
